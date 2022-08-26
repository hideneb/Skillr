export type SkillDto = {
  id: number;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  lightIcon: string;
  lightIconFilename: string;
  darkIcon: string;
  darkIconFilename: string;
  popularIcon: string;
  popularIconFilename: string;
  parentId: number;
  isAvailableForInstantMatch?: boolean;
};