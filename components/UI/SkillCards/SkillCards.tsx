import React from 'react';
import { SkillDto } from '@/lib/types/skill';
import SkillCard from '../SkillCard/SkillCard';

type SkillCardsProps = {
    skills: SkillDto[];
};

const SkillCards: React.FC<SkillCardsProps> = ({ skills }) => {
    return (
        <div className="row">
            {skills.map((skill) => (
                <div className="col-4 col" key={skill.id}>
                    <SkillCard skill={skill} />
                </div>
            ))}
        </div>
    );
};

export default SkillCards;
