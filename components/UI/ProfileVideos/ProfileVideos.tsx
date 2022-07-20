import 'react-modal-video/css/modal-video.min.css';

const ModalVideo: any = dynamic(() => import('react-modal-video'), {
    ssr: false,
});
import styles from './ProfileVideos.module.css';
import { SkillrMediaDto } from '../../../lib/types/skillr';
import classNames from 'classnames';
import PlayIcon from '../../../public/play.svg';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';

type ProfileVideosProps = {
    videos: SkillrMediaDto[];
    featureImage: string;
};

const ProfileVideos: React.FC<ProfileVideosProps> = ({ videos, featureImage }) => {
    const [videoOpen, setVideoOpen] = useState(false);
    const [videoSource, setVideoSource] = useState('');

    const isLargeScreen = useMediaQuery({
        query: '(min-width: 1200px)',
    });

    const openVideo = (src: string) => {
        setVideoSource(src);
        setVideoOpen(true);
    };

    const closeVideo = () => {
        setVideoSource('');
        setVideoOpen(false);
    };

    const resultsPerRow = isLargeScreen ? 5 : 3;
    const rowCount = Math.ceil(videos.length / resultsPerRow);

    return (
        <>
            <div
                className={classNames(styles.profileVideos, {
                    [styles.singleVideoLayout]: videos.length === 1,
                })}
            >
                {videos.map((v, idx) => {
                    return (
                        <div
                            key={v.id}
                            onClick={() => {
                                if (v.video) {
                                    openVideo(v.video);
                                }
                            }}
                            className={classNames(styles.result, {
                                [styles.firstOfSingleRow]: idx === 0 && rowCount === 1,
                                [styles.lastOfSingleRow]: idx === videos.length - 1 && rowCount === 1,
                                [styles.firstColumnOfFirstRow]: idx === 0 && rowCount > 1,
                                [styles.lastColumnOfFirstRow]: idx === resultsPerRow - 1 && rowCount > 1,
                                [styles.firstColumnOfLastRow]:
                                    idx === rowCount * resultsPerRow - resultsPerRow && rowCount > 1,
                                [styles.lastColumnOfLastRow]: idx === videos.length - 1 && rowCount > 1,
                            })}
                        >
                            <PlayIcon className={styles.play} />
                            <img className={styles.video} src={videos.length === 1 ? featureImage : v.image} alt="" />
                        </div>
                    );
                })}
            </div>
            {typeof window !== 'undefined' && (
                <ModalVideo
                    channel="custom"
                    autoplay={true}
                    url={videoSource}
                    isOpen={videoOpen}
                    onClose={() => closeVideo()}
                />
            )}
        </>
    );
};

export default ProfileVideos;
