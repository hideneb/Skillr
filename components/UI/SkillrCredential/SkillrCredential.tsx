import React from "react";
import { CredentialDto } from "../../../lib/types/skillr";
import { ExistingMedia } from "../Media";

type SkillrCredentialProps = {
  skillrSkillId: string;
  credential: CredentialDto;
};

const SkillrCredential: React.FC<SkillrCredentialProps> = ({
  skillrSkillId,
  credential,
}) => {
  const [name, setName] = React.useState(credential.name);
  const baseForm: Record<string, string> = {};
  baseForm.target = "credential";
  baseForm.skillrSkillId = skillrSkillId;
  baseForm.name = name;

  return (
    <>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <ExistingMedia
        id={credential.id}
        baseForm={baseForm}
        media={{ url: credential.url }}
        allowUpdate={true}
      />
    </>
  );
};

export default SkillrCredential;
