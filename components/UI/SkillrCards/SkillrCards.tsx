import React from "react";
import { SkillrDto } from "../../../lib/types/skillr";
import SkillrCard from "../SkillrCard/SkillrCard";

type SkillrCardsProps = {
  skillrs: SkillrDto[];
  isLoggedIn: boolean;
};

const SkillrCards: React.FC<SkillrCardsProps> = ({ skillrs, isLoggedIn }) => {
  return (
    <div className="row">
      {skillrs.map((skillr) => (
        <div className="col-4 col" key={skillr.id}>
          <SkillrCard skillr={skillr} isLoggedIn={isLoggedIn} />
        </div>
      ))}
    </div>
  );
};

export default SkillrCards;
