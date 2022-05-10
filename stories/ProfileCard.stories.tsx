import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileCard from "../components/UI/ProfileCard";

export default {
  title: "ProfileCard",
  component: ProfileCard,
  argTypes: {},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  username: "username",
  about: "about",
  avatar: "https://via.placeholder.com/150",
  displayName: "Display Name",
};
