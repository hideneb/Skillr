import type { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrLocalAvailabilityDto, SkillrSkillDto } from '../../../lib/types/skillr';
import { UserDto } from '../../../lib/types/user';
import { SkillrLanguageDto } from '../../skillr/profile';

export type SkillrRejectDto = {
    id: string;
    createdAt: Date;
    general: boolean;
    contacts: boolean;
    about: boolean;
    notes: string;
};

export type SkillrMediaDto = {
    id: string;
    image: string;
    video?: string;
    filename?: string;
    type: number;
    cover: number;
};

export type SkillrDDto = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    submitDate: Date;
    disabled: boolean;
    approved: boolean;
    active: boolean;
    state: number;
    username: string;
    rating: number;
    ratingVoters: number;
    defaultRatePerMinute: number;
    minimumDuration: number;
    tagline: string;
    about: string;
    avatar: string;
    profileImage: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    twitter?: string;
    featured: boolean;
    influencer: boolean;
    availabilityType: number;
    stripeAccountId: string;
    stripeAccountStatus: number;
    user: UserDto;
    rejectReason: SkillrRejectDto;
    images: SkillrMediaDto[];
    localAvailability: SkillrLocalAvailabilityDto;
    languages: SkillrLanguageDto[];
    skills: SkillrSkillDto[];
};

const { API_HOST } = process.env;
export const getMySkillr = async (jwt: string): Promise<SkillrDDto> => {
    return fetch(`${API_HOST}/api/app/skillrs/me`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrDDto>) {
    const { method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'GET':
            const skillr = await getMySkillr(auth.jwt);
            res.status(200).json(skillr);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
