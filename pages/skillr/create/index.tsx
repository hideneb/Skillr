import React, { FormEvent } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { SkillrStep1 } from '../profile';
import { getSkillrById } from '../../api/skillrs/[skillrId]';
import { getUnexpiredToken } from '../../../lib/api-helpers';
import { GetServerSideProps } from 'next';
import { isProd } from '../../../lib/environment';

const CreateSkillr: React.FC = () => {
    const [username, setUsername] = React.useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!username) {
            console.log('No username');
            return;
        }

        const payload: SkillrStep1 = {
            username,
        };
        const skillrDDto = await fetch(`/api/skillrs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then((res) => res.json());

        if (skillrDDto.id) {
            Router.push(`/skillr/profile`);
        }
    };

    return (
        <>
            <h1>Create Skillr</h1>
            <p>
                <Link href="/account">Back to account</Link>
            </p>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                    <button type="submit">Create</button>
                </form>
            </div>
            <p>
                <Link href="/skillr/create/skills">Next</Link>
            </p>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (isProd()) {
        return {
            notFound: true,
        };
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
    const skillr = await getSkillrById(token.id);
    if (skillr.id) {
        return {
            redirect: {
                permanent: false,
                destination: `/skillr/profile`,
            },
            props: {},
        };
    }
    return {
        props: {},
    };
};

export default CreateSkillr;
