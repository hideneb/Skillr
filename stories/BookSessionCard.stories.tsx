import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import ProfileCard from "../components/UI/ProfileCard";

export default {
	title: "ProfileCard",
	component: ProfileCard,
	argTypes: {},
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	name: "name",
	description: "description",
	imgSrc: "https://via.placeholder.com/150",
	ratePerMinute: 100,
	availability: {
		day0Begin: "09:00:00",
		day0End: "18:00:00",
		day1Begin: "09:00:00",
		day1End: "18:00:00",
		day2Begin: "09:00:00",
		day2End: "18:00:00",
		day3Begin: "09:00:00",
		day3End: "18:00:00",
		day4Begin: "09:00:00",
		day4End: "18:00:00",
		day5Begin: "09:00:00",
		day5End: "18:00:00",
		day6Begin: "09:00:00",
		day6End: "18:00:00",
		timezoneOffset: 0,
		skillrId: "1",
		id: "1",
		type: 0,
	},
};
