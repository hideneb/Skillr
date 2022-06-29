import React, { FormEvent, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { PaymentMethodResult } from '@stripe/stripe-js';

const PaymentMethod: React.FC = () => {
    // https://stripe.com/docs/payments/accept-card-payments?platform=web&ui=elements&html-or-react=react
    const stripe = useStripe();
    const elements = useElements();
    const [result, setResult] = useState<PaymentMethodResult>();

    if (!stripe) {
        return <div>Loading stripe...</div>;
    }

    if (!elements) {
        return <div>Loading elements...</div>;
    }
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            console.log('Stripe.js has not loaded');
            return;
        }

        const result = await stripe.confirmSetup({
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/profile/payment-method/success',
            },
        });

        setResult(result);

        if (result.error) {
            // Show error to your customer (for example, insufficient funds)
            console.log(result.error.message);
        }
    };

    return (
        <>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
            <form onSubmit={handleSubmit}>
                {/* <CardElement options={CARD_ELEMENT_OPTIONS} /> */}
                <PaymentElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        </>
    );
};

export default PaymentMethod;
