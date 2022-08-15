import React, { CSSProperties, FormEvent, useState } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { SkillrDDto } from 'pages/api/skillrs/me';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import { findSkills, SkillDto } from 'pages/api/skills';
import { getSkillrSkills } from 'pages/api/skillr-skills';
import { SkillrOnboardingSteps, SkillrSkillDetailsDto, SkillrSkillDto } from '@/lib/types/skillr';
import Router from 'next/router';
import { authedFetch } from '@/lib/authed-fetch';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import TextField from '@/components/UI/TextField/TextField';
import { Menu, MenuItem, MenuDivider, FocusableItem, MenuGroup, MenuHeader } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

type ChooseSkillProps = {
    skillrDDto: SkillrDDto;
    skills: SkillDto[];
    skillrSkills: SkillrSkillDto[];
};

const menuItemStyles: CSSProperties = {
    paddingLeft: 16,
    paddingRight: 16,
};

const ChooseSkill: React.FC<ChooseSkillProps> = ({ skills, skillrSkills }) => {
    const skillrSkill = skillrSkills[0];
    const [ratePerMinute, setRatePerMinute] = useState<string | number>(skillrSkill?.ratePerMinute);
    const [tags, setTags] = useState<string>('');
    const [skill, setSkill] = useState<SkillDto | SkillrSkillDetailsDto | null>(skillrSkill?.skill);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [skillError, setSkillError] = useState<string>('');
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        setIsLoading(true);

        const payload = {
            skillId: skill?.id,
            tags: tags.split(', '), // We need to pass tags as an array of strings
            ratePerMinute: Number(ratePerMinute),
        };

        try {
            const data = await authedFetch(`/api/skillr-skills`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => res.json());

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

    // Filter and display skills that match the searchValue
    const filteredSkills = skills.filter(({ name }) => name.toLowerCase().includes(searchValue.toLowerCase()));

    // Get parent skills of skills that match the searchValue
    const filteredParents = filteredSkills.filter(({ parentId }) => !parentId);

    /** Takes in the parent skillId as a parameter and returns the name of the parent skill  */
    const getParentNameById = (parentId: SkillDto['parentId']) => skills.find(({ id }) => id === parentId)?.name;

    /** Takes in the parent skillId as a parameter and returns the children of the parent skill  */
    const getChildSkills = (parentId: SkillDto['parentId']) => skills.filter((skill) => skill.parentId === parentId);

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
                            <form onSubmit={handleSubmit} className="w-full">
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
                                                            {getChildSkills(eachParent.id).map((childSkill) => (
                                                                <div key={childSkill.id}>
                                                                    <MenuDivider style={{ margin: 0 }} />
                                                                    <MenuItem
                                                                        onClick={() => setSkill(childSkill)}
                                                                        style={menuItemStyles}
                                                                    >
                                                                        <div className="flex py-1 space-x-2 items-center">
                                                                            <img
                                                                                className="w-6 h-6 rounded-full"
                                                                                src={childSkill.lightIcon}
                                                                                alt={childSkill.lightIconFilename}
                                                                            />
                                                                            <div className="space-y-0.5">
                                                                                <p className="text-xs text-gray-400">
                                                                                    {getParentNameById(
                                                                                        childSkill.parentId
                                                                                    )}
                                                                                </p>
                                                                                <p className="text-sm">
                                                                                    {childSkill.name}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </MenuItem>
                                                                </div>
                                                            ))}
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
                                                    value={ratePerMinute}
                                                    onChange={(event) => setRatePerMinute(event.target.value)}
                                                    placeholder="$0.00"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500">Optional</p>
                                        </div>

                                        <div className="space-y-2 items-center flex flex-col w-full">
                                            <p className="text-xl text-center font-semibold">
                                                What are your areas of expertise in this skill? <br /> (Add up to 5
                                                tags)
                                            </p>
                                            <div className="max-w-[327px] w-full">
                                                <TextField
                                                    value={tags}
                                                    onChange={(event) => setTags(event.target.value)}
                                                    placeholder="Add tag, e.g. Manage stress"
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500">Optional</p>
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
                                    />
                                </div>
                            </form>
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

    return {
        props: { skillrDDto: skillr, skills, skillrSkills },
    };
};
