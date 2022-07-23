import styles from './Session.module.css';
import moment, { duration } from 'moment';

import { SkillrDto } from '../../../lib/types/skillr';
import { SkillDto } from '../../../pages/api/skills';

import { OTPublisher, OTPublisherRef, OTSession, OTStreams, OTSubscriber, OTSubscriberRef } from 'opentok-react';

import useInterval from '../../../lib/useInterval';

import {
    ArchiveEvent,
    AudioLevelUpdatedEvent,
    ConnectionCreatedEvent,
    ConnectionDestroyedEvent,
    Event,
    Error,
    MediaStoppedEvent,
    PublisherStats,
    SessionConnectEvent,
    SessionDisconnectEvent,
    SessionReconnectEvent,
    SessionReconnectingEvent,
    SignalEvent,
    StreamCreatedEvent,
    StreamDestroyedEvent,
    StreamPropertyChangedEvent,
    VideoDimensionsChangedEvent,
    VideoElementCreatedEvent,
} from 'opentok-react/types/opentok';
require('@opentok/client');

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

type SessionProps = {
    apiKey: string;
    sessionId: string;
    token: string;
    onEnd: () => void;
    skillr: SkillrDto;
    skill: SkillDto;
};

// TODO: call onEnd appropriately
const Session: React.FC<SessionProps> = ({ apiKey, sessionId, token, onEnd, skillr, skill }) => {
    const [publishVideo, setPublishVideo] = useState(true);
    const [publishAudio, setPublishAudio] = useState(true);
    const [fullScreenModeActive, setFullScreenModeActive] = useState(false);
    const [callStartTime, setCallStartTime] = useState<Date | undefined>(undefined);
    const [callDuration, setCallDuration] = useState<number>(0);
    const [callCost, setCallCost] = useState<number>(0);

    const [skillrVideoPresent, setSkillrVideoPresent] = useState(false);

    const otPublisherRef = React.useRef<OTPublisherRef>(null);
    const otSubscriberRef = React.useRef<OTSubscriberRef>(null);

    useInterval(() => {
        otPublisherRef?.current?.getPublisher().getStats((err: Error | undefined, stats: PublisherStats[]) => {
            if (stats) {
                const duration = moment.duration(moment().diff(moment(callStartTime))).asMilliseconds();
                setCallDuration(duration);
                setCallCost((duration / 1000 / 60) * skillr.skills[0].ratePerMinute);
            }
        });
    }, 1000);

    const hangUp = () => {
        if (!otPublisherRef.current) {
            return;
        }
        otPublisherRef.current.getPublisher().session?.disconnect();
        // TODO: POST to /api/app/vonage/pay/:skillrBookId -d { seconds: seconds }
        onEnd();
    };

    return (
        <div
            className={classNames(styles.session, {
                [styles.skillrVideoPresent]: skillrVideoPresent,
                [styles.fullScreenModeActive]: fullScreenModeActive,
            })}
        >
            <img src={'/logo-navbar.svg'} className={styles.mobileLogo} alt="" />
            <div className={styles.skillrInfo}>
                <div className={styles.username}>@{skillr.username}</div>
                <div className={styles.title}>{skill.description}</div>
            </div>
            <div className={styles.skillrProfileImage}>
                <img src={skillr.profileImage} alt="" />
            </div>
            <OTSession
                apiKey={apiKey}
                sessionId={sessionId}
                token={token}
                onConnect={() => {
                    console.log('connected');
                }}
                onError={(e) => {
                    console.error(e);
                }}
                eventHandlers={{
                    sessionConnected: (event: SessionConnectEvent) => {
                        console.log('session connected', event);
                    },
                    connectionCreated: (event: ConnectionCreatedEvent) => {
                        console.log('connection created', event);
                    },
                    archiveStarted: (event: ArchiveEvent) => {
                        console.log('archive started', event);
                    },
                    streamCreated: (event: StreamCreatedEvent) => {
                        console.log('stream created', event);
                    },
                    streamPropertyChanged: (event: StreamPropertyChangedEvent) => {
                        console.log('stream property changed', event);
                    },
                    signal: (event: SignalEvent) => {
                        console.log('signal', event);
                    },
                    streamDestroyed: (event: StreamDestroyedEvent) => {
                        if (event.reason === 'forceDisconnected') {
                            onEnd();
                        }
                        console.log('stream destroyed', event);
                    },
                    archiveStopped: (event: ArchiveEvent) => {
                        console.log('archive stopped', event);
                    },
                    connectionDestroyed: (event: ConnectionDestroyedEvent) => {
                        console.log('connection destroyed', event);
                    },
                    sessionReconnecting: (event: SessionReconnectingEvent) => {
                        console.log('session reconnecting', event);
                    },
                    sessionReconnected: (event: SessionReconnectEvent) => {
                        console.log('session reconnected', event);
                    },
                    sessionDisconnected: (event: SessionDisconnectEvent) => {
                        console.log('session disconnected', event);
                    },
                }}
            >
                <div id="my-video" className={styles.myVideo} />
                <div
                    id="skillr-video"
                    className={classNames(styles.skillrVideo, {
                        [styles.skillrVideoPresent]: skillrVideoPresent,
                    })}
                ></div>
                <div className={styles.meters}>
                    {callDuration > 0 && callCost > 0 && <div className={styles.cost}>${callCost?.toFixed(2)}</div>}
                    {callDuration > 0 && (
                        <div className={styles.time}>
                            {moment.utc(callDuration).format(callDuration >= 60000 ? 'HH:mm:ss' : 'mm:ss')}
                        </div>
                    )}
                </div>
                <div className={styles.callButtons}>
                    <button className={styles.endCallButton} onClick={hangUp}>
                        <img src="/icons/session/phone.svg" alt="" />
                    </button>
                    <button onClick={() => setPublishVideo(!publishVideo)}>
                        {/* {publishVideo ? 'Stop Video' : 'Start Video'} */}
                        <img src="/icons/session/video.svg" alt="" />
                    </button>
                    <button onClick={() => setPublishAudio(!publishAudio)}>
                        {/* {publishAudio ? 'Stop Audio' : 'Start Audio'} */}
                        <img src="/icons/session/mic.svg" alt="" />
                    </button>
                    <button
                        disabled={!skillrVideoPresent}
                        className={classNames({ [styles.disabled]: !skillrVideoPresent })}
                        onClick={() => {
                            setFullScreenModeActive(!fullScreenModeActive);
                        }}
                    >
                        <img src="/icons/session/expand.svg" alt="" />
                    </button>
                </div>
                <OTPublisher
                    properties={{
                        publishVideo,
                        publishAudio,
                        insertDefaultUI: false,
                        name: `caller-${skillr.username}`,
                    }}
                    ref={otPublisherRef}
                    eventHandlers={{
                        accessAllowed: (event: Event<'accessAllowed'>) => {
                            console.log('access allowed', event);
                        },
                        accessDenied: (event: Event<'accessDenied'>) => {
                            console.log('access denied', event);
                        },
                        accessDialogClosed: (event: Event<'accessDialogClosed'>) => {
                            console.log('access dialog closed', event);
                        },
                        accessDialogOpened: (event: Event<'accessDialogOpened'>) => {
                            console.log('access dialog opened', event);
                        },
                        audioLevelUpdated: (event: AudioLevelUpdatedEvent) => {
                            // console.log("audio level updated", event);
                        },
                        destroyed: (event: Event<'destroyed'>) => {
                            console.log('destroyed', event);
                        },
                        mediaStopped: (event: MediaStoppedEvent) => {
                            console.log('media stopped', event);
                        },
                        streamCreated: (event: StreamCreatedEvent) => {
                            console.log('stream created', event);
                        },
                        streamDestroyed: (event: StreamDestroyedEvent) => {
                            console.log('stream destroyed', event);
                        },
                        videoDimensionsChanged: (event: VideoDimensionsChangedEvent) => {
                            console.log('video dimensions changed', event);
                        },
                        videoElementCreated: (event: VideoElementCreatedEvent) => {
                            console.log('video element created', event);
                            document.getElementById('my-video')?.appendChild(event.element);
                        },
                    }}
                />
                <OTStreams>
                    <OTSubscriber
                        ref={otSubscriberRef}
                        properties={{
                            insertDefaultUI: false,
                        }}
                        eventHandlers={{
                            audioLevelUpdated: (event: AudioLevelUpdatedEvent) => {
                                // console.log("audio level updated", event);
                            },
                            destroyed: (event: Event<'destroyed'>) => {
                                console.log('SUB: destroyed', event);
                                setSkillrVideoPresent(false);
                            },
                            videoDimensionsChanged: (event: VideoDimensionsChangedEvent) => {
                                console.log('SUB: video dimensions changed', event);
                            },
                            videoDisabled: () => {
                                setSkillrVideoPresent(false);
                            },
                            videoEnabled: () => {
                                setSkillrVideoPresent(true);
                            },
                            videoElementCreated: (event: VideoElementCreatedEvent) => {
                                console.log('SUB: video element created', event);
                                document.getElementById('skillr-video')?.appendChild(event.element);
                                if (!callStartTime) {
                                    setCallStartTime(new Date());
                                }
                                setSkillrVideoPresent(true);
                            },
                        }}
                    />
                </OTStreams>
            </OTSession>
        </div>
    );
};

export default Session;
