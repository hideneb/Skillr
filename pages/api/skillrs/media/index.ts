import type { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
import { endUnauthorized, getAuthToken } from "../../../../lib/api-helpers";

// For preventing header corruption, specifically Content-Length header
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

const { API_HOST } = process.env;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const auth = getAuthToken(req);
  if (!auth) {
    return endUnauthorized(res);
  }
  await httpProxyMiddleware(req, res, {
    target: API_HOST,
    pathRewrite: [
      {
        patternStr: ".*",
        replaceStr: `/api/app/skillrMedia`,
      },
    ],
    headers: {
      Authorization: `Bearer ${auth.jwt}`,
    },
  });
}
