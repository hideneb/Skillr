import React from 'react';
import Link from 'next/link';
import { SkillDto } from '../../../pages/api/skills';

type SkillCardSmallProps = {
    skill: SkillDto;
};

const SkillCardSmall: React.FC<SkillCardSmallProps> = ({ skill }) => {
    return (
        <span>
            <img
                src={skill.popularIcon}
                style={{ height: '50px', width: '75px' }}
                alt={`Image related to ${skill.name}`}
            />
            <Link href="/skills/[id]" as={`/skills/${skill.id}`}>
                <a>{skill.name}</a>
            </Link>
        </span>
    );
};
export default SkillCardSmall;
