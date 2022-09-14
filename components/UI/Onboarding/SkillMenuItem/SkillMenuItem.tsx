import React, { FC } from 'react';
import { MenuItem, MenuDivider } from '@szhsin/react-menu';
import { SkillDto } from '@/lib/types/skill';

interface Props {
    skill: SkillDto;
    setSkill: (skill: SkillDto) => void;
    category?: string;
}

const SkillMenuItem: FC<Props> = ({ skill, category, setSkill }: Props) => {
    return (
        <div key={skill.id}>
            <MenuDivider
                style={{
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: '10px',
                    marginRight: '10px',
                }}
            />
            <MenuItem onClick={() => setSkill(skill)} style={{ paddingLeft: 16, paddingRight: 16 }}>
                <div className="flex py-1 ml-2 space-x-2 items-center">
                    <img className="w-6 h-6 rounded-full" src={skill.lightIcon.replace('/upload/', '/upload/c_fill,w_100/')} alt={skill.lightIconFilename} />
                    <div className="space-y-0.5">
                        {category && <p className="text-xs text-gray-400">{category}</p>}
                        <p className="text-sm">{skill.name}</p>
                    </div>
                </div>
            </MenuItem>
        </div>
    );
};

export default SkillMenuItem;
