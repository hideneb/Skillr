import { SkillrDto } from './skillr';
import { UserDto } from './user';

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

type SkillrBookSkillrDto = SkillrDto & {
    user: UserDto;
    availability: SkillrAvailabilityDto;
};

type SkillrBookUserDto = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    freeSession: number;
    disabled: boolean;
    skillr: boolean;
    firstName: string;
    lastName: string;
    email: string;
    newEmail: string;
    notification: boolean;
    forDelete: boolean;
    mobileNumber: string;
    stripeCustomerId: string;
    stripePaymentMethod: string;
    displayName: string;
};

export type SkillrBookArchiveDto = {
    id: string;
    skillrBookId: string;
    createdAt: Date;
    duration: number;
    state: number;
    url: string;
};

export type SkillrBookRateDto = {
    id: string;
    skillrBookId: string;
    userId: string;
    forUserId: string;
    createdAt: Date;
    role: number;
    rate: number;
    note: string;
    badBehaviour: boolean;
    badCompetency: boolean;
    awfulExperience: boolean;
    didntAttendTheCall: boolean;
    badConnection: boolean;
    paymentIssue: boolean;
    other: string;
};

export type SkillrBookDto = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    state: number;
    skillId: number;
    skillrSkillId: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    cost: number;
    seconds: number;
    skillrReceived: number;
    freeSession: boolean;
    ratePerMinute: number;
    seekrAllowedToShare: boolean;
    skillr: SkillrBookSkillrDto;
    user: SkillrBookUserDto;
    archives: SkillrBookArchiveDto[];
    rate: SkillrBookRateDto[];
};

export type LightSkillrBookDto = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    state: number;
    skillId: number;
    skillrSkillId: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    cost: number;
    seconds: number;
    skillrReceived: number;
    freeSession: boolean;
    ratePerMinute: number;
};

export type VonageSessionDto = {
    ApiKey: string;
    sessionId: string;
    token: string;
};

export type ConnectNowDto = {
    skillrBook: LightSkillrBookDto;
    vonageSessionDetails: VonageSessionDto;
};
