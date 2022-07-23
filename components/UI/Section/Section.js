import React from 'react';
import classNames from 'classnames';

import styles from './Section.module.css';
import Image from 'next/image';

export default function Section({ image, altText, title, description, flip, style, imageBorder }) {
    return (
        <div className={styles.wrapper} style={style}>
            <div className={classNames(styles.section, { [styles.flip]: flip })}>
                <div className={styles.section__left}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className="desktop">{description}</div>
                </div>
                <div className={styles.section__right}>
                    <div
                        className={classNames('mobileFrame', styles.frame)}
                        style={{ border: imageBorder ? '1px solid #e5e8e9' : '' }}
                    >
                        <Image width={280} height={580} objectFit="cover" src={image} alt={altText} />
                    </div>
                    <div className="tablet">{description}</div>
                </div>
            </div>
        </div>
    );
}
