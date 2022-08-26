import 'papercss';
import { GetServerSideProps, GetStaticProps } from 'next';
import React, { useEffect } from 'react';
import Router from 'next/router';
import { SkillDto } from '@/lib/types/skill';
import { SkillrDto } from '../../lib/types/skillr';
import { getPageOfSkillrs } from '../api/skillrs/[skillrId]';
import { findSkills } from '../api/skills';
import { getMostPopularSkill } from '../api/skills/most-popular-skill';
import SkillCards from '../../components/UI/SkillCards';
import SkillCard from '../../components/UI/SkillCard';
import SkillrCards from '../../components/UI/SkillrCards';
import Link from 'next/link';
import { authedFetch } from '../../lib/authed-fetch';
import { UserDto } from '../../lib/types/user';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { isProd } from '../../lib/environment';

type ExploreProps = {
    skills: SkillDto[];
    availableSkillrs: SkillrDto[];
    featuredSkillrs: SkillrDto[];
    mostPopularSkill: SkillDto;
    moreSkillrs: SkillrDto[];
    isLoggedIn: boolean;
};

const Explore: React.FC<ExploreProps> = ({
    skills,
    availableSkillrs,
    featuredSkillrs,
    mostPopularSkill,
    moreSkillrs,
    isLoggedIn,
}) => {
    const [user, setUser] = React.useState<UserDto>();
    useEffect(() => {
        authedFetch('/api/users/me', undefined, false)
            .then((res) => res.json())
            .then((user) => {
                if (!user.id) {
                    return;
                }
                setUser(user);
            });
    }, []);

    return (
        <div>
            <h1>
                Explore Skillrs{' '}
                {user ? (
                    `- ${user.freeSession} session${user.freeSession > 1 ? 's' : ''} FREE!`
                ) : (
                    <small>
                        <Link href="/login">(not logged in)</Link>
                    </small>
                )}
            </h1>
            <button onClick={() => Router.push('/account')}>Profile</button>
            <button onClick={() => Router.push('/favorites')}>Favorites</button>
            <button onClick={() => Router.push('/sessions')}>Sessions</button>
            <button onClick={() => Router.push('/chats')}>Chats</button>
            <button onClick={() => Router.push('/search')}>Search</button>
            <SkillCards skills={skills.filter((skill) => !skill.parentId)} />
            <h2>Available Now</h2>
            <SkillrCards skillrs={availableSkillrs} isLoggedIn={isLoggedIn} />
            <h2>Featured Skillrs</h2>
            <SkillrCards skillrs={featuredSkillrs} isLoggedIn={isLoggedIn} />
            <h2>Most Popular</h2>
            <SkillCard skill={mostPopularSkill} />
            <h2>More Skillrs</h2>
            <SkillrCards skillrs={moreSkillrs} isLoggedIn={isLoggedIn} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ExploreProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const token = await getUnexpiredToken(ctx.req, ctx.res);

    const [skills, availableSkillrs, featuredSkillrs, mostPopularSkill, moreSkillrs] = await Promise.all([
        findSkills(true),
        getPageOfSkillrs(
            {
                page: 0,
                limit: 10,
                isAvailableNow: true,
            },
            token?.jwt
        ).then((skillrResponse) => skillrResponse.skillrs),
        getPageOfSkillrs(
            {
                page: 0,
                limit: 10,
                featured: true,
            },
            token?.jwt
        ).then((skillrResponse) => skillrResponse.skillrs),
        getMostPopularSkill(),
        getPageOfSkillrs(
            {
                page: 0,
                limit: 10,
            },
            token?.jwt
        ).then((skillrResponse) => skillrResponse.skillrs),
    ]);

    return {
        props: {
            skills,
            availableSkillrs,
            featuredSkillrs,
            mostPopularSkill,
            moreSkillrs,
            isLoggedIn: !!token,
        },
    };
};

export default Explore;
