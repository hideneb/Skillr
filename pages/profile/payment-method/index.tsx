import "papercss";
import React from "react";
import { UserDto } from "../../../lib/types/user";
import { GetServerSideProps } from "next";
import { getUnexpiredToken } from "../../../lib/api-helpers";
import Stripe from "@stripe/stripe-js";
import { getPaymentMethod } from "../../api/userStripe/payment-method";
import Router from "next/router";
import { getUserById } from "../../api/users/me";

type PaymentProps = {
  user: UserDto;
  clientSecret: string;
  paymentMethod: Stripe.PaymentMethod;
};
const PaymentMethod: React.FC<PaymentProps> = ({ paymentMethod }) => {
  return (
    <>
      <h1>How do you want to pay?</h1>
      {paymentMethod && (
        <div>
          <div>
            Use your Stripe account to make changes to the payment settings
          </div>
          <div> Stripe account</div>
          {paymentMethod.card?.brand} **** **** **** {paymentMethod.card?.last4}{" "}
          exp: {paymentMethod.card?.exp_month}/{paymentMethod.card?.exp_year}
        </div>
      )}

      <button
        onClick={() => {
          Router.push(`/profile/payment-method/add`);
        }}
      >
        {paymentMethod ? "Change payment method" : "Add payment method"}
      </button>
      {!paymentMethod && (
        <div>
          You&apos;ll NEVER be charged until you connect with a Skill and
          we&apos;ll ALWAYS let you know before we charge you.
        </div>
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
  const paymentMethod = user.stripePaymentMethod
    ? await getPaymentMethod(token.jwt).catch(null)
    : null;

  return {
    props: {
      paymentMethod,
    },
  };
};

export default PaymentMethod;
