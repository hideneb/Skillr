import { GetServerSideProps } from "next";
import Link from "next/link";

import React from "react";
import { getAllSkillrs } from "../../api/v1/skillrs";
import { SkillrDto } from "../../api/v1/types";

type SkillrsProps = {
  skillrs: SkillrDto[];
};
const Skillrs: React.FC<SkillrsProps> = ({ skillrs }) => {
  return (
    <div>
      {skillrs.map((skillr) => (
        <div key={skillr.id}>
          <Link href={`/skillrs/${skillr.id}`}>{skillr.username}</Link>
        </div>
      ))}
    </div>
  );
};

export default Skillrs;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await getAllSkillrs();
  return {
    props: {
      skillrs: res.skillrs,
    },
  };
};
