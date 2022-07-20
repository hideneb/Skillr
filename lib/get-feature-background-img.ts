import type { SkillrSkillDto } from './types/skillr';

const profileBanners = new Map([
    //Be-Entertained
    ['Comedians', 'Be-Entertained'],
    ['DJ', 'Be-Entertained'],
    ['Live Music', 'Be-Entertained'],
    ['Live Performance', 'Be-Entertained'],
    ['Singer Songwriter', 'Be-Entertained'],
    ['Tarot & Astrology', 'Be-Entertained'],
    ['Witchcraft Consultant', 'Be-Entertained'],
    // Eat-n-Drink
    ['Baking & Pastries', 'Eat-n-Drink'],
    ['Chefs', 'Eat-n-Drink'],
    ['Grilling', 'Eat-n-Drink'],
    ['Italian', 'Eat-n-Drink'],
    ['Wine & Beer Experts', 'Eat-n-Drink'],
    // Find-Your-Look
    ['Makeup', 'Find-Your-Look'],
    ['Stylists', 'Find-Your-Look'],
    // Fix-Stuff
    ['Cannabis Cultivation', 'Fix-Stuff'],
    ['Gardeners', 'Fix-Stuff'],
    ['Gardening Professional', 'Fix-Stuff'],
    // Get-Advice
    ['Fantasy Sports Advice', 'Get-Advice'],
    ['Cannabis Concierge', 'Get-Advice'],
    ['Crypto Advice', 'Get-Advice'],
    ['Divorce Advice', 'Get-Advice'],
    ['Job Interview', 'Get-Advice'],
    //Get-Coached
    ['Dating Help', 'Get-Coached'],
    ['Pet Behaviorist', 'Get-Coached'],
    ['Sober Coach', 'Get-Coached'],
    //Get Creative
    ['Dance', 'Get-Creative'],
    ['Guitar', 'Get-Creative'],
    ['Music', 'Get-Creative'],
    ['Shuffle & Shapes', 'Get-Creative'],
    ['Singing', 'Get-Creative'],
    // Get-Fit
    ['Breathwork', 'Get-Fit'],
    ['Fitness Trainer', 'Get-Fit'],
    ['Flow', 'Get-Fit'],
    ['Guided Meditation', 'Get-Fit'],
    ['Quit Coach', 'Get-Fit'],
    ['Smoking', 'Get-Fit'],
    ['Wellness', 'Get-Fit'],
    ['Yoga Instructors', 'Get-Fit'],
    // Get-Smart
    ['Biology', 'Get-Smart'],
    ['Chemistry', 'Get-Smart'],
    ['College Prep', 'Get-Smart'],
    ['Math HW Help', 'Get-Smart'],
    ['Physics', 'Get-Smart'],
    ['Science HW Help', 'Get-Smart'],
    //Play-Sports
    ['Golf Instructors', 'Play-Sports'],
]);

export function getFeatureBackgroundImg(skills: SkillrSkillDto[]) {
    const defaultSkill = skills[0];
    return `/category-banners/${profileBanners.get(defaultSkill?.skill?.name) || 'default'}.jpg`;
}
