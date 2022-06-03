import type { NextApiRequest, NextApiResponse } from "next";
import { endUnauthorized, getAuthToken } from "../../../lib/api-helpers";
import Stripe from "@stripe/stripe-js";

const { API_HOST } = process.env;
export const getPaymentMethod = async (
  jwt: string
): Promise<Stripe.PaymentMethod> => {
  return fetch(`${API_HOST}/api/app/userStripe/paymentMethod`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stripe.PaymentMethod>
) {
  const { method } = req;
  const auth = getAuthToken(req);
  if (!auth) {
    return endUnauthorized(res);
  }
  switch (method) {
    case "GET":
      const user = await getPaymentMethod(auth.jwt);
      res.status(200).json(user);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
