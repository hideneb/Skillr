import React, { ChangeEvent, FormEvent, useState } from 'react';
import OnboardingLayout from '@/components/UI/OnboardingLayout/OnboardingLayout';
import Image from 'next/image';
import TextField from '@/components/UI/TextField/TextField';
import Router from 'next/router';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const initialRegisterDetails = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    hasAcceptedTerms: false,
};

const Register: React.FC = () => {
    const [registerDetails, setRegisterDetails] = useState(initialRegisterDetails);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setRegisterDetails({
            ...registerDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            firstName,
            lastName,
            email,
            mobileNumber,
            skillr: true,
        };

        setIsLoading(true);
        const skillrDDto = await fetch(`/api/skillrs`, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json());

        if (skillrDDto.id) {
            Router.push('/onboarding/skillr/steps/basic');
        }

        setIsLoading(false);
    };

    const { firstName, lastName, email, mobileNumber, hasAcceptedTerms } = registerDetails;

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
                                <p className="text-xl font-bold">First name</p>
                                <TextField
                                    name="firstName"
                                    value={firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>

                            <div className="space-y-2 w-full">
                                <p className="text-xl font-bold">Last name</p>
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
                                <p className="text-xl font-bold">Email address</p>
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
                                <p className="text-xl font-bold">Phone number</p>
                                <div className="flex w-full space-x-6">
                                    <div className="h-[45px] md:h-[50px]">
                                        <PhoneInput
                                            country="us"
                                            placeholder="+1 212 555 1234"
                                            value={mobileNumber}
                                            inputProps={{ required: true }}
                                            containerStyle={{
                                                height: '100%',
                                            }}
                                            buttonStyle={{
                                                border: 'none',
                                                backgroundColor: 'white',
                                            }}
                                            inputStyle={{
                                                border: 'none',
                                                height: '100%',
                                                fontSize: 16,
                                                borderBottom: '2px solid lightgray',
                                            }}
                                            onChange={(phone) =>
                                                setRegisterDetails((prev) => ({ ...prev, mobileNumber: phone }))
                                            }
                                        />
                                    </div>
                                </div>
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
                                className="w-full md:w-[300px] font-semibold h-[52px] transition-all bg-skillr-pink disabled:bg-gray-200 text-white rounded-lg"
                            >
                                Let&apos;s go!
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </OnboardingLayout>
    );
};

export default Register;
