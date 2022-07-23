import React from 'react';
import styles from './Bio.module.css';
import classNames from 'classnames';
import Image from 'next/image';

export default function Bio({ size, hoverImg, isHover, img, name, skill, body }) {
    return (
        <div
            className={classNames(
                styles.bioContainer,
                size == 'big'
                    ? hoverImg !== undefined
                        ? classNames(styles.bigBioHover, styles.bigBio)
                        : styles.bigBio
                    : styles.smallBio,
                isHover && styles.isHover
            )}
        >
            <div>
                <div className={classNames(styles.relative, styles.bioImg)}>
                    <div className={styles.originImg}>
                        <Image width={216} height={323} src={img} alt={name} />
                    </div>
                    {!!hoverImg && hoverImg !== '' && (
                        <div className={classNames(hoverImg !== '' && styles.hoverImg)}>
                            <Image width={216} height={323} src={hoverImg} alt={name} />
                        </div>
                    )}

                    <div className={classNames(styles.absolute, styles.bioDetail)}>
                        <p className={styles.bioName}>{name}</p>
                        <p className={styles.bioSkill}>{skill}</p>
                    </div>
                </div>
                <div className={classNames(styles.bioContent, isHover && styles.absolute)}>
                    <p className={styles.bioBody}>{body}</p>
                </div>
            </div>
        </div>
    );
}
