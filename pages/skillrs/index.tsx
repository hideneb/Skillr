import { GetStaticProps } from 'next';
import Link from 'next/link';

import React from 'react';
import { isProd } from '../../lib/environment';
import { SkillrDto } from '../../lib/types/skillr';
import { getPageOfSkillrs } from '../api/skillrs/[skillrId]';

type SkillrsProps = {
    skillrs: SkillrDto[];
};
const Skillrs: React.FC<SkillrsProps> = ({ skillrs }) => {
    return (
        <div>
            {skillrs.map((skillr) => (
                <div key={skillr.id}>
                    <Link href={`/skillrs/${skillr.id}`}>{skillr.username}</Link>
                </div>
            ))}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const { skillrs } = await getPageOfSkillrs({ page: 0, limit: 10 });
    return {
        props: {
            skillrs,
        },
        revalidate: 420, // revalidate every 7 minutes
    };
};

export default Skillrs;
