import React, { useState } from "react";
import { authedFetch } from "../../../lib/authed-fetch";

type NewMediaProps = {
  baseForm: Record<string, string | Blob>;
  accept: string;
};

const NewMedia: React.FC<NewMediaProps> = ({ baseForm, accept }) => {
  const [files, setFiles] = useState<FileList | null>(null);

  const addMedia = () => {
    if (!files) {
      return;
    }

    const formData = new FormData();
    Object.keys(baseForm).forEach((key) => {
      formData.append(key, baseForm[key]);
    });
    formData.append("file", files[0]);

    // note: can use axios for progress bar if needed
    return authedFetch("/api/skillrs/media", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
        accept={accept}
      />
      <button onClick={() => addMedia()}>Add</button>
    </>
  );
};

export default NewMedia;
