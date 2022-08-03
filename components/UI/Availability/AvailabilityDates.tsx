import classNames from 'classnames';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Collapse from '@kunukn/react-collapse';
import Switch from 'react-switch';
import { SkillrLocalAvailabilityDto } from '../../../lib/types/skillr';
import styles from './Availability.module.css';

type AvailabilityProps = {
    isEditing?: boolean;
    availability: SkillrLocalAvailabilityDto;
    setAvailability?: (value: SkillrLocalAvailabilityDto) => void;
};

const formatTime = (t: moment.MomentInput) => moment(t, 'h:mm:ss a').format('h:mm a');

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const AvailabilityDates: React.FC<AvailabilityProps> = (props: AvailabilityProps) => {
    const { isEditing, availability, setAvailability } = props;
    const [openDayIndex, setOpenDayIndex] = useState<number | null>(null);

    useEffect(() => {
        if (!isEditing) setOpenDayIndex(null);
    }, [isEditing]);

    const toggleDayAvailablility = (checked: boolean, dayIndex: number) => {
        setAvailability?.({
            ...availability,
            [`day${dayIndex}Begin`]: checked ? '00:00:00' : null,
            [`day${dayIndex}End`]: checked ? '23:59:00' : null,
        });
    };

    const handleTimeChange = (value: string, name: string) => {
        setAvailability?.({
            ...availability,
            [name]: value,
        });
    };

    const toggleOpenDay = (dayId: number) => {
        if (!isEditing) return;

        if (openDayIndex === dayId) {
            setOpenDayIndex(null);
            return;
        }

        setOpenDayIndex(dayId);
    };

    return (
        <div className="w-full">
            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const startTime = availability?.[`day${dayIndex}Begin` as keyof SkillrLocalAvailabilityDto];
                const endTime = availability?.[`day${dayIndex}End` as keyof SkillrLocalAvailabilityDto];

                const isAvailable = startTime || endTime;
                const isOpen = openDayIndex === dayIndex;
                return (
                    <div key={dayIndex}>
                        <div
                            onClick={() => toggleOpenDay(dayIndex)}
                            className={classNames(styles.dayContainer, {
                                [styles.unavailable]: !startTime || !endTime,
                                'cursor-pointer': isEditing,
                            })}
                        >
                            <div className="flex items-center">
                                <div className={styles.day}>{days[dayIndex]}</div>
                                <div className={styles.hours}>
                                    {isAvailable
                                        ? `${formatTime(startTime)} - ${formatTime(endTime)}`
                                        : "I'm not available"}
                                </div>
                            </div>

                            {isEditing && <img className="w-3 cursor-pointer" src="/icons/pencil.svg" alt="Edit" />}
                        </div>
                        <Collapse transition="height 280ms cubic-bezier(0.4, 0, 0.2, 1)" isOpen={isOpen}>
                            <div className="w-full bg-gray-100 md:max-w-[300px] pt-2 pb-4 px-2 rounded-b-lg">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm">Allow booking requests</p>
                                    <Switch
                                        onColor="#0c1f3f"
                                        offColor="#ccc"
                                        width={48}
                                        disabled={!isEditing}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        onChange={(checked) => toggleDayAvailablility(checked, dayIndex)}
                                        checked={!!isAvailable}
                                    />
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <input
                                        disabled={!isAvailable || !isEditing}
                                        className="px-2 bg-gray-200 disabled:text-gray-400"
                                        type="time"
                                        step="1"
                                        value={startTime}
                                        onChange={(event) =>
                                            handleTimeChange(event.target.value, `day${dayIndex}Begin`)
                                        }
                                    />

                                    <input
                                        min={startTime}
                                        disabled={!isAvailable || !isEditing}
                                        className="px-2 bg-gray-200 disabled:text-gray-400"
                                        type="time"
                                        step="1"
                                        value={endTime}
                                        onChange={(event) => handleTimeChange(event.target.value, `day${dayIndex}End`)}
                                    />
                                </div>
                            </div>
                        </Collapse>
                    </div>
                );
            })}
        </div>
    );
};
