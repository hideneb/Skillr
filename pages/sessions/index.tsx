import "papercss";
import React from "react";
import { GetServerSideProps } from "next";
import Router from "next/router";
import { getUnexpiredToken } from "../../lib/api-helpers";
import {
  getPageOfSkillrBooksForUser,
  QueryParamsSkillrBookTypes,
} from "../api/skillrbooks/user";
import { SkillrBookDto } from "../../lib/types/skillrBook";
import { getSkillById } from "../api/skills/[skillId]";
import { SkillDto } from "../api/skills";

type SessionsProps = {
  skillrBooks: SkillrBookDto[];
  skills: SkillDto[];
};
const Sessions: React.FC<SessionsProps> = ({ skillrBooks, skills }) => {
  if (!skillrBooks.length) {
    return (
      <>
        <h1>Past Sessions</h1>
        <div>Nothing, nada, zilch</div>
        <sub>You gotta book a session to see it here</sub>
        <button onClick={() => Router.push("/expore")}>Browse Skillrs</button>
      </>
    );
  }

  return (
    <>
      <h1>Past Sessions</h1>
      {skillrBooks.map((skillrBook, i) => {
        const { skillId } = skillrBook;
        const skill = skills.find((s) => s.id === skillId);
        return (
          <div key={i}>
            <h2>{skill?.name}</h2>
            <p>{skillrBook.skillr.username}</p>
            <p>{skillrBook.startDate}</p>
            <p>{skillrBook.duration}</p>
            <p>${skillrBook.cost}</p>
            <button onClick={() => Router.push(`/sessions/${skillrBook.id}`)}>
              Rate
            </button>
          </div>
        );
      })}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SessionsProps> = async (
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

  const skillrBooks = await getPageOfSkillrBooksForUser(token.jwt, {
    page: 0,
    limit: 10,
    type: QueryParamsSkillrBookTypes.Past,
  });

  const skillIds = Array.from(
    new Set(
      skillrBooks.skillrBooks.map((skillrBook) => {
        return skillrBook.skillId;
      })
    )
  );

  const skills = await Promise.all(
    skillIds.map((skillId) => getSkillById(skillId))
  );

  return {
    props: {
      skillrBooks: skillrBooks.skillrBooks,
      skills,
    },
  };
};

export default Sessions;
