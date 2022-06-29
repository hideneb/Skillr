import React from 'react';
import { NewMedia } from '../Media';

const allowedMimeTypes = ['image/jpeg', 'image/png', 'video/mp4'];

type AddSkillrShowcaseProps = {
    skillrSkillId: string;
};

const AddSkillrShowcase: React.FC<AddSkillrShowcaseProps> = ({ skillrSkillId }) => {
    const baseForm: Record<string, string> = {};
    baseForm.target = 'showcase';
    baseForm.skillrSkillId = skillrSkillId;

    return (
        <>
            <NewMedia baseForm={baseForm} accept={allowedMimeTypes.join(' ')} />
        </>
    );
};

export default AddSkillrShowcase;
