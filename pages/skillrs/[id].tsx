import { GetServerSideProps } from "next";
import React from "react";
import { getSkillrById } from "../../api/v1/skillrs";
import { SkillrDto } from "../../api/v1/types";
import SkillrPage from "./../../components/SkillrPage";

const { API_HOST } = process.env;

type SkillrProps = {
  skillr: SkillrDto;
};

const Skillr: React.FC<SkillrProps> = (props) => {
  return (
    <SkillrPage {...props}/>
  );
};

export default Skillr;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }
  const skillrId = Array.isArray(params.id) ? params.id[0] : params.id;
  const skillr = await getSkillrById(skillrId);
  return {
    props: {
      skillr,
    },
  };
};
