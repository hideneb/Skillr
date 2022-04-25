import type { NextApiRequest, NextApiResponse } from "next";
import { getSkillrById } from "../../../api/v1/skillrs";
import { SkillrDto } from "../../../api/v1/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SkillrDto>
) {
  const { query, method } = req;
  const skillrId = Array.isArray(query.id) ? query.id[0] : query.id;
  switch (method) {
    case "GET":
      const skillr = await getSkillrById(skillrId);
      res.status(200).json(skillr);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
