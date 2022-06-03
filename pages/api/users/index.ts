import type { NextApiRequest, NextApiResponse } from "next";
import { endUnauthorized, getAuthToken } from "../../../lib/api-helpers";
import { UserDto } from "../../../lib/types/user";

export type PatchUser = {
  firstName: string;
  lastName: string;
  notification: boolean;
  mobileNumber: string;
  email: string;
  invitationCode: string;
  dob: string;
};

const { API_HOST } = process.env;
export const patchUser = async (
  jwt: string,
  patchUser: PatchUser
): Promise<UserDto> => {
  return fetch(`${API_HOST}/api/app/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(patchUser),
  }).then((res) => res.json());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserDto>
) {
  const { method, body } = req;
  const auth = getAuthToken(req);
  if (!auth) {
    return endUnauthorized(res);
  }
  switch (method) {
    case "PUT":
      const user = await patchUser(auth.jwt, body);
      res.status(200).json(user);
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
