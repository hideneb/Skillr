import classNames from 'classnames';
import React from 'react';

interface TextFieldProps extends React.HTMLProps<HTMLInputElement> {
    hasError?: boolean;
}

export default function TextField({ hasError, ...rest }: TextFieldProps) {
    return (
        <div className="w-full">
            <input
                {...rest}
                className={classNames(
                    'w-full h-[45px] md:h-[50px] px-4 outline-0 border-b-2 focus:border-slate-900 bg-gray-100',
                    {
                        ['border-red-400 focus:border-red-400']: hasError,
                    }
                )}
            />
        </div>
    );
}
