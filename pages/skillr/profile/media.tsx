import 'papercss';
import { GetServerSideProps } from 'next';
import React, { FormEvent, useState } from 'react';

import { getUnexpiredToken } from '../../../lib/api-helpers';
import { getMySkillr, SkillrDDto } from '../../api/skillrs/me';
import { authedFetch } from '../../../lib/authed-fetch';
import { isProd } from '../../../lib/environment';

type SkillrMediaProps = {
    skillrDDto: SkillrDDto;
};

enum Targets {
    Avatar = 'avatar',
    ProfileImage = 'profileImage',
    ProfileVideo = 'profileVideo',
}

enum SkillrMediaTypes {
    Document = 0,
    Image = 1,
    Video = 2,
}

const allowedDocMimeTypes = ['application/pdf', 'application/rtf'];
const allowedImageMimeTypes = ['image/jpeg', 'image/png'];
const allowedVideoMimeTypes = ['video/mp4'];

const SkillrMedia: React.FC<SkillrMediaProps> = ({ skillrDDto }) => {
    const [avatar, setAvatar] = useState<string>(skillrDDto.avatar);
    const [profileImage, setProfileImage] = useState<string>(skillrDDto.profileImage);
    const [files, setFiles] = useState<FileList | null>(null);
    const [target, setTarget] = useState<Targets | undefined>(Targets.ProfileImage);
    const [cover, setCover] = useState<boolean>(false);

    let allowedMimeTypesForTarget: string[];
    switch (target) {
        case Targets.Avatar:
        case Targets.ProfileImage:
            allowedMimeTypesForTarget = allowedImageMimeTypes;
            break;
        case Targets.ProfileVideo:
            allowedMimeTypesForTarget = allowedVideoMimeTypes;
            break;
        default:
            allowedMimeTypesForTarget = [];
    }

    const handleMediaSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!files || !target) {
            return;
        }

        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('target', target);
        if (cover !== undefined) {
            formData.append('cover', cover ? 'true' : 'false');
        }

        // note: can use axios for progress bar if needed
        await authedFetch('/api/skillrs/media', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then((res) => {
                switch (target) {
                    case Targets.Avatar:
                        setAvatar(res.avatar);
                        break;
                    case Targets.ProfileImage:
                        setProfileImage(res.profileImage);
                        break;
                    case Targets.ProfileVideo:
                        // setProfileVideo(res.profileVideo);
                        break;
                    default:
                        break;
                }
            });
    };

    return (
        <>
            <h1>Skillr Media</h1>
            <div>
                <h2>Skillr Images</h2>
                {skillrDDto.images.map((image) => (
                    <>
                        <span>type: {SkillrMediaTypes[image.type]}</span>
                        <img key={image.id} src={image.image} style={{ maxWidth: '100px' }} alt={'Skillr image'} />
                        {image.cover ? (
                            <div>
                                <span>Cover</span>
                            </div>
                        ) : null}
                        {image.video && (
                            <video controls>
                                <source src={image.video} type="video/mp4" />
                            </video>
                        )}
                    </>
                ))}
                <h2>Targets</h2>
                <select value={target} onChange={(e) => setTarget(e.target.value as Targets)}>
                    <option>Select</option>
                    <option value={Targets.Avatar}>Avatar</option>
                    <option value={Targets.ProfileImage}>Profile Image</option>
                    <option value={Targets.ProfileVideo}>Profile Video</option>
                </select>
                <form onSubmit={handleMediaSubmit}>
                    {target === Targets.Avatar && avatar && (
                        <img src={avatar} alt="avatar" style={{ maxWidth: '100px' }} />
                    )}
                    {target === Targets.ProfileImage && profileImage && (
                        <img src={profileImage} alt="profile image" style={{ maxWidth: '100px' }} />
                    )}
                    <input
                        type="file"
                        onChange={(e) => setFiles(e.target.files)}
                        accept={allowedMimeTypesForTarget.join(' ')}
                    />
                    {target === Targets.ProfileImage && (
                        <>
                            <label htmlFor="cover">Cover?</label>
                            <input
                                type="checkbox"
                                id="cover"
                                checked={cover}
                                onChange={(e) => setCover(e.target.checked)}
                            />
                        </>
                    )}
                    <button type="submit">Upload</button>
                </form>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<SkillrMediaProps> = async (context) => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

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

    const skillr = await getMySkillr(token.jwt);

    return {
        props: {
            skillrDDto: skillr,
        },
    };
};

export default SkillrMedia;
