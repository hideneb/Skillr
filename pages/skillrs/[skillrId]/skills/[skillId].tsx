import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import { SkillrDto } from '../../../../lib/types/skillr';
import { ConnectNowDto } from '../../../../lib/types/skillrBook';
import { getSkillrById } from '../../../api/skillrs/[skillrId]';
import { SkillDto } from '../../../api/skills';
import { getSkillById } from '../../../api/skills/[skillId]';
import { isProd } from '../../../../lib/environment';
import { authedFetch } from '../../../../lib/authed-fetch';
import { PostSkillrBook } from '../../../api/skillrBookNow';
import { useRouter } from 'next/router';
import useInterval from '../../../../lib/useInterval';

const Session = dynamic(() => import('../../../../components/UI/Session'), {
    ssr: false,
});

type BookNowProps = {
    skillr: SkillrDto;
    skill: SkillDto;
    vonageApiKey: string;
};

enum BookNowState {
    IDLE,
    PENDING,
    ACCEPTED,
    CONNECTING,
    CONNECTED,
    DISCONNECTING,
    DISCONNECTED,
    ERROR,
}

const BookNow: React.FC<BookNowProps> = ({ skillr, skill, vonageApiKey }) => {
    const { query } = useRouter();

    const debug = !!query.debug;

    const [skillrBook, setSkillrBook] = useState<SkillrDto>();
    const [connectionDetails, setConnectionDetails] = useState<ConnectNowDto>();
    const [state, setState] = useState<BookNowState>(BookNowState.IDLE);

    const debugConnectionDetails: Partial<ConnectNowDto> = {
        vonageSessionDetails: {
            sessionId: '1_MX40NzIwNDcyNH5-MTY1NzI5NTA0MDc5NH5NUDNsSDUzSGlHNVNLZzhhWmNMSndZMHR-fg',
            ApiKey: '47204724',
            token: 'T1==cGFydG5lcl9pZD00NzIwNDcyNCZzaWc9ZTAzN2Y4ZjM0MjI4ZjJiMGQxZTViNzM0MDcyOWRlMzYyY2E3NzdjNzpzZXNzaW9uX2lkPTFfTVg0ME56SXdORGN5Tkg1LU1UWTFOekk1TlRBME1EYzVOSDVOVUROc1NEVXpTR2xITlZOTFp6aGhXbU5NU25kWk1IUi1mZyZjcmVhdGVfdGltZT0xNjU3Mjk1MDQxJm5vbmNlPTAuMzE2OTU3MzA0OTE3MjM5NiZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNjU5ODg3MDQxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9',
        },
    };

    useEffect(() => {
        if (debug) return;
        const skillrSkill = skillr.skills.find((s) => s.skillId === skill.id);
        if (!skillrSkill) {
            return;
        }
        authedFetch(`/api/skillrBookNow/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                skillrId: skillr.id,
                skillId: skillrSkill.skillId,
                skillrSkillId: skillrSkill.skillrSkillId,
                duration: 15,
            } as PostSkillrBook),
        })
            .then((res) => res.json())
            .then((skillrBook) => setSkillrBook(skillrBook))
            .then(() => setState(BookNowState.PENDING));
    }, [debug, skillr, skill]);

    useInterval(() => {
        if (debug) return;

        console.log(`Polling for connection details`);
        if (state !== BookNowState.PENDING) {
            console.log(`Not pending, not polling`, { state });
            return;
        }
        if (!skillrBook) {
            console.log(`No skillrBook, not polling`);
            return;
        }

        console.log(`Polling for connection details for ${skillrBook.id}`);

        authedFetch(`/api/skillrBookNow/${skillrBook.id}`)
            .then((res) => res.json())
            .then((connectNowDto: ConnectNowDto) => {
                if (!connectNowDto.vonageSessionDetails) {
                    console.log(`Connection details not yet available`);
                    return;
                }
                setConnectionDetails(connectNowDto);
                setState(BookNowState.ACCEPTED);
            });
    }, 5000);

    useEffect(() => {
        if (debug) return;

        if (!connectionDetails) {
            return;
        }
        if (!connectionDetails.vonageSessionDetails) {
            return;
        }
        setState(BookNowState.CONNECTING);
    }, [connectionDetails, debug]);

    const connectionInfo = (debug ? debugConnectionDetails : connectionDetails) as ConnectNowDto;

    return (
        connectionInfo && (
            <Session
                apiKey={debug ? '47204724' : vonageApiKey}
                sessionId={connectionInfo.vonageSessionDetails!.sessionId}
                token={connectionInfo.vonageSessionDetails!.token}
                onEnd={() => {
                    // if (!skillrBook) {
                    //     return;
                    // }
                    // Router.push(`/sessions/${skillrBook.id}`);
                }}
                skillr={skillr}
                skill={skill}
            />
        )
    );
};

export const getStaticProps: GetStaticProps<BookNowProps> = async ({ params }) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const skillrId = Array.isArray(params?.skillrId) ? params?.skillrId[0] : params?.skillrId;
    const skillId = Number(Array.isArray(params?.skillId) ? params?.skillId[0] : params?.skillId);

    if (!skillrId || !skillId) {
        return { notFound: true };
    }

    const skillr = await getSkillrById(skillrId);
    if (!skillr || !skillr.id) {
        return { notFound: true };
    }

    const skill = await getSkillById(skillId);
    if (!skill || !skill.id) {
        return { notFound: true };
    }

    return {
        props: {
            skillr,
            skill,
            vonageApiKey: process.env.VONAGE_API_KEY!,
            useMobileMenu: true,
        },
        revalidate: 420, // revalidate every 7 minutes
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], // don't pre-render any skillrs
        fallback: 'blocking',
    };
};

export default BookNow;
