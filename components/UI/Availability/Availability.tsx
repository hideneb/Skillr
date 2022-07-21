import React, { useState } from 'react';
import styles from './Availability.module.css';
import moment from 'moment';
import classNames from 'classnames';
import { SkillrLocalAvailabilityDto } from '../../../lib/types/skillr';
import SkillrEditIcon from '../SkillrPage/SkillrEditIcon';
import Collapsible from 'react-collapsible';
import Switch from 'react-switch';

type AvailabilityProps = {
    isEditable?: boolean;
    initialAvailability?: SkillrLocalAvailabilityDto;
    handleSaveChanges?: (value: SkillrLocalAvailabilityDto) => void;
};

const formatTime = (t: moment.MomentInput) => moment(t, 'h:mm:ss a').format('h:mm a');

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Availability: React.FC<AvailabilityProps> = (props: AvailabilityProps) => {
    const [availability, setAvailability] = useState<SkillrLocalAvailabilityDto>(
        props.initialAvailability || ({} as SkillrLocalAvailabilityDto)
    );
    const [isEditing, setIsEditing] = useState(false);

    const toggleDayAvailablility = (checked: boolean, dayIndex: number) => {
        setAvailability((prev: SkillrLocalAvailabilityDto) => ({
            ...prev,
            [`day${dayIndex}Begin`]: checked ? '00:00:00' : null,
            [`day${dayIndex}End`]: checked ? '11:59:00' : null,
        }));
    };

    const handleTimeChange = (value: string, name: string) => {
        setAvailability((prev: SkillrLocalAvailabilityDto) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onCancel = () => {
        setIsEditing(false);
        props?.initialAvailability && setAvailability(props.initialAvailability);
    };

    const onSave = () => {
        setIsEditing(false);
        props?.handleSaveChanges && props?.handleSaveChanges(availability);
    };

    return (
        <div style={{ minWidth: '300px' }}>
            <div className="flex mb-2 justify-between">
                <div className={styles.title}>Availability</div>

                {props.isEditable && !isEditing && <SkillrEditIcon onClick={() => setIsEditing(!isEditing)} />}
            </div>
            <div className={styles.info}>Showing times in your local timezone.</div>

            {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                const startTime = availability?.[`day${dayIndex}Begin` as keyof SkillrLocalAvailabilityDto];
                const endTime = availability?.[`day${dayIndex}End` as keyof SkillrLocalAvailabilityDto];

                const isAvailable = startTime || endTime;

                return (
                    <Collapsible
                        key={dayIndex}
                        transitionTime={200}
                        trigger={
                            <div
                                className={classNames(styles.dayContainer, {
                                    [styles.unavailable]: !startTime || !endTime,
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
                        }
                    >
                        <div className="w-full bg-gray-100 md:max-w-[300px] pt-2 pb-4 px-2 rounded-lg">
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
                                    onChange={(event) => handleTimeChange(event.target.value, `day${dayIndex}Begin`)}
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
                    </Collapsible>
                );
            })}

            {isEditing && (
                <div className="flex mt-4 space-x-5">
                    <button onClick={onSave} className={styles.saveButton}>
                        Save
                    </button>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
};
