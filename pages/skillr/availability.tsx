import 'papercss';
import { GetServerSideProps } from 'next';
import React, { FormEvent, useState } from 'react';
import { getUnexpiredToken } from '../../lib/api-helpers';
import { SkillrLocalAvailabilityDto } from '../../lib/types/skillr';
import { getMySkillr, SkillrDDto } from '../api/skillrs/me';
import { authedFetch } from '../../lib/authed-fetch';

type SkillrAvailabilityProps = {
    skillrDDto: SkillrDDto;
};
const SkillrAvailabilty: React.FC<SkillrAvailabilityProps> = ({ skillrDDto }) => {
    const localAvailability = skillrDDto.localAvailability;

    const [timezoneOffset, setTimezoneOffset] = useState<number>(localAvailability.timezoneOffset);

    const [day0Begin, setDay0Begin] = useState<string>(localAvailability.day0Begin);
    const [day0End, setDay0End] = useState<string>(localAvailability.day0End);
    const [day1Begin, setDay1Begin] = useState<string>(localAvailability.day1Begin);
    const [day1End, setDay1End] = useState<string>(localAvailability.day1End);
    const [day2Begin, setDay2Begin] = useState<string>(localAvailability.day2Begin);
    const [day2End, setDay2End] = useState<string>(localAvailability.day2End);
    const [day3Begin, setDay3Begin] = useState<string>(localAvailability.day3Begin);
    const [day3End, setDay3End] = useState<string>(localAvailability.day3End);
    const [day4Begin, setDay4Begin] = useState<string>(localAvailability.day4Begin);
    const [day4End, setDay4End] = useState<string>(localAvailability.day4End);
    const [day5Begin, setDay5Begin] = useState<string>(localAvailability.day5Begin);
    const [day5End, setDay5End] = useState<string>(localAvailability.day5End);
    const [day6Begin, setDay6Begin] = useState<string>(localAvailability.day6Begin);
    const [day6End, setDay6End] = useState<string>(localAvailability.day6End);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const skillrLocalAvailability: Partial<SkillrLocalAvailabilityDto> = {
            timezoneOffset,
            day0Begin,
            day0End,
            day1Begin,
            day1End,
            day2Begin,
            day2End,
            day3Begin,
            day3End,
            day4Begin,
            day4End,
            day5Begin,
            day5End,
            day6Begin,
            day6End,
            type: localAvailability.type,
        };

        await authedFetch('/api/skillrs', {
            method: 'PUT',
            body: JSON.stringify({
                localAvailability: skillrLocalAvailability,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());
    };

    return (
        <>
            <h1>Skillr Availability</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Timezone Offset</label>
                    <input
                        type="number"
                        value={timezoneOffset}
                        onChange={(event) => setTimezoneOffset(Number(event.target.value))}
                    />
                </div>
                <div>
                    <label>Day 0 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day0Begin}
                        onChange={(event) => setDay0Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 0 End</label>
                    <input type="time" step="1" value={day0End} onChange={(event) => setDay0End(event.target.value)} />
                </div>
                <div>
                    <label>Day 1 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day1Begin}
                        onChange={(event) => setDay1Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 1 End</label>
                    <input type="time" step="1" value={day1End} onChange={(event) => setDay1End(event.target.value)} />
                </div>
                <div>
                    <label>Day 2 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day2Begin}
                        onChange={(event) => setDay2Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 2 End</label>
                    <input type="time" step="1" value={day2End} onChange={(event) => setDay2End(event.target.value)} />
                </div>
                <div>
                    <label>Day 3 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day3Begin}
                        onChange={(event) => setDay3Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 3 End</label>
                    <input type="time" step="1" value={day3End} onChange={(event) => setDay3End(event.target.value)} />
                </div>
                <div>
                    <label>Day 4 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day4Begin}
                        onChange={(event) => setDay4Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 4 End</label>
                    <input type="time" step="1" value={day4End} onChange={(event) => setDay4End(event.target.value)} />
                </div>
                <div>
                    <label>Day 5 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day5Begin}
                        onChange={(event) => setDay5Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 5 End</label>
                    <input type="time" step="1" value={day5End} onChange={(event) => setDay5End(event.target.value)} />
                </div>
                <div>
                    <label>Day 6 Begin</label>
                    <input
                        type="time"
                        step="1"
                        value={day6Begin}
                        onChange={(event) => setDay6Begin(event.target.value)}
                    />
                </div>
                <div>
                    <label>Day 6 End</label>
                    <input type="time" step="1" value={day6End} onChange={(event) => setDay6End(event.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
            <pre>{JSON.stringify(localAvailability, null, 2)}</pre>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillrAvailabilityProps> = async (context) => {
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

    return {
        props: {
            skillrDDto,
        },
    };
};

export default SkillrAvailabilty;
