import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SocialBar from "../components/UI/SocialBar";

export default {
  title: "SocialBar",
  component: SocialBar,
  argTypes: {},
} as ComponentMeta<typeof SocialBar>;

const Template: ComponentStory<typeof SocialBar> = (args) => (
  <SocialBar {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  username: "username",
  displayName: "Display Name",
  linkedin: "linkedin",
  instagram: "instagram",
};
