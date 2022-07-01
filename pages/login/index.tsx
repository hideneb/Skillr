import 'papercss';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { GetServerSideProps } from 'next';
import { isProd } from '../../lib/environment';

enum LoginState {
    IDLE,
    VERIFYING,
}
type LoginProps = {};
const Login: React.FC<LoginProps> = () => {
    const router = useRouter();

    const [loginState, setLoginState] = React.useState(LoginState.IDLE);
    const [phoneNumber, setPhoneNumber] = React.useState<string>('');
    const [code, setCode] = React.useState<string>('');

    const requestSms = () => {
        return fetch(`/api/auth/request-sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        })
            .then((res) => res.json())
            .then(() => {
                setLoginState(LoginState.VERIFYING);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const verifyCode = () => {
        fetch(`/api/auth/verify-sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, code }),
        })
            .then((res) => res.json())
            .then(() => {
                const redirect = Array.isArray(router.query.r) ? router.query.r[0] : router.query.r;
                Router.push(redirect || '/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+11234567890"
            />
            {loginState === LoginState.IDLE && <button onClick={() => requestSms()}>Send Code</button>}
            {loginState === LoginState.VERIFYING && (
                <>
                    <label htmlFor="code">code</label>
                    <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
                    <button onClick={() => verifyCode()}>Verify</button>
                </>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    if (isProd()) {
        return {
            notFound: true,
        };
    }

    return { props: {} };
};

export default Login;
