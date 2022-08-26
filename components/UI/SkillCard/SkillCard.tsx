import React from 'react';
import Link from 'next/link';
import { SkillDto } from '@/lib/types/skill';

type SkillCardProps = {
    skill: SkillDto;
};

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <span>
            <img
                src={skill.lightIcon}
                style={{ height: '150px', width: '200px' }}
                alt={`Image related to ${skill.name}`}
            />
            <Link href="/skills/[id]" as={`/skills/${skill.id}`}>
                <a>{skill.name}</a>
            </Link>
        </span>
    );
};

export default SkillCard;
