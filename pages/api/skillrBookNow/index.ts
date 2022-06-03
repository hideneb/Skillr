import { NextApiRequest, NextApiResponse } from "next";
import { endUnauthorized, getAuthToken } from "../../../lib/api-helpers";
import { SkillrBookDto } from "../../../lib/types/skillrBook";

export type PostSkillrBook = {
  duration: number;
  skillrId: string;
  skillId: number;
  skillrSkillId: string;
  existingBookingId: string;
};

const { API_HOST } = process.env;

export const createSkillrBookNow = async (
  jwt: string,
  postSkillrBook: PostSkillrBook
): Promise<SkillrBookDto> => {
  return fetch(`${API_HOST}/api/app/skillrbooksNow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify(postSkillrBook),
  }).then((res) => res.json());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SkillrBookDto>
) {
  const { body, method } = req;
  const auth = getAuthToken(req);
  if (!auth) {
    return endUnauthorized(res);
  }
  switch (method) {
    case "POST":
      const skillrBook = await createSkillrBookNow(auth.jwt, body);
      res.status(200).json(skillrBook);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
