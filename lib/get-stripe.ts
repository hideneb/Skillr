import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
const getStripe = (stripePublishableKey: string) => {
    if (!stripePromise) {
        stripePromise = loadStripe(stripePublishableKey);
    }
    return stripePromise;
};

export default getStripe;
