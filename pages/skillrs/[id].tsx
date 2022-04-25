import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import { getSkillrById } from "../../api/v1/skillrs";
import { SkillrDto } from "../../api/v1/types";
import SkillrPage from "./../../components/SkillrPage";

type SkillrProps = {
  skillr: SkillrDto;
};

const Skillr: React.FC<SkillrProps> = (props) => {
  return <SkillrPage {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id) {
    return { notFound: true };
  }
  const skillrId = Array.isArray(params.id) ? params.id[0] : params.id;

  const skillr = await getSkillrById(skillrId);
  if (!skillr || !skillr.id) {
    return { notFound: true };
  }

  return {
    props: {
      skillr,
    },
    revalidate: 420, // revalidate every 7 minutes
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // don't pre-render any skillrs
    fallback: "blocking",
  };
};

export default Skillr;
