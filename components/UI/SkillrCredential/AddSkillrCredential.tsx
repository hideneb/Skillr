import React from "react";
import { NewMedia } from "../Media";

const allowedMimeTypes = [
  "application/pdf",
  "application/rtf",
  "image/jpeg",
  "image/png",
  "video/mp4",
];

type AddSkillrCredentialProps = {
  skillrSkillId: string;
};

const AddSkillrCredential: React.FC<AddSkillrCredentialProps> = ({
  skillrSkillId,
}) => {
  const [name, setName] = React.useState("");
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
      <NewMedia baseForm={baseForm} accept={allowedMimeTypes.join(" ")} />
    </>
  );
};

export default AddSkillrCredential;
