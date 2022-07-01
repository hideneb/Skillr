import 'papercss';
import { GetServerSideProps } from 'next';
import React from 'react';
import { getUnexpiredToken } from '../../../lib/api-helpers';
import { SkillrSkillDto } from '../../../lib/types/skillr';
import { getSkillrSkills } from '../../api/skillr-skills';
import { PatchSkillrSkill } from '../../api/skillr-skills/[skillrSkillId]';
import { authedFetch } from '../../../lib/authed-fetch';
import Link from 'next/link';
import { isProd } from '../../../lib/environment';

type SkillrSkillProps = {
    skillrSkills: SkillrSkillDto[];
};

const SkillrSkill: React.FC<SkillrSkillProps> = ({ skillrSkills }) => {
    return (
        <>
            <h1>Skillr Skills</h1>
            <ul>
                {skillrSkills.map((skillrSkill) => (
                    <li key={skillrSkill.skillrSkillId}>
                        <h2>{skillrSkill.skill.name}</h2>
                        <p>{skillrSkill.brief}</p>
                        <Link href="/skillr/skills/[skillrSkillId]" as={`/skillr/skills/${skillrSkill.skillrSkillId}`}>
                            <a>Edit</a>
                        </Link>
                    </li>
                ))}
            </ul>
            <pre>{JSON.stringify(skillrSkills, null, 2)}</pre>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillrSkillProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(ctx.resolvedUrl)}`,
            },
            props: {},
        };
    }

    const skillrSkills = await getSkillrSkills(token.jwt);

    return {
        props: {
            skillrSkills,
        },
    };
};

export default SkillrSkill;
