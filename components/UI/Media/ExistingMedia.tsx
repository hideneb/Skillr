import React from "react";
import { authedFetch } from "../../../lib/authed-fetch";

type ExistingMediaProps = {
  id: string;
  media: { url: string };
  baseForm: Record<string, string>;
  allowUpdate: boolean;
};

const ExistingMedia: React.FC<ExistingMediaProps> = ({
  id,
  baseForm,
  media,
  allowUpdate,
}) => {
  const updateMedia = () => {
    return authedFetch(`/api/skillrs/media/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(baseForm),
    }).then((res) => res.json());
  };

  const deleteMedia = () => {
    return authedFetch(`/api/skillrs/media/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(baseForm),
    });
  };

  return (
    <>
      {media.url.endsWith(".mp4") ? (
        <video controls>
          <source src={media.url} type="video/mp4" />
        </video>
      ) : (
        <img src={media.url} style={{ maxWidth: "100px" }} alt={"image"} />
      )}
      {allowUpdate && <button onClick={updateMedia}>Update</button>}
      <button onClick={deleteMedia}>Delete</button>
    </>
  );
};

export default ExistingMedia;
