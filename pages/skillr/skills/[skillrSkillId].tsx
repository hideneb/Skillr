import 'papercss';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { getUnexpiredToken } from '../../../lib/api-helpers';
import { SkillrSkillDto } from '../../../lib/types/skillr';
import { getSkillrSkills } from '../../api/skillr-skills';
import { PatchSkillrSkill } from '../../api/skillr-skills/[skillrSkillId]';
import { authedFetch } from '../../../lib/authed-fetch';
import { AddSkillrCredential, SkillrCredential } from '../../../components/UI/SkillrCredential';
import { AddSkillrShowcase, SkillrShowcase } from '../../../components/UI/SkillrShowcase';
import { AddSkillrShowcaseLink, SkillrShowcaseLink } from '../../../components/UI/SkillrShowcaseLink';
import { isProd } from '../../../lib/environment';

type SkillrSkillProps = {
    skillrSkill: SkillrSkillDto;
};

const SkillrSkill: React.FC<SkillrSkillProps> = ({ skillrSkill }) => {
    const [ratePerMinute, setRatePerMinute] = useState(skillrSkill.ratePerMinute);
    const [brief, setBrief] = useState(skillrSkill.brief);
    const [preApprovedRate, setPreApprovedRate] = useState(skillrSkill.preApprovedRate);
    const [newCredentialName, setNewCredentialName] = useState('');
    const [newCredentialFiles, setNewCredentialFiles] = useState<FileList | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const patchSkillrSkill: PatchSkillrSkill = {
            ratePerMinute,
            brief,
            submit: true,
            cancel: false,
        };

        await authedFetch(`/api/skillr-skills/${skillrSkill.skillrSkillId}`, {
            method: 'PUT',
            body: JSON.stringify(patchSkillrSkill),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    return (
        <>
            <h1>Skillr Skill</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Tell us about your background
                    <small>Experience and background in training people in {skillrSkill.skill.name}.</small>
                    <textarea value={brief} onChange={(e) => setBrief(e.target.value)} />
                </label>
                <h2>Your rate per minute</h2>
                <label>
                    <>
                        Pre-approved rate
                        <ul>
                            <li>$1.00 per minute for {skillrSkill.skill.name}</li>
                            <li>Available to offer free sessions up to 1 minute per session</li>
                            <li>You will be one of the preferred Skillrs for users to connect with</li>
                        </ul>
                    </>
                    <input
                        type="radio"
                        name="ratePerMinute"
                        checked={preApprovedRate}
                        onChange={(e) => setPreApprovedRate(true)}
                    />
                </label>
                <label>
                    <>
                        Set your own rate
                        <p>
                            Most {skillrSkill.skill.name} session rates are between <b>$1.00-$5.00 per minute</b>. If
                            you choose to set your own rate this Skill will not be ranked as high and will not be
                            applicable for learners to try for free.
                        </p>
                    </>
                    <input
                        type="radio"
                        name="ratePerMinute"
                        checked={!preApprovedRate}
                        onChange={(e) => setPreApprovedRate(false)}
                    />
                </label>
                {!preApprovedRate && (
                    <>
                        <label>
                            Your rate per minute
                            <input
                                type="range"
                                value={ratePerMinute}
                                onChange={(e) => setRatePerMinute(Number(e.target.value))}
                                min="100" // $1.00
                                max="500" // $5.00
                            />
                            <span>${ratePerMinute / 100}</span>
                        </label>
                    </>
                )}

                <button type="submit">Submit</button>
            </form>
            <h2>Credentials</h2>
            <p>Upload certifications that you have received, this will help us verify your credentials.</p>
            {skillrSkill.credentials.map((credential, i) => (
                <div key={i}>
                    <SkillrCredential credential={credential} skillrSkillId={skillrSkill.skillrSkillId} />
                </div>
            ))}
            <h3>Add document</h3>
            <AddSkillrCredential skillrSkillId={skillrSkill.skillrSkillId} />
            <h2>Showcase media</h2>
            <p>Share a photo or video trailer that best showcases this skill</p>
            {skillrSkill.showcases.map((showcase, i) => (
                <div key={i}>
                    <SkillrShowcase showcase={showcase} skillrSkillId={skillrSkill.skillrSkillId} />
                </div>
            ))}
            <h3>Add media</h3>
            <AddSkillrShowcase skillrSkillId={skillrSkill.skillrSkillId} />
            <h2>Additional Links</h2>
            <p>Share any links to show your expertise.</p>
            {skillrSkill.showcaseLinks.map((link, i) => (
                <div key={i}>
                    <SkillrShowcaseLink showcaseLink={link} skillrSkillId={skillrSkill.skillrSkillId} />
                </div>
            ))}
            <h3>Add link</h3>
            <AddSkillrShowcaseLink skillrSkillId={skillrSkill.skillrSkillId} />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillrSkillProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const skillrSkillId = Array.isArray(ctx.params?.skillrSkillId)
        ? ctx.params?.skillrSkillId[0]
        : ctx.params?.skillrSkillId;

    if (!skillrSkillId) {
        return { notFound: true };
    }

    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(ctx.resolvedUrl)}`,
            },
            props: {},
        };
    }

    const skillrSkills = await getSkillrSkills(token.jwt);
    const skillrSkill = skillrSkills.find((skillrSkill) => skillrSkill.skillrSkillId === skillrSkillId);

    if (!skillrSkill || !skillrSkill.skillrSkillId) {
        return { notFound: true };
    }

    return {
        props: {
            skillrSkill,
        },
    };
};

export default SkillrSkill;
