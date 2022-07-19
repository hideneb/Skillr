import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { SkillrDto } from '@/lib/types/skillr';
import { getSkillrById } from '../api/skillrs/[skillrId]';
import SkillrPage from '@/components/UI/SkillrPage/SkillrPage';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getUserById } from '../api/users/me';
import { UserDto } from '@/lib/types/user';
import { isProd } from '@/lib/environment';

type SkillrProps = {
    skillr: SkillrDto;
    user: UserDto | null;
};

const Skillr: React.FC<SkillrProps> = (props) => {
    return <SkillrPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<SkillrProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const skillrId = Array.isArray(ctx.params?.skillrId) ? ctx.params?.skillrId[0] : ctx.params?.skillrId;
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

export default Skillr;
