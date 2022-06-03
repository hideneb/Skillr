import React from "react";
import { ShowcaseDto } from "../../../lib/types/skillr";
import { ExistingMedia } from "../Media";

type SkillrShowcaseProps = {
  skillrSkillId: string;
  showcase: ShowcaseDto;
};

const SkillrShowcase: React.FC<SkillrShowcaseProps> = ({
  skillrSkillId,
  showcase,
}) => {
  const baseForm: Record<string, string> = {};
  baseForm.target = "showcase";
  baseForm.skillrSkillId = skillrSkillId;

  return (
    <>
      <ExistingMedia
        id={showcase.id}
        baseForm={baseForm}
        media={{ url: showcase.video || showcase.image }}
        allowUpdate={true}
      />
    </>
  );
};

export default SkillrShowcase;
