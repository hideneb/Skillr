import 'papercss';
import { GetServerSideProps } from 'next';
import React, { FormEvent, useState } from 'react';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { getMySkillr, SkillrDDto } from '../api/skillrs/me';
import { authedFetch } from '../../lib/authed-fetch';
import { findLanguages, LanguageDto } from '../api/languages';
import { isProd } from '../../lib/environment';

type LanguagesDto = {
    id: number;
};

type SkillrLanguagesProps = {
    skillrDDto: SkillrDDto;
    languages: LanguageDto[];
};
const SkillrLanguages: React.FC<SkillrLanguagesProps> = ({ skillrDDto, languages }) => {
    const [skillrLanguages, setSkillrLanguages] = useState<LanguagesDto[]>(
        skillrDDto.languages.map((skillrLanguage) => ({
            id: skillrLanguage.languageId,
        }))
    );
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await authedFetch('/api/skillrs', {
            method: 'PUT',
            body: JSON.stringify({
                languages: skillrLanguages,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    const skillrLanguageIds = skillrLanguages.map((skillrLanguage) => skillrLanguage.id);

    return (
        <>
            <h1>Languages</h1>
            <form onSubmit={handleSubmit}>
                <h2>What languages do you speak?</h2>
                <ul>
                    {languages.map((language) => (
                        <li key={language.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="languages"
                                    value={language.id}
                                    checked={skillrLanguageIds.includes(language.id)}
                                    onChange={(event) => {
                                        const languageId = Number(event.target.value);
                                        const language = languages.find((language) => language.id === languageId);
                                        if (language) {
                                            if (skillrLanguageIds.includes(languageId)) {
                                                setSkillrLanguages(
                                                    skillrLanguages.filter(
                                                        (skillrLanguage) => skillrLanguage.id !== languageId
                                                    )
                                                );
                                            } else {
                                                setSkillrLanguages([...skillrLanguages, { id: languageId }]);
                                            }
                                        }
                                    }}
                                />
                                {language.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <button type="submit">Save</button>
            </form>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillrLanguagesProps> = async (context) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    const token = await getUnexpiredToken(context.req, context.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(context.resolvedUrl)}`,
            },
            props: {},
        };
    }

    const skillrDDto = await getMySkillr(token.jwt);

    const languages = await findLanguages();

    return {
        props: {
            skillrDDto,
            languages,
        },
    };
};

export default SkillrLanguages;
