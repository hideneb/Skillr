import React, { FormEvent, useState, CSSProperties, ChangeEvent, useMemo, useCallback } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import { findSkills } from 'pages/api/skills';
import { getSkillrSkills } from 'pages/api/skillr-skills';
import { SkillrOnboardingSteps, SkillrSkillDetailsDto, SkillrSkillDto } from '@/lib/types/skillr';
import Router from 'next/router';
import { apiHostFetch } from '@/lib/api-fetch';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import TextField from '@/components/UI/TextField/TextField';
import { Menu, FocusableItem, MenuGroup, MenuHeader } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { UserToken } from '@/lib/types/user';
import SkillMenuItem from '@/components/UI/Onboarding/SkillMenuItem';
import { SkillDto } from '@/lib/types/skill';

type Tag = {
    tag: string;
};

interface Skillr extends SkillDto {
    tags: Tag[];
}

type ChooseSkillProps = {
    skilltags: string[];
    skills: SkillDto[];
    skillrSkills: SkillrSkillDto[];
    token: UserToken;
};

const menuItemStyles: CSSProperties = {
    paddingLeft: 16,
    paddingRight: 16,
};

const CATEGORIES = [
    'Chefs',
    'Live Music',
    'Dance',
    'Quit Coach',
    'Yoga Instructors',
    'Math HW Help',
    'Science HW Help',
    'Gardeners',
    'Music',
];

const ChooseSkill: React.FC<ChooseSkillProps> = ({ skilltags, skills, skillrSkills, token }) => {
    const skillrSkill = skillrSkills[0];
    const initialRate =
        skillrSkill?.ratePerMinute &&
        (Number.parseFloat(skillrSkill.ratePerMinute as unknown as string) / 100.0).toFixed(2);
    const [ratePerMinute, setRatePerMinute] = useState<string | number>(initialRate);
    const [tags, setTags] = useState<string[]>(skilltags);
    const [newTag, setNewTag] = useState<string>('');
    const [skill, setSkill] = useState<SkillDto | SkillrSkillDetailsDto | null>(skillrSkill?.skill);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [skillError, setSkillError] = useState<string>('');
    const [searchValue, setSearchValue] = useState('');

    const addNewTag = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTags((prev) => [...prev, newTag]);
        setNewTag('');
    };

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((tagItem) => tagItem !== tag));
    };

    const handleSubmit = async () => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        setIsLoading(true);

        const payload = {
            skillId: skill?.id,
            tags,
            ratePerMinute: Math.ceil(Number(ratePerMinute) * 100),
        };

        try {
            let data;
            if (!skillrSkill) {
                data = await apiHostFetch(`/api/app/skillrSkills`, {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token.jwt}`,
                    },
                }).then((res) => res.json());
            } else {
                data = await apiHostFetch(`/api/app/skillrSkills/${skillrSkill.skillrSkillId}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token.jwt}`,
                    },
                }).then((res) => res.json());
            }

            if (data.skillId) {
                Router.push(`/onboarding/skillr/steps/availability`);
            } else {
                setSkillError(data.errors?.[0]?.messages?.[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const handleOnRateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRatePerMinute(event.target.value);
    };

    // Get parent skills of skills that match the searchValue

    /** Takes in the parent skillId as a parameter and returns the name of the parent skill  */
    const getParentNameById = useCallback((parentId: SkillDto['parentId']) => {
        return skills.find(({ id }) => id === parentId)?.name
    }, [skills]);

    /** Takes in the parent skillId as a parameter and returns the children of the parent skill  */
    const getChildSkills = useCallback((parentId: SkillDto['parentId']) => {
        return skills
        .filter((skill) => skill.parentId === parentId)
        .sort((a, b) => a.name.localeCompare(b.name))
    }, [skills]);

    const isIncludesSearchKeyword = useCallback((searchKeyword: string) => {
        return searchKeyword.toLowerCase().includes(searchValue.toLowerCase())
    }, [searchValue]);

    const filteredParents = useMemo(() => {
        return skills.filter(
        ({ parentId, id }) =>
            !parentId &&
            getChildSkills(id)
                .map((childSkill) => {
                    if (CATEGORIES.includes(childSkill.name)) {
                        return getChildSkills(childSkill.id).filter(({ name }) => isIncludesSearchKeyword(name));
                    }

                    if (isIncludesSearchKeyword(childSkill.name)) {
                        return childSkill;
                    }
                })
                .flat()
                .filter((item) => item).length
    )}, [getChildSkills, isIncludesSearchKeyword, skills]);

    const getSkills = useCallback((id: number) => {
            return getChildSkills(id).map((childSkill) => {
            if (CATEGORIES.includes(childSkill.name)) {
                return getChildSkills(childSkill.id)
                    .filter(({ name }) => isIncludesSearchKeyword(name))
                    .map((skill) => (
                        <SkillMenuItem
                            key={skill.id}
                            skill={skill}
                            setSkill={setSkill}
                            category={getParentNameById(skill.parentId)}
                        />
                    ));
            }

            if (isIncludesSearchKeyword(childSkill.name)) {
                return <SkillMenuItem key={childSkill.id} skill={childSkill} setSkill={setSkill} />;
            }
        })}, [getChildSkills, getParentNameById, isIncludesSearchKeyword ]);

    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9">
                <div className="w-full">
                    <div className="flex px-4 flex-col items-center">
                        <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">Skill</h2>
                        <p className="text-sm text-center">
                            Complete all required fields below. Don&apos;t worry, you can always change them later.
                        </p>
                    </div>
                    <hr className="my-4 md:my-5" />
                    <div className="px-4 md:px-10">
                        <div className="w-full max-w-[690px] mx-auto flex flex-col space-y-5 md:space-y-5">
                            <h3 className="text-center font-bold text-xl">What is your skill?</h3>
                            <div className="w-full">
                                <div className="space-y-5 md:space-y-9">
                                    <div className="flex flex-col items-center space-y-5">
                                        <div className="max-w-[327px] w-full">
                                            <Menu
                                                menuStyle={{ width: '100%' }}
                                                align="center"
                                                overflow="auto"
                                                position="anchor"
                                                setDownOverflow
                                                boundingBoxPadding="10"
                                                className="w-full"
                                                onMenuChange={(e) => e.open && setSearchValue('')}
                                                menuButton={
                                                    <div className="flex border-b pb-2 w-full items-center justify-between cursor-pointer">
                                                        <div className="flex items-center space-x-2">
                                                            {skill && (
                                                                <img
                                                                    className="w-6 h-6 rounded-full"
                                                                    src={skill.lightIcon}
                                                                    alt={skill.lightIconFilename}
                                                                />
                                                            )}
                                                            <p className="text-base">
                                                                {skill?.name ?? 'Select a skill'}
                                                            </p>
                                                        </div>
                                                        <img
                                                            className="w-2"
                                                            src="/icons/arrow-right.svg"
                                                            alt="arrow-right"
                                                        />
                                                    </div>
                                                }
                                                transition
                                            >
                                                <FocusableItem style={menuItemStyles}>
                                                    {({ ref }) => (
                                                        <input
                                                            ref={ref}
                                                            className="bg-slate-100 w-full p-2 rounded-lg outline-none text-sm"
                                                            type="search"
                                                            placeholder="Search"
                                                            value={searchValue}
                                                            onChange={(e) => setSearchValue(e.target.value)}
                                                        />
                                                    )}
                                                </FocusableItem>
                                                <MenuGroup takeOverflow>
                                                    {filteredParents.map((eachParent) => (
                                                        <div key={eachParent.id}>
                                                            <MenuHeader style={menuItemStyles}>
                                                                {eachParent.name}
                                                            </MenuHeader>
                                                            {getSkills(eachParent.id)}
                                                        </div>
                                                    ))}
                                                </MenuGroup>
                                            </Menu>
                                        </div>
                                        <div className="space-y-2 items-center flex flex-col w-full">
                                            <p className="text-xl text-center font-semibold">Set your Skillr rate:</p>
                                            <p className="text-sm text-rich-blue-7">
                                                This is the rate you charge users per minute
                                            </p>
                                            <div className="max-w-[327px] w-full">
                                                <TextField
                                                    type="number"
                                                    step={0.01}
                                                    prefix="$"
                                                    value={ratePerMinute}
                                                    onChange={handleOnRateChange}
                                                    placeholder="0.00"
                                                    onBlur={() =>
                                                        ratePerMinute &&
                                                        setRatePerMinute(
                                                            Number.parseFloat(ratePerMinute as string).toFixed(2)
                                                        )
                                                    }
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500">Optional</p>
                                        </div>

                                        <div className="space-y-2 items-center flex flex-col w-full">
                                            <p className="text-xl text-center font-semibold">
                                                What are your areas of expertise in this skill? <br /> (Add up to 5
                                                tags)
                                            </p>
                                            <form onSubmit={addNewTag} className="max-w-[327px] relative w-full">
                                                <TextField
                                                    value={newTag}
                                                    maxLength={20}
                                                    onChange={(event) => setNewTag(event.target.value)}
                                                    placeholder="Add tag, e.g. Manage stress"
                                                />
                                                {!!newTag && (
                                                    <button
                                                        type="submit"
                                                        className="text-white w-6 absolute right-3 top-3 h-6 bg-skillr-pink rounded-full"
                                                    >
                                                        +
                                                    </button>
                                                )}

                                                <div className="flex w-full mt-1 justify-between">
                                                    <p className="text-sm text-gray-500">Optional</p>
                                                    <p className="text-sm text-gray-500">{newTag.length}/20</p>
                                                </div>
                                            </form>

                                            <div className="flex flex-wrap">
                                                {tags.map((tag) => (
                                                    <div
                                                        key={tag}
                                                        onClick={() => removeTag(tag)}
                                                        className="rounded-full text-sm bg-gray-300 py-1 px-3 flex items-center space-x-4 mx-1 my-1 cursor-pointer"
                                                    >
                                                        <span>{tag}</span>
                                                        <img
                                                            className="w-2 h-2"
                                                            src="/icons/icon-close.svg"
                                                            alt="Modal Close"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {!!skillError && (
                                        <p className="text-skillr-pink text-center text-xs">{skillError}</p>
                                    )}
                                </div>
                                <div className="mt-12">
                                    <StepsController
                                        current={SkillrOnboardingSteps.CHOOSE_SKILL}
                                        isNextDisabled={!skill}
                                        isNextLoading={isLoading}
                                        onNextClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default ChooseSkill;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/onboarding/skillr`,
            },
            props: {},
        };
    }

    const skillr = await getSkillrById(token.id);
    const skills = await findSkills(false);
    const skillrSkills = await getSkillrSkills(token.jwt);

    const skilltags = (skillr.skills[0] as unknown as Skillr)?.tags?.map((tag) => tag.tag) || [];

    return {
        props: { skilltags, skills, skillrSkills, token },
    };
};
