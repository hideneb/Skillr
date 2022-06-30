import 'papercss';
import React from 'react';
import getStripe from '../../../lib/get-stripe';
import { Elements } from '@stripe/react-stripe-js';
import PaymentMethod from '../../../components/Profile/PaymentMethod';
import { UserDto } from '../../../lib/types/user';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '../../../lib/api-helpers';
import { getUserById } from '../../api/users/me';
import { createPaymentMethod } from '../../api/userStripe/create-payment-method';

type PaymentProps = {
    user: UserDto;
    clientSecret: string;
    stripePublishableKey: string;
};
const AddPaymentMethod: React.FC<PaymentProps> = ({ user, stripePublishableKey, clientSecret }) => {
    // https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe
    const stripePromise = getStripe(stripePublishableKey);

    return (
        <>
            <h1>Add Payment Method</h1>
            <h2>Stripe CustomerId: {user?.stripeCustomerId || 'none'}</h2>
            <h2>Stripe Client Secret: {clientSecret || 'none'}</h2>
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentMethod />
                </Elements>
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const token = await getUnexpiredToken(ctx.req, ctx.res);
    if (!token) {
        return {
            redirect: {
                permanent: false,
                destination: `/login?r=${encodeURIComponent(ctx.resolvedUrl)}`,
            },
            props: {},
        };
    }
    const user = await getUserById(token.jwt, token.id);
    const createPaymentMethodDto = await createPaymentMethod(token.jwt);

    return {
        props: {
            user,
            stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
            clientSecret: createPaymentMethodDto.clientSecret,
        },
    };
};

export default AddPaymentMethod;
