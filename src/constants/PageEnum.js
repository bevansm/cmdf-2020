export const PageEnum = {
    DEFAULT: "/",
    LOGIN: "/login",
    INTRO: "/introduction",
    CONCEPTS: "/overview",
    BUDGET: "/budget",
    PLAN: "/plan",
    ANIM: "/quiz",
    ENDGAME: "/endgame"
}

export const ExpectedOriginsEnum = {
    [PageEnum.BUDGET]: [PageEnum.ANIM, PageEnum.CONCEPTS],
    [PageEnum.CONCEPTS]: [PageEnum.INTRO, PageEnum.DEFAULT],
    [PageEnum.INTRO]: [PageEnum.LOGIN, PageEnum.DEFAULT],
    [PageEnum.PLAN]: [PageEnum.ANIM, PageEnum.BUDGET],
    [PageEnum.ANIM]: [PageEnum.PLAN],
    [PageEnum.ENDGAME]: [PageEnum.PLAN, PageEnum.ANIM]
}