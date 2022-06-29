import React, { useEffect, useState } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import { authedFetch } from '../../../../lib/authed-fetch';
import { SkillrDto } from '../../../../lib/types/skillr';
import { ConnectNowDto } from '../../../../lib/types/skillrBook';
import useInterval from '../../../../lib/useInterval';
import { PostSkillrBook } from '../../../api/skillrBookNow';
import { getSkillrById } from '../../../api/skillrs/[skillrId]';
import { SkillDto } from '../../../api/skills';
import { getSkillById } from '../../../api/skills/[skillId]';

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

const Session = dynamic(() => import('../../../../components/UI/Session'), {
    ssr: false,
});

const BookNow: React.FC<BookNowProps> = ({ skillr, skill, vonageApiKey }) => {
    const [skillrBook, setSkillrBook] = useState<SkillrDto>();
    const [connectionDetails, setConnectionDetails] = useState<ConnectNowDto>();
    const [state, setState] = useState<BookNowState>(BookNowState.IDLE);

    useEffect(() => {
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
    }, [skillr, skill]);

    useInterval(() => {
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
        if (!connectionDetails) {
            return;
        }
        if (!connectionDetails.vonageSessionDetails) {
            return;
        }
        setState(BookNowState.CONNECTING);
    }, [connectionDetails]);

    return (
        <>
            <h1>Book Now with @{skillr.username}</h1>
            <h2>state: {BookNowState[state]}</h2>
            <div
            // style={{
            //   position: "absolute",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%, -50%)",
            // }}
            >
                {connectionDetails && (
                    <Session
                        apiKey={vonageApiKey}
                        sessionId={connectionDetails.vonageSessionDetails.sessionId}
                        token={connectionDetails.vonageSessionDetails.token}
                        onEnd={() => {
                            if (!skillrBook) {
                                return;
                            }
                            Router.push(`/sessions/${skillrBook.id}`);
                        }}
                    />
                )}
            </div>

            <pre>{JSON.stringify(skillrBook, null, 2)}</pre>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
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
            vonageApiKey: process.env.VONAGE_API_KEY,
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
