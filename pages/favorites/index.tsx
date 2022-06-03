import "papercss";
import { GetServerSideProps } from "next";
import React from "react";
import SkillrCard from "../../components/UI/SkillrCard";
import { getUnexpiredToken } from "../../lib/api-helpers";
import { SkillrDto } from "../../lib/types/skillr";
import { getPageOfSkillrs } from "../api/skillrs/[skillrId]";

type FavoritesProps = {
  skillrs: SkillrDto[];
  isLoggedIn: boolean;
};
const Favorites: React.FC<FavoritesProps> = ({ skillrs }) => {
  return (
    <>
      <h1>Favorites</h1>
      {skillrs.length ? (
        skillrs.map((skillr, i) => (
          <SkillrCard key={i} skillr={skillr} isLoggedIn />
        ))
      ) : (
        <div>No Favorites yet!</div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<FavoritesProps> = async (
  ctx
) => {
  const token = await getUnexpiredToken(ctx.req, ctx.res);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?r=${encodeURIComponent(ctx.resolvedUrl)}`,
      },
      props: {},
    };
  }

  const favorites = await getPageOfSkillrs(
    {
      page: 0,
      limit: 10,
      isFavourite: true,
    },
    token.jwt
  );

  return {
    props: {
      skillrs: favorites.skillrs,
      isLoggedIn: !!token,
    },
  };
};

export default Favorites;
