import type { NextApiRequest, NextApiResponse } from "next";
import { endUnauthorized, getAuthToken } from "../../../lib/api-helpers";
import { StripeLink } from "../../../lib/types/stripe";

const { API_HOST } = process.env;
export const createPaymentInfo = async (jwt: string): Promise<StripeLink> => {
  return fetch(`${API_HOST}/api/app/skillrStripe/paymentInfo`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StripeLink>
) {
  const { method } = req;
  const auth = getAuthToken(req);
  if (!auth) {
    return endUnauthorized(res);
  }
  switch (method) {
    case "POST":
      const stripeLink = await createPaymentInfo(auth.jwt);
      res.status(200).json(stripeLink);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
