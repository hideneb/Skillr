import React, { ChangeEvent, useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import { SkillrDDto } from 'pages/api/skillrs/me';
import { authedFetch } from '@/lib/authed-fetch';
import { getUnexpiredToken } from '@/lib/api-helpers';
import { getSkillrById } from 'pages/api/skillrs/[skillrId]';
import StepsController from '@/components/UI/Onboarding/StepsController/StepsController';
import { SkillrOnboardingSteps } from '@/lib/types/skillr';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import Cropper, { Area } from 'react-easy-crop';
import getCroppedImg from '@/lib/crop-image';
import Router from 'next/router';

type UploadImageProps = {
    skillrDDto: SkillrDDto;
};

const UploadImage: React.FC<UploadImageProps> = ({ skillrDDto }) => {
    const [image, setImage] = useState<string | null>(skillrDDto.profileImage);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>('');

    // Crop state details
    const [cropModalOpen, setCropModalOpen] = useState<boolean>(false); // Controls open state of crop modal
    const [imageToCrop, setImageToCrop] = useState<string>(''); // Original image to be cropped
    const [crop, setCrop] = useState({ x: 0, y: 0 }); // Crop aspect location
    const [rotation, setRotation] = useState(0); // Control crop rotation degree
    const [zoom, setZoom] = useState(1); // Control zoom level
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({ width: 0, height: 0, x: 0, y: 0 }); // CroppedAreaPixels for generating cropped image
    const [croppedImageFile, setCroppedImageFile] = useState<File | null>(null); // File form of cropped image. To be uploaded to the backend

    const onCropComplete = useCallback((_croppedArea, areaPixels) => {
        console.log(areaPixels);
        setCroppedAreaPixels(areaPixels);
    }, []);

    const initiateCrop = (e: ChangeEvent<HTMLInputElement>) => {
        const imageFile = e.target.files?.[0];
        if (!imageFile) {
            return;
        }
        // After choosing the image, generate a url of the image and open the crop modal for the user to crop the image.
        setImageToCrop(URL.createObjectURL(imageFile));
        setCropModalOpen(true);
        e.target.value = ''; // Then, reset file input
    };

    const saveCroppedImage = useCallback(async () => {
        try {
            // After cropping, generate cropped image url and image file, then store in appropriate states
            const result = await getCroppedImg(imageToCrop, croppedAreaPixels, rotation);
            if (result) {
                setImage(result.url);
                setCroppedImageFile(new File([result.blob!], 'profile-image.png', { type: 'image/png' }));
            }
            onCloseModal();
        } catch (e) {
            console.error(e);
        }
    }, [croppedAreaPixels, rotation, imageToCrop]);

    const uploadCroppedImage = async () => {
        // If there is no new image file to upload, skip upload and navigate to next step
        if (!croppedImageFile) {
            Router.push(`/onboarding/skillr/steps/content`);
            return;
        }

        const formData = new FormData();
        formData.append('file', croppedImageFile);
        formData.append('target', 'profileImage');

        setIsLoading(true);
        try {
            const data = await authedFetch('/api/skillrs/media', {
                method: 'POST',
                body: formData,
            }).then((res) => res.json());

            if (data.profileImage) {
                Router.push(`/onboarding/skillr/steps/content`);
            } else {
                setUploadError(data.errors?.[0]?.messages?.[0]);
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const onCloseModal = () => setCropModalOpen(false);

    return (
        <OnboardingLayout>
            <div className="pt-5 pb-9">
                <div className="w-full">
                    <div className="flex px-4 flex-col items-center">
                        <h2 className="font-semibold mb-1 text-xl md:text-3xl text-center">Profile</h2>
                        <p className="text-sm text-center">
                            Complete all required fields below. Don&apos;t worry, you can always change them later.
                        </p>
                    </div>
                    <hr className="my-4 md:my-5" />
                    <div className="px-4 md:px-10">
                        <div className="w-full max-w-[690px] mx-auto flex flex-col space-y-5 md:space-y-5">
                            <h3 className="text-center font-bold text-xl">
                                Add a profile photo that clearly shows your face.
                            </h3>
                            <div className="flex flex-col pt-4 items-center w-full">
                                <div className="flex relative items-center justify-center">
                                    <div className="bg-white rounded-full">
                                        <img
                                            className="rounded-full object-cover w-[160px] h-[160px]"
                                            src={image ?? '/avatar-placeholder.svg'}
                                            alt={skillrDDto.user?.displayName}
                                        ></img>
                                    </div>
                                    <div className="absolute z-10 bottom-0 right-0">
                                        <div className="relative">
                                            <input
                                                className="top-0 absolute w-full cursor-pointer opacity-0 h-full"
                                                type="file"
                                                onChange={initiateCrop}
                                                accept="image/jpeg, image/png"
                                            />
                                            <div className="rounded-full bg-white cursor-pointer shadow-skillr-lg w-14 h-14 justify-center flex">
                                                <img className="w-8" src="/icons/camera.svg" alt="Edit" />
                                            </div>
                                        </div>
                                    </div>
                                    <Modal
                                        styles={{ modal: { padding: 0, borderRadius: 8 } }}
                                        showCloseIcon={false}
                                        open={cropModalOpen}
                                        onClose={onCloseModal}
                                        center
                                    >
                                        <div className="w-80 md:w-96">
                                            <h3 className="font-bold text-xl py-3 px-6">Crop Image</h3>
                                            <div className="h-[300px] bg-gray-600 relative">
                                                <Cropper
                                                    image={imageToCrop}
                                                    crop={crop}
                                                    rotation={rotation}
                                                    zoom={zoom}
                                                    aspect={1}
                                                    onCropChange={setCrop}
                                                    onRotationChange={setRotation}
                                                    onCropComplete={onCropComplete}
                                                    onZoomChange={setZoom}
                                                />
                                            </div>
                                            <div className="flex w-full justify-center py-3 left-0 space-x-12 bg-white">
                                                <button
                                                    onClick={onCloseModal}
                                                    type="button"
                                                    className="w-[109px] font-semibold h-[52px] transition-all bg-transparent disabled:text-gray-300 text-gray-500 rounded-lg"
                                                >
                                                    Back
                                                </button>

                                                <button
                                                    type="submit"
                                                    onClick={saveCroppedImage}
                                                    className="w-[109px] font-semibold h-[52px] transition-all bg-skillr-pink disabled:bg-gray-200 text-white rounded-lg"
                                                >
                                                    Done
                                                </button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                                <div className="space-y-5 md:space-y-9">
                                    {!!uploadError && (
                                        <p className="text-skillr-pink text-center text-xs">{uploadError}</p>
                                    )}
                                </div>
                                <div className="mt-12">
                                    <StepsController
                                        current={SkillrOnboardingSteps.PROFILE_IMAGE}
                                        isNextDisabled={!image || isLoading}
                                        onNextClick={uploadCroppedImage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingLayout>
    );
};

export default UploadImage;

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
