import styles from './Session.module.css';

import { SkillrDto } from '../../../lib/types/skillr';
import { SkillDto } from '../../../pages/api/skills';

import { OTPublisher, OTPublisherRef, OTSession, OTStreams, OTSubscriber, OTSubscriberRef } from 'opentok-react';
import {
    ArchiveEvent,
    AudioLevelUpdatedEvent,
    ConnectionCreatedEvent,
    ConnectionDestroyedEvent,
    Event,
    MediaStoppedEvent,
    Publisher,
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

enum SessionState {
    IDLE,
    CONNECTING,
    CONNECTED,
    RECONNECTING,
    RECONNECTED,
    DISCONNECTED,
}

enum ConnectionState {
    IDLE,
    CREATED,
    DESTROYED,
}

enum StreamState {
    IDLE,
    CREATED,
    DESTROYED,
}

enum ArchiveState {
    IDLE,
    STARTED,
    STOPPED,
}

const Session: React.FC<SessionProps> = ({ apiKey, sessionId, token, onEnd, skillr, skill }) => {
    const [sessionState, setSessionState] = useState<SessionState>(SessionState.IDLE);
    const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.IDLE);
    const [streamState, setStreamState] = useState<StreamState>(StreamState.IDLE);
    const [archiveState, setArchiveState] = useState<ArchiveState>(ArchiveState.IDLE);

    const [publishVideo, setPublishVideo] = useState(true);
    const [publishAudio, setPublishAudio] = useState(true);

    const [skillrVideoPresent, setSkillrVideoPresent] = useState(false);

    const otPublisherRef = React.useRef<OTPublisherRef>(null);
    const otSubscriberRef = React.useRef<OTSubscriberRef>(null);

    const hangUp = () => {
        if (!otPublisherRef.current) {
            return;
        }
        otPublisherRef.current.getPublisher().session?.disconnect();
    };

    return (
        <div
            className={classNames(styles.session, {
                [styles.skillrVideoPresent]: skillrVideoPresent,
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
                        setSessionState(SessionState.CONNECTED);
                    },
                    connectionCreated: (event: ConnectionCreatedEvent) => {
                        console.log('connection created', event);
                        setConnectionState(ConnectionState.CREATED);
                    },
                    archiveStarted: (event: ArchiveEvent) => {
                        console.log('archive started', event);
                        setArchiveState(ArchiveState.STARTED);
                    },
                    streamCreated: (event: StreamCreatedEvent) => {
                        console.log('stream created', event);
                        setStreamState(StreamState.CREATED);
                    },
                    streamPropertyChanged: (event: StreamPropertyChangedEvent) => {
                        console.log('stream property changed', event);
                    },
                    signal: (event: SignalEvent) => {
                        console.log('signal', event);
                    },
                    streamDestroyed: (event: StreamDestroyedEvent) => {
                        console.log('stream destroyed', event);
                        setStreamState(StreamState.DESTROYED);
                    },
                    archiveStopped: (event: ArchiveEvent) => {
                        console.log('archive stopped', event);
                        setArchiveState(ArchiveState.STOPPED);
                    },
                    connectionDestroyed: (event: ConnectionDestroyedEvent) => {
                        console.log('connection destroyed', event);
                        setConnectionState(ConnectionState.DESTROYED);
                    },
                    sessionReconnecting: (event: SessionReconnectingEvent) => {
                        console.log('session reconnecting', event);
                        setSessionState(SessionState.RECONNECTING);
                    },
                    sessionReconnected: (event: SessionReconnectEvent) => {
                        console.log('session reconnected', event);
                        setSessionState(SessionState.RECONNECTED);
                    },
                    sessionDisconnected: (event: SessionDisconnectEvent) => {
                        console.log('session disconnected', event);
                        setSessionState(SessionState.DISCONNECTED);
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
                    <button onClick={() => {}}>
                        <img src="/icons/session/expand.svg" alt="" />
                    </button>
                </div>
                <OTPublisher
                    properties={{
                        publishVideo,
                        publishAudio,
                        insertDefaultUI: false,
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
                                setSkillrVideoPresent(true);
                            },
                        }}
                    />
                </OTStreams>
            </OTSession>
            {/* <div>Session: {SessionState[sessionState]}</div>
      <div>Connection: {ConnectionState[connectionState]}</div>
      <div>Stream: {StreamState[streamState]}</div>
      <div>Archive: {ArchiveState[archiveState]}</div> */}
            {/* <pre>
        {JSON.stringify(
          {
            session: otPublisherRef.current?.getPublisher().session,
            // sessionCapabilities:
            //   otPublisherRef.current?.getPublisher().session?.capabilities,
            // sessionConnection:
            //   otPublisherRef.current?.getPublisher().session?.connection,
            // stream: otPublisherRef.current?.getPublisher().stream.connection,
          },
          null,
          2
        )}
      </pre> */}
        </div>
    );
};

export default Session;
