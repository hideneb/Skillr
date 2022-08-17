import React, { ChangeEvent, FormEvent, useState } from 'react';
import OnboardingLayout from '@/components/UI/Onboarding/OnboardingLayout/OnboardingLayout';
import Image from 'next/image';
import TextField from '@/components/UI/TextField/TextField';
import Router from 'next/router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { authedFetch } from '@/lib/authed-fetch';
import OtpInput from 'react-otp-input';
import axios from 'redaxios';
import { CircleSpinner } from 'react-spinners-kit';

enum RegisterState {
    IDLE,
    REQUEST_SMS,
}

// Initialize registration details
const initialRegisterDetails = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    code: '',
    hasAcceptedTerms: false,
};

const inputStyles = {
    border: 'none',
    outline: 0,
    width: '100%',
    height: '100%',
    fontSize: 16,
    borderBottom: '2px solid lightgray',
};

const Register: React.FC = () => {
    const [registerDetails, setRegisterDetails] = useState(initialRegisterDetails);
    const [isLoading, setIsLoading] = useState(false);
    const [stage, setStage] = React.useState(RegisterState.IDLE);
    const [phoneError, setPhoneError] = useState('');

    const { firstName, lastName, email, phoneNumber, hasAcceptedTerms, code } = registerDetails;

    // onChange handler for input fields
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterDetails({
            ...registerDetails,
            [name]: value,
        });
    };

    const requestSms = async () => {
        // We're adding this + sign here because the library saves the values without the + sign,
        // and the api requires the sign to validate a phone number
        setIsLoading(true);
        const { data } = await axios.post(`/api/auth/request-sms`, { phoneNumber: `+${phoneNumber}` });

        if (data.status) {
            setStage(RegisterState.REQUEST_SMS);
        } else {
            setPhoneError(data.errors?.[0]);
            throw new Error(data.errors);
        }
    };

    const resendOTP = async () => {
        setIsLoading(true);
        setPhoneError('');

        try {
            await requestSms();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const verifyCode = async () => {
        const { data } = await axios.post(`/api/auth/verify-sms`, {
            phoneNumber: `+${phoneNumber}`,
            code,
        });

        if (data.id) {
            return data;
        } else {
            setPhoneError(data.errors?.[0]?.messages?.[0]);
            throw new Error(data.errors);
        }
    };

    const saveUserDetails = async () => {
        const payload = {
            firstName,
            lastName,
            email,
            mobileNumber: `+${phoneNumber}`,
            notification: true,
        };

        const data = await authedFetch(`/api/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        }).then((res) => res.json());

        if (data.id) {
            Router.push('/onboarding/skillr/steps/basic');
        } else {
            throw new Error(data.errors);
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setPhoneError('');

        try {
            if (stage === RegisterState.IDLE) {
                await requestSms();
                setIsLoading(false);
            }
            if (stage === RegisterState.REQUEST_SMS) {
                const data = await verifyCode();
                if (data) await saveUserDetails();
            }
        } catch (error) {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingLayout>
            <div className="px-4 md:px-10 py-5 md:py-12 flex md:space-x-10">
                <div className="flex-shrink-0 hidden md:block">
                    <Image alt="session" src="/session.png" width={162} height={350} />
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="space-y-5 md:space-y-9">
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-9">
                            <div className="space-y-2 w-full">
                                <p className="text-xl font-bold font-redhat">First name</p>
                                <TextField
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>

                            <div className="space-y-2 w-full">
                                <p className="text-xl font-bold font-redhat">Last name</p>
                                <TextField
                                    name="lastName"
                                    value={lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-9">
                            <div className="space-y-2 w-full">
                                <p className="text-xl font-bold font-redhat">Email address</p>
                                <TextField
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div className="space-y-2 w-full">
                                {stage === RegisterState.IDLE && (
                                    <div className="space-y-2 w-full">
                                        <p className="text-xl font-bold font-redhat">Phone number</p>
                                        <div className="flex w-full space-x-6">
                                            <div className="h-[45px] w-full md:h-[50px]">
                                                <PhoneInput
                                                    country="us"
                                                    placeholder="+1 212 555 1234"
                                                    value={phoneNumber}
                                                    inputProps={{ required: true }}
                                                    containerClass="h-full"
                                                    buttonStyle={{
                                                        border: 'none',
                                                        backgroundColor: 'white',
                                                    }}
                                                    inputStyle={inputStyles}
                                                    onChange={(phone) =>
                                                        setRegisterDetails((prev) => ({ ...prev, phoneNumber: phone }))
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {stage === RegisterState.REQUEST_SMS && (
                                    <div className="space-y-2 w-full">
                                        <p className="text-xl font-bold font-redhat">Confirm your number</p>
                                        <OtpInput
                                            inputStyle={inputStyles}
                                            className="h-[45px] md:h-[50px] w-16 pr-4"
                                            shouldAutoFocus
                                            isInputNum
                                            value={code}
                                            onChange={(otp: string) =>
                                                setRegisterDetails((prev) => ({ ...prev, code: otp }))
                                            }
                                        />

                                        <div className="flex cursor-pointer text-xs">
                                            <a onClick={() => setStage(RegisterState.IDLE)}>Change number</a>
                                            &nbsp;&nbsp;|&nbsp;&nbsp;<a onClick={resendOTP}>Resend OTP</a>
                                        </div>
                                    </div>
                                )}

                                {!!phoneError && <p className="text-skillr-pink text-xs">{phoneError}</p>}
                            </div>
                        </div>

                        <div className="flex pt-3 flex-col items-center">
                            <div className="flex flex-col space-y-4 items-center">
                                <div className="flex md:space-x-2 items-center">
                                    <input
                                        onChange={(event) =>
                                            setRegisterDetails((prev) => ({
                                                ...prev,
                                                hasAcceptedTerms: event.target.checked,
                                            }))
                                        }
                                        name="hasAcceptedTerms"
                                        checked={hasAcceptedTerms}
                                        className="w-4 h-4"
                                        type="checkbox"
                                        id="terms"
                                    />
                                    <label className="text-xs text-center max-w-[250px] md:max-w-full" htmlFor="terms">
                                        I have read and agree to the SKILLR{' '}
                                        <a
                                            target="__blank"
                                            className="font-semibold underline"
                                            href="https://skillrhelp.zendesk.com/hc/en-us/articles/4410806213012-User-Terms-of-Service-"
                                        >
                                            Terms of Service
                                        </a>
                                        &nbsp;&&nbsp;
                                        <a
                                            target="__blank"
                                            className="font-semibold underline"
                                            href="https://skillrhelp.zendesk.com/hc/en-us/articles/4410806316820-Privacy-Policy"
                                        >
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>
                                <p className="text-xs text-center">
                                    By continuing you may receive an SMS for verification. Message and data rates may
                                    apply.
                                </p>
                            </div>
                        </div>

                        <div className="flex fixed bottom-0 w-full z-10 left-0 p-4 md:p-0 bg-white md:static shadow-skillr-lg md:shadow-none pt-4 justify-center">
                            <button
                                type="submit"
                                disabled={!hasAcceptedTerms || isLoading}
                                className="w-full md:w-[300px] space-x-3 flex justify-center items-center font-semibold h-[52px] transition-all bg-skillr-pink disabled:bg-gray-200 text-white rounded-lg"
                            >
                                <CircleSpinner size={20} color="lightgray" loading={!!isLoading} />
                                <span>
                                    {stage === RegisterState.IDLE && "Let's go!"}
                                    {stage === RegisterState.REQUEST_SMS && 'Verify Phone number'}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </OnboardingLayout>
    );
};

export default Register;
