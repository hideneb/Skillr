import 'papercss';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import Link from 'next/link';
import { SkillrDto } from '../../lib/types/skillr';
import { getPageOfSkillrs } from '../api/skillrs/[skillrId]';
import { SkillDto } from '@/lib/types/skill';
import { findSkills } from '../api/skills';
import { getSkillById } from '../api/skills/[skillId]';
import SkillCardSmall from '../../components/UI/SkillCardSmall';
import SkillrCards from '../../components/UI/SkillrCards';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { isProd } from '../../lib/environment';

type SkillProps = {
    skill: SkillDto;
    subSkills: SkillDto[];
    featuredSkillrs: SkillrDto[];
    starSkillrs: SkillrDto[];
    subSkillSkillrs: { [skillId: number]: SkillrDto[] };
    isLoggedIn: boolean;
};

const Skill: React.FC<SkillProps> = ({
    skill,
    subSkills,
    featuredSkillrs,
    starSkillrs,
    subSkillSkillrs,
    isLoggedIn,
}) => {
    return (
        <>
            <h1>{skill.name}</h1>
            <div>
                <ul>
                    {subSkills.map((subSkill) => (
                        <SkillCardSmall key={subSkill.id} skill={subSkill} />
                    ))}
                </ul>
            </div>
            <div>
                <h2>Featured {skill.name} Skillrs</h2>
                <SkillrCards skillrs={featuredSkillrs} isLoggedIn={isLoggedIn} />
            </div>
            <div>
                <h2>{skill.name} Stars</h2>
                <ul>
                    <SkillrCards skillrs={starSkillrs} isLoggedIn={isLoggedIn} />
                </ul>
            </div>
            <div>
                <h2>{skill.name} Sub Skills</h2>
                <ul>
                    {subSkills.map((subSkill) => {
                        const skillrs = subSkillSkillrs[subSkill.id];
                        if (!skillrs) {
                            return null;
                        }
                        return (
                            <li key={subSkill.id}>
                                <h3>
                                    <Link href="/skills/[id]" as={`/skills/${subSkill.id}`}>
                                        {subSkill.name}
                                    </Link>
                                </h3>
                                <SkillrCards skillrs={skillrs} isLoggedIn={isLoggedIn} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const skillId = Number(Array.isArray(ctx.params?.skillId) ? ctx.params?.skillId[0] : ctx.params?.skillId);
    if (!skillId) {
        return { notFound: true };
    }

    const token = await getUnexpiredToken(ctx.req, ctx.res);

    const skill = await getSkillById(skillId);
    if (!skill || !skill.id) {
        return { notFound: true };
    }

    const subSkills = (await findSkills(true)).filter((subSkill) => {
        return subSkill.parentId === skill.id;
    });

    const subSkillSkillrs: { [skillId: number]: SkillrDto[] } = await subSkills.reduce(
        async (accP: Promise<{ [skillId: number]: SkillrDto[] }>, subSkill: SkillDto) => {
            const acc = await accP;
            const res = await getPageOfSkillrs({
                page: 0,
                limit: 10,
                skill: skill.id,
            });
            acc[subSkill.id] = res.skillrs;
            return acc;
        },
        Promise.resolve({})
    );

    const featuredSkillrs = await getPageOfSkillrs({
        page: 0,
        limit: 10,
        featured: true,
        skill: skill.id,
    });

    const starSkillrs = await getPageOfSkillrs({
        page: 0,
        limit: 10,
        skill: skill.id,
    });

    return {
        props: {
            skill,
            subSkills,
            featuredSkillrs: featuredSkillrs.skillrs,
            starSkillrs: starSkillrs.skillrs,
            subSkillSkillrs,
            isLoggedIn: !!token,
        },
    };
};

export default Skill;
