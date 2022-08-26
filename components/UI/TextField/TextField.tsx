import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    hasError?: boolean;
}

export default function TextField({ hasError, ...rest }: TextFieldProps) {
    return (
        <div className="w-full relative">
            {rest.prefix && (
                <span
                    className={classNames('absolute top-[50%] translate-y-[-50%] left-2', {
                        ['text-gray-400']: !rest.value,
                    })}
                >
                    {rest.prefix}
                </span>
            )}
            <input
                {...rest}
                className={classNames(
                    'w-full h-[45px] md:h-[50px] px-5 outline-0 border-b-2 focus:border-slate-900 bg-gray-100',
                    {
                        ['border-red-400 focus:border-red-400']: hasError,
                    }
                )}
            />
        </div>
    );
}
