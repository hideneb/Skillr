import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { SkillrDto } from '../../lib/types/skillr';
import { getSkillrById } from '../api/skillrs/[skillrId]';
import SkillrPage from '../../components/SkillrPage';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { getUserById } from '../api/users/me';
import { UserDto } from '../../lib/types/user';

type ProfileProps = {
    skillr: SkillrDto;
    user: UserDto | null;
};

const Profile: React.FC<ProfileProps> = (props) => {
    return <SkillrPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async (ctx) => {
    const skillrId = Array.isArray(ctx.query.profileID) ? ctx.query.profileID[0] : ctx.query.profileID;
    if (!skillrId) {
        return { notFound: true };
    }

    const token = await getUnexpiredToken(ctx.req, ctx.res);

    const user = token ? await getUserById(token.jwt, token.id) : null;

    const skillr = await getSkillrById(skillrId);
    if (!skillr || !skillr.id) {
        return { notFound: true };
    }

    return {
        props: {
            skillr,
            user,
        },
    };
};

export default Profile;
