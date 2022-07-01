import 'papercss';
import { GetServerSideProps } from 'next';
import React from 'react';
import { SkillDto } from '../api/skills';
import { getSkillById } from '../api/skills/[skillId]';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { SkillrBookDto, SkillrBookRateDto } from '../../lib/types/skillrBook';
import { getSkillrBookById } from '../api/skillrbooks/[skillrBookId]';
import { getSkillrBookRateById } from '../api/skillrbookrates/[skillrBookId]';
import { authedFetch } from '../../lib/authed-fetch';
import { isProd } from '../../lib/environment';

type SessionProps = {
    skillrBook: SkillrBookDto;
    skillrBookRate: SkillrBookRateDto | null;
    skill: SkillDto;
};

const Session: React.FC<SessionProps> = ({ skill, skillrBook, skillrBookRate }) => {
    const [stars, setStars] = React.useState(skillrBookRate?.rate || 0);
    const [feedback, setFeedback] = React.useState(skillrBookRate?.note || '');
    const [expandReport, setExpandReport] = React.useState(false);
    const [badBehavior, setBadBehavior] = React.useState(false);
    const [badCompetency, setBadCompetency] = React.useState(false);
    const [awfulExperience, setAwfulExperience] = React.useState(false);
    const [didntAttendTheCall, setDidntAttendTheCall] = React.useState(false);
    const [badConnection, setBadConnection] = React.useState(false);
    const [paymentIssue, setPaymentIssue] = React.useState(false);
    const [other, setOther] = React.useState(false);
    const [otherComment, setOtherComment] = React.useState('');
    const [seekrAllowedToShare, setSeekerAllowedToShare] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        authedFetch(`/api/skillrbookrates/${skillrBook.id}`, {
            method: 'POST',
            body: JSON.stringify({
                rate: stars,
                note: feedback,
                badBehaviour: badBehavior,
                badCompetency,
                awfulExperience,
                didntAttendTheCall,
                badConnection,
                paymentIssue,
                other: otherComment,
                seekrAllowedToShare,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <>
            <h1>{skill.name}</h1>
            <p>{skillrBook.skillr.username}</p>
            <p>{skillrBook.startDate}</p>
            <p>{skillrBook.duration}</p>
            <p>${skillrBook.cost}</p>

            {skillrBook.archives.map((archive, i) => (
                <video controls key={i}>
                    <source src={archive.url} type="video/mp4" />
                </video>
            ))}

            <form onSubmit={handleSubmit}>
                <h2>How was your session?</h2>
                <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={`Write public feedback for ${skillrBook.skillr.username}`}
                />
                <input
                    id="allowedToShare"
                    type="checkbox"
                    checked={seekrAllowedToShare}
                    onChange={() => setSeekerAllowedToShare(!seekrAllowedToShare)}
                />
                <label htmlFor="badBehavior">Allowed to share?</label>

                <h2>Had a bad session?</h2>
                <button onClick={() => setExpandReport(!expandReport)}>Report</button>
                {expandReport && (
                    <>
                        <h2>Sorry to hear. What was the problem?</h2>
                        <input
                            id="badBehavior"
                            type="checkbox"
                            checked={badBehavior}
                            onChange={() => setBadBehavior(!badBehavior)}
                        />
                        <label htmlFor="badBehavior">Skillr behavior</label>
                        <input
                            id="badCompetency"
                            type="checkbox"
                            checked={badCompetency}
                            onChange={() => setBadCompetency(!badCompetency)}
                        />
                        <label htmlFor="badCompetency">Skillr competency</label>
                        <input
                            id="didntAttendTheCall"
                            type="checkbox"
                            checked={didntAttendTheCall}
                            onChange={() => setDidntAttendTheCall(!didntAttendTheCall)}
                        />
                        <label htmlFor="didntAttendTheCall">Skillr didn&apos;t attend the call</label>
                        <input
                            id="badConnection"
                            type="checkbox"
                            checked={badConnection}
                            onChange={() => setBadConnection(!badConnection)}
                        />
                        <label htmlFor="badConnection">Bad connection</label>
                        <input
                            id="paymentIssue"
                            type="checkbox"
                            checked={paymentIssue}
                            onChange={() => setPaymentIssue(!paymentIssue)}
                        />
                        <label htmlFor="paymentIssue">Payment issue</label>
                        {/* <input id="awfulExperience" type="checkbox" checked={awfulExperience} onChange={() => setAwfulExperience(!awfulExperience)} />
            <label htmlFor="awfulExperience">Awful experience</label> */}
                        <input id="other" type="checkbox" checked={other} onChange={() => setOther(!other)} />
                        <label htmlFor="other">Other</label>

                        {other && (
                            <textarea
                                value={otherComment}
                                onChange={(e) => setOtherComment(e.target.value)}
                                placeholder={`Add a comment`}
                            />
                        )}
                    </>
                )}

                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SessionProps> = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const skillrBookId = Array.isArray(ctx.params?.skillrBookId)
        ? ctx.params?.skillrBookId[0]
        : ctx.params?.skillrBookId;

    if (!skillrBookId) {
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

    const skillrBook = await getSkillrBookById(token.jwt, skillrBookId);
    if (!skillrBook || !skillrBook.id) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(ctx.resolvedUrl)}`,
            },
            props: {},
        };
    }

    const skill = await getSkillById(skillrBook.skillId);

    const skillrBookRate = await getSkillrBookRateById(token.jwt, skillrBookId).then((skillrBookRate) => {
        return skillrBookRate.id ? skillrBookRate : null;
    });

    return {
        props: {
            skill,
            skillrBook,
            skillrBookRate,
        },
    };
};

export default Session;
