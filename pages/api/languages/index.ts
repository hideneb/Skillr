import type { NextApiRequest, NextApiResponse } from "next";

export type LanguageDto = {
  id: number;
  name: string;
};

const { API_HOST } = process.env;
export const findLanguages = async (): Promise<LanguageDto[]> => {
  return fetch(`${API_HOST}/api/app/languages`).then((res) => res.json());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LanguageDto[]>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      const languages = await findLanguages();
      res.status(200).json(languages);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
