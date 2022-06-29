import React from 'react';
import { authedFetch } from '../../../lib/authed-fetch';
import { NewMedia } from '../Media';

type AddSkillrShowcaseLinkProps = {
    skillrSkillId: string;
};

const AddSkillrShowcaseLink: React.FC<AddSkillrShowcaseLinkProps> = ({ skillrSkillId }) => {
    const [url, setUrl] = React.useState('');
    const [name, setName] = React.useState('');

    const baseForm: Record<string, string> = {};
    baseForm.target = 'showcase';
    baseForm.skillrSkillId = skillrSkillId;

    const addShowcaseLink = async () => {
        if (!url || !name) {
            return;
        }
        const formData = new FormData();
        Object.keys(baseForm).forEach((key) => {
            formData.append(key, baseForm[key]);
        });
        formData.append('url', url);
        formData.append('name', name);

        return authedFetch('/api/skillrs/media', {
            method: 'POST',
            body: formData,
        }).then((res) => res.json());
    };

    return (
        <>
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>URL</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button type="submit" onClick={addShowcaseLink}>
                Add
            </button>
        </>
    );
};

export default AddSkillrShowcaseLink;
