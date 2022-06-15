import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SkillrPage from "../components/SkillrPage";

export default {
  title: "SkillrPage",
  component: SkillrPage,
  argTypes: {},
} as ComponentMeta<typeof SkillrPage>;

const Template: ComponentStory<typeof SkillrPage> = (args) => (
  <SkillrPage {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  skillr: {
    id: "1",
    username: "username",
    displayName: "Display Name",
    profileImage: "https://via.placeholder.com/150",
    about: `About me: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin metus quam, ultrices a tortor semper, hendrerit sagittis felis. Praesent nulla diam, rutrum in nulla non, suscipit interdum arcu. Proin vitae lacinia mi. Sed porta nisl sed massa feugiat, eu congue orci bibendum. Morbi tempor placerat justo, eu volutpat metus commodo in. Vestibulum ultricies elementum mollis. Suspendisse sollicitudin, enim eget tincidunt cursus, justo tellus interdum urna, eget rutrum arcu libero vel lacus. Cras eu dignissim mi. Nullam vel mauris eget augue iaculis porta. Nullam scelerisque lectus a egestas fringilla.
    Sed placerat commodo arcu. Aliquam molestie venenatis libero, tincidunt imperdiet erat commodo non. Vivamus dictum ligula quis ligula rutrum ultricies. Nulla sed egestas nunc, ut convallis quam. Donec auctor a turpis quis tincidunt. Integer eget nulla condimentum, euismod nisl ut, dictum massa. Donec ac aliquam nulla, vel ornare dolor. Fusce nec suscipit nisl. Ut mattis lectus sed augue consectetur posuere. Donec nisl magna, mattis quis iaculis nec, dignissim eu ante. Quisque euismod pulvinar feugiat. Cras vitae nisi justo. Praesent mollis enim in erat viverra finibus.    
    Sed eu tincidunt turpis, sit amet rutrum tortor. Cras ac mauris nulla. Nunc orci orci, aliquam eu diam vel, tempus condimentum purus. Ut interdum nec arcu vel mollis. Nam gravida, augue quis egestas dignissim, elit nibh malesuada lorem, vitae euismod nibh felis a nisi. In at consequat lectus, vitae semper libero. Aliquam mollis ligula ut leo facilisis viverra.`,
    instagram: "",
    linkedin: "",
    twitter: "",
    tiktok: "",
    images: [],
    isAvailableNow: true,
    skills: [
      {
        skillrSkillId: "1",
        skillId: 1,
        skill: {
          id: 1,
          lightIcon: "https://via.placeholder.com/150",
          lightIconFilename: "https://via.placeholder.com/150",
          darkIcon: "https://via.placeholder.com/150",
          darkIconFilename: "https://via.placeholder.com/150",
          popularIcon: "https://via.placeholder.com/150",
          popularIconFilename: "https://via.placeholder.com/150",
          name: "Skillr skill name",
          description:
            "Skillr skill description: Nam hendrerit nisi metus, et rutrum leo ornare a. Integer eget mollis risus. Donec posuere, ante vel pellentesque mattis, arcu mauris dignissim ipsum, sit amet dapibus mi ipsum consequat erat. Nam euismod nec justo ut facilisis. Cras neque diam, malesuada quis massa id, ultrices vulputate orci. Quisque dapibus, nunc in efficitur consequat, tortor nulla elementum elit, ac pellentesque elit diam at nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed a nibh varius, lobortis erat sit amet, vestibulum sapien. Sed quam justo, varius a urna eleifend, lacinia dapibus ipsum. Ut feugiat sem vitae scelerisque fermentum. Nunc cursus ante in vehicula lacinia. Nulla a tortor ipsum. Aliquam ultricies nisl ac turpis placerat commodo. Pellentesque eu pharetra nulla. Praesent pretium vestibulum diam mollis dignissim.",
          disabled: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          parentId: -1,
        },

        ratePerMinute: 10,
        createdAt: new Date().toISOString(),
        submitDate: new Date().toISOString(),
        preApprovedRate: true,
        state: 3,
        brief: "",
        credentials: [],
        isInstantMatch: false,
        showcases: [],
        showcaseLinks: [],
      },
    ],
    rating: 5,
    localAvailability: {
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
  },
};
