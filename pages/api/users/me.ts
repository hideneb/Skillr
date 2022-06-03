import type { NextApiRequest, NextApiResponse } from "next";
import { endUnauthorized, getAuthToken } from "../../../lib/api-helpers";
import { UserDto } from "../../../lib/types/user";

const { API_HOST } = process.env;
export const getUserById = async (
  jwt: string,
  userId: string
): Promise<UserDto> => {
  return fetch(`${API_HOST}/api/app/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDto>
) {
  const { method } = req;
  const auth = getAuthToken(req);
  if (!auth) {
    return endUnauthorized(res);
  }
  switch (method) {
    case "GET":
      const user = await getUserById(auth.jwt, auth.id);
      res.status(200).json(user);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
