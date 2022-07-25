import React from 'react';

interface SkillrEditIconProps {
    onClick?: () => void;
}

export default function SkillrEditIcon({ onClick }: SkillrEditIconProps) {
    return (
        <div onClick={onClick} className="rounded-full bg-white cursor-pointer shadow-lg w-9 h-9 justify-center flex">
            <img className="w-3" src="/icons/pencil.svg" alt="Edit" />
        </div>
    );
}
