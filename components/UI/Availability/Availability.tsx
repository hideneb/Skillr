import React, { useState } from 'react';
import { SkillrLocalAvailabilityDto } from '../../../lib/types/skillr';
import SkillrEditIcon from '../SkillrPage/SkillrEditIcon';
import styles from './Availability.module.css';
import { AvailabilityDates } from './AvailabilityDates';

type AvailabilityProps = {
    isEditable?: boolean;
    initialAvailability?: SkillrLocalAvailabilityDto;
    handleSaveChanges?: (value: SkillrLocalAvailabilityDto) => void;
};

export const Availability: React.FC<AvailabilityProps> = (props: AvailabilityProps) => {
    const [availability, setAvailability] = useState<SkillrLocalAvailabilityDto>(
        props.initialAvailability || ({} as SkillrLocalAvailabilityDto)
    );
    const [isEditing, setIsEditing] = useState(false);

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

            <AvailabilityDates isEditing={isEditing} availability={availability} setAvailability={setAvailability} />

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
