import { GetServerSideProps } from 'next';
import React from 'react';
import { SkillrDto } from '@/lib/types/skillr';
import { getSkillrById } from '../api/skillrs/[skillrId]';
import SkillrPage from '@/components/UI/SkillrPage/SkillrPage';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getUserById } from '../api/users/me';
import { UserDto } from '@/lib/types/user';
import { isPageVisible, isProd } from '@/lib/environment';
import { getFeatureBackgroundImg } from '@/lib/get-feature-background-img';
import { getSkillById } from 'pages/api/skills/[skillId]';
import { SkillDto } from '@/lib/types/skill';

type SkillrProps = {
    skillr: SkillrDto;
    user: UserDto | null;
    backgroundImg: string;
    skillrSkillCategory: SkillDto | null;
};

const Skillr: React.FC<SkillrProps> = (props) => {
    return (
        <SkillrPage
            skillr={props.skillr}
            user={props.user}
            backgroundImg={props.backgroundImg}
            skillrSkillCategory={props.skillrSkillCategory}
        />
    );
};

export const getServerSideProps: GetServerSideProps<SkillrProps> = async (ctx) => {
    if (!isPageVisible(ctx.query)) {
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

    const skillrSkill = skillr.skills?.[0];
    const skillrSkillCategory = skillrSkill ? await getSkillById(skillrSkill?.skill.parentId) : null;

    return {
        props: {
            skillr,
            user,
            backgroundImg: getFeatureBackgroundImg(skillr.skills),
            skillrSkillCategory,
        },
    };
};

export default Skillr;
