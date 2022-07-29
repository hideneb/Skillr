import { SkillrOnboardingSteps } from '@/lib/types/skillr';
import Router from 'next/router';
import React from 'react';

interface StepsControllerProps {
    isNextDisabled?: boolean;
    onNextClick?: () => void;
    current: SkillrOnboardingSteps;
}

export default function StepsController({ current, onNextClick, isNextDisabled }: StepsControllerProps) {
    const noOfSteps = Object.keys(SkillrOnboardingSteps).length;
    const currentStepNo = Object.values(SkillrOnboardingSteps).indexOf(current) + 1;
    const previousStep = Object.values(SkillrOnboardingSteps)[currentStepNo - 2];

    return (
        <div className="flex space-x-6 items-center fixed bottom-0 w-full z-10 left-0 p-4 md:p-0 bg-white md:bg-transparent md:static shadow-skillr-lg md:shadow-none pt-4 justify-center">
            <button
                disabled={current === SkillrOnboardingSteps.BASIC_INFO}
                onClick={() => Router.push(`/onboarding/skillr/steps/${previousStep}`)}
                type="button"
                className="w-[109px] font-semibold h-[52px] transition-all bg-transparent disabled:text-gray-300 text-gray-400 rounded-lg"
            >
                Back
            </button>

            <p className="text-sm">
                {currentStepNo} of {noOfSteps} steps
            </p>

            <button
                type="submit"
                onClick={onNextClick}
                disabled={isNextDisabled}
                className="w-[109px] font-semibold h-[52px] transition-all bg-skillr-pink disabled:bg-gray-200 text-white rounded-lg"
            >
                Next
            </button>
        </div>
    );
}
