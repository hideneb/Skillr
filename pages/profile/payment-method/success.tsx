import 'papercss';
import React from 'react';
import { GetServerSideProps } from 'next';
import { getUnexpiredToken } from '../../../lib/api-helpers';
import Stripe from '@stripe/stripe-js';
import { getPaymentMethod } from '../../api/userStripe/payment-method';

type PaymentProps = {
    paymentMethod: Stripe.PaymentMethod;
};
const PaymentMethodSuccess: React.FC<PaymentProps> = ({ paymentMethod }) => {
    return (
        <>
            <h1>Payment Method Added Successfully</h1>
            {paymentMethod && (
                <div>
                    Saved Card: {paymentMethod.card?.brand} **** **** **** {paymentMethod.card?.last4} exp:{' '}
                    {paymentMethod.card?.exp_month}/{paymentMethod.card?.exp_year}
                </div>
            )}
            <pre>{JSON.stringify(paymentMethod, null, 2)}</pre>
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
    const paymentMethod = await getPaymentMethod(token.jwt).catch();

    return {
        props: {
            paymentMethod,
        },
    };
};

export default PaymentMethodSuccess;
