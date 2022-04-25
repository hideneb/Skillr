import { PaginatedResponse, SkillrDto } from "./types";

const { API_HOST } = process.env;

export const getPageOfSkillrs = async (
  page = 0,
  limit = 20
): Promise<PaginatedResponse<SkillrDto, "skillrs">> => {
  return fetch(`${API_HOST}/api/app/skillrs?page=${page}&limit=${limit}`).then(
    (res) => res.json()
  );
};

export const getSkillrById = async (skillrId: string): Promise<SkillrDto> => {
  return fetch(`${API_HOST}/api/app/skillrs/${skillrId}`).then((res) =>
    res.json()
  );
};
