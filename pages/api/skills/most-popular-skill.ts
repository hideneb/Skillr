import type { NextApiRequest, NextApiResponse } from "next";
import { SkillDto } from ".";

const { API_HOST } = process.env;
export const getMostPopularSkill = async (): Promise<SkillDto> => {
  return fetch(`${API_HOST}/api/app/skills/most-popular-skill`).then((res) =>
    res.json()
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SkillDto>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const skill = await getMostPopularSkill();
      res.status(200).json(skill);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
