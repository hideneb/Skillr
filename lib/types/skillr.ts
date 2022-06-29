export type SkillrSkillDetailsDto = {
    id: number;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    lightIcon: string;
    lightIconFilename: string;
    darkIcon: string;
    darkIconFilename: string;
    popularIcon: any;
    popularIconFilename: any;
    parentId: number;
};

export type CredentialDto = {
    id: string;
    filename: string;
    url: string;
    name: string;
};

export type ShowcaseDto = {
    id: string;
    image: string;
    video?: string;
    filename?: string;
    type: number;
};

export type ShowcaseLinkDto = {
    id: string;
    url: string;
    name: string;
};

export type SkillrSkillDto = {
    skillrSkillId: string;
    skillId: number;
    createdAt: string;
    submitDate: string;
    preApprovedRate: boolean;
    ratePerMinute: number;
    state: number;
    brief: string;
    isInstantMatch: boolean;
    skill: SkillrSkillDetailsDto;
    credentials: CredentialDto[];
    showcases: ShowcaseDto[];
    showcaseLinks: ShowcaseLinkDto[];
};

export type SkillrAvailabilityDto = {
    id: string;
    type: number;
    day0Begin: string;
    day0End: string;
    day1Begin: string;
    day1End: string;
    day2Begin: string;
    day2End: string;
    day3Begin: string;
    day3End: string;
    day4Begin: string;
    day4End: string;
    day5Begin: string;
    day5End: string;
    day6Begin: string;
    day6End: string;
};

export type SkillrLocalAvailabilityDto = SkillrAvailabilityDto & {
    skillrId: string;
    timezoneOffset: number;
};

export type SkillrImageDto = {
    id: string;
    cover: number;
    filename: string;
    image: string;
    type: number;
    video: string;
};

export type SkillrDto = {
    id: string;
    username: string;
    displayName: string;
    profileImage: string;
    rating: number;
    instagram: string;
    linkedin: string;
    twitter: string;
    tiktok: string;
    skills: SkillrSkillDto[];
    availability?: SkillrAvailabilityDto;
    localAvailability?: SkillrLocalAvailabilityDto;
    about: string;
    isAvailableNow: boolean;
    isFavourite?: boolean;
    images: SkillrImageDto[];
};
