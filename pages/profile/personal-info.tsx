import "papercss";
import React from "react";
import { GetServerSideProps } from "next";
import { getUserById } from "../api/users/me";
import { getUnexpiredToken } from "../../lib/api-helpers";
import { PatchUser } from "../api/users";
import { UserDto } from "../../lib/types/user";
import { authedFetch } from "../../lib/authed-fetch";

type PersonalInfoProps = {
  user: UserDto;
};

const PersonalInfo: React.FC<PersonalInfoProps> = ({ user: initial }) => {
  const [user, setUser] = React.useState<UserDto>(initial);
  const [firstName, setFirstName] = React.useState(user.firstName || "");
  const [lastName, setLastName] = React.useState(user.lastName || "");
  const [email, setEmail] = React.useState(user.email || "");
  const [phoneNumber, setPhoneNumber] = React.useState(user.mobileNumber);

  const updateUser = () => {
    const patchUser: PatchUser = {
      firstName,
      lastName,
      email,
      mobileNumber: phoneNumber,
      notification: true,
      dob: "1997/01/02",
      invitationCode: "007",
    };

    authedFetch(`/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patchUser),
    })
      .then((res) => res.json())
      .then((updatedUser) => {
        setUser(updatedUser);
      });
  };
  return (
    <>
      <h1>Edit personal info</h1>
      <label htmlFor="first-name">First name</label>
      <input
        type="text"
        id="first-name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="last-name">Last name</label>
      <input
        type="text"
        id="last-name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="phone-number">Phone number</label>
      <input
        type="text"
        id="phone-number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={() => updateUser()}>Save</button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getUnexpiredToken(context.req, context.res);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: `/login?r=${encodeURIComponent(context.resolvedUrl)}`,
      },
      props: {},
    };
  }
  const user = await getUserById(token.jwt, token.id);

  return {
    props: {
      user,
    },
  };
};

export default PersonalInfo;
