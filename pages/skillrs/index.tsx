import { GetStaticProps } from "next";
import Link from "next/link";

import React from "react";
import { getPageOfSkillrs } from "../../api/v1/skillrs";
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

export const getStaticProps: GetStaticProps = async () => {
  const { skillrs } = await getPageOfSkillrs();
  return {
    props: {
      skillrs,
    },
    revalidate: 420, // revalidate every 7 minutes
  };
};

export default Skillrs;
