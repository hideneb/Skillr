import React, { ChangeEvent, useState } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { SkillrDDto } from 'pages/api/skillrs/me';
import Router from 'next/router';
import { authedFetch } from '@/lib/authed-fetch';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import { SkillrMediaDto, SkillrOnboardingSteps } from '@/lib/types/skillr';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import 'react-modal-video/css/modal-video.min.css';

const ModalVideo: any = dynamic(() => import('react-modal-video'), {
    ssr: false,
});

type AddFeaturedContentProps = {
    skillrDDto: SkillrDDto;
};

const AddFeaturedContent: React.FC<AddFeaturedContentProps> = ({ skillrDDto }) => {
    const initialFeaturedVideo = skillrDDto.images.find(({ video, cover }) => !!video && !!cover);
    const [content, setContent] = useState<SkillrMediaDto | undefined>(initialFeaturedVideo);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>('');
    const [videoOpen, setVideoOpen] = useState(false);

    const uploadContentVideo = async (e: ChangeEvent<HTMLInputElement>) => {
        // If there is no new video file to upload, skip upload and navigate to next step
        const videoFile = e.target.files?.[0];
        if (!videoFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('target', 'profileVideo');
        formData.append('cover', 'true');

        setIsLoading(true);
        try {
            const data = await authedFetch('/api/skillrs/media', {
                method: 'POST',
                body: formData,
            }).then((res) => res.json());

            if (data.video) {
                setContent(data);
            } else {
                setUploadError(data.errors?.[0]?.messages?.[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
        e.target.value = ''; // Then, reset file input
    };

    const goToNextStep = () => Router.push('/onboarding/skillr/steps/skills');
    const closeVideo = () => setVideoOpen(false);

    return (
        <OnboardingLayout>
            <div className="pt-5 md:pt-12 pb-12 md:px-4 rounded-xl flex justify-center items-center bg-rich-blue-7">
                <div className="w-full flex flex-col md:flex-row md:space-x-16 items-center max-w-[760px]">
                    <div className="w-full text-white">
                        <div className="flex px-4 flex-col items-center">
                            <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">
                                Featured profile content
                            </h2>
                            <p className="text-sm text-center">
                                Complete all required fields below. Don&apos;t worry, you can always change them later.
                            </p>
                        </div>
                        <hr className="my-4 md:my-5" />
                        <div className="px-4 md:px-10">
                            <div className="w-full max-w-[690px] mx-auto flex flex-col space-y-5 md:space-y-5">
                                <h3 className="text-center font-bold text-xl">
                                    Add a video trailer that best showcases who you are.
                                </h3>
                                <div className="flex text-gray-600 md:text-white flex-col pt-4 items-center w-full">
                                    <div className="md:mt-12">
                                        <StepsController
                                            current={SkillrOnboardingSteps.PROFILE_CONTENT}
                                            isNextDisabled={!content || isLoading}
                                            onNextClick={goToNextStep}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0">
                        <ModalVideo
                            channel="custom"
                            autoplay={true}
                            url={content?.video}
                            isOpen={videoOpen}
                            onClose={() => closeVideo()}
                        />
                        <div className="flex w-60 h-[440px] relative items-center justify-center">
                            <Image
                                objectFit="cover"
                                layout="fill"
                                src={content?.image || '/profile-content-placeholder.png'}
                                alt="content-placeholder"
                            />
                            <div className={classNames('absolute z-10', { 'right-4 top-4': content })}>
                                <div className="relative">
                                    <input
                                        className="top-0 absolute w-full cursor-pointer opacity-0 h-full"
                                        type="file"
                                        onChange={uploadContentVideo}
                                        accept="video/mp4"
                                    />
                                    <button className="rounded-full bg-white cursor-pointer shadow-skillr-lg w-14 h-14 justify-center items-center flex">
                                        <img className="w-8" src="/icons/camera.svg" alt="Edit" />
                                    </button>
                                </div>
                            </div>
                            {content && (
                                <button
                                    onClick={() => setVideoOpen(true)}
                                    className="rounded-full absolute z-10 bg-gray-500 cursor-pointer shadow-skillr-lg w-14 h-14 items-center justify-center flex"
                                >
                                    <img className="w-4" src="/play.svg" alt="Edit" />
                                </button>
                            )}
                        </div>

                        <div className="space-y-5 md:space-y-9">
                            {!!uploadError && <p className="text-skillr-pink text-center text-xs">{uploadError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default AddFeaturedContent;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/onboarding/skillr`,
            },
            props: {},
        };
    }

    const skillr = await getSkillrById(token.id);

    return {
        props: { skillrDDto: skillr },
    };
};
