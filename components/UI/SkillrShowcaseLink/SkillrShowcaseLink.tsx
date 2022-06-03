import React from "react";
import { authedFetch } from "../../../lib/authed-fetch";
import { ShowcaseLinkDto } from "../../../lib/types/skillr";

type SkillrShowcaseLinkProps = {
  skillrSkillId: string;
  showcaseLink: ShowcaseLinkDto;
};

const SkillrShowcaseLink: React.FC<SkillrShowcaseLinkProps> = ({
  skillrSkillId,
  showcaseLink: showcaseLink,
}) => {
  const [url, setUrl] = React.useState(showcaseLink.url);
  const [name, setName] = React.useState(showcaseLink.name);

  const baseForm: Record<string, string> = {};
  baseForm.target = "showcaselink";
  baseForm.skillrSkillId = skillrSkillId;

  const updateShowcaseLink = () => {
    if (!url || !name) {
      return;
    }
    const formData = new FormData();
    Object.keys(baseForm).forEach((key) => {
      formData.append(key, baseForm[key]);
    });
    formData.append("url", url);
    formData.append("name", name);

    return authedFetch(`/api/skillrs/media/${showcaseLink.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(baseForm),
    }).then((res) => res.json());
  };

  const deleteShowcaseLink = () => {
    return authedFetch(`/api/skillrs/media/${showcaseLink.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(baseForm),
    }).then((res) => res.json());
  };

  return (
    <>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>URL</label>
      <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      <button onClick={updateShowcaseLink}>Save</button>
      <button onClick={deleteShowcaseLink}>Delete</button>
    </>
  );
};

export default SkillrShowcaseLink;
