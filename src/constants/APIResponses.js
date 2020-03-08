export const FieldEnum = {
    SAVINGS: "total",
    BUDGET: "budget",
    USER: "email",
    FIXED: "fixed_costs",
    TO_SUPPLIES: "spendingBudget",
    TO_SAVE: "savingsBudget",
    DAY: "dayNumber",
    DAYS: "days",
    SPENDING: "spending",
    PAYCHECK: "salary",
}

export const dayDataResponse = {
    [FieldEnum.SAVINGS]: 100,
    [FieldEnum.BUDGET]: 50,
    [FieldEnum.FIXED]: 50,
    [FieldEnum.TO_SUPPLIES]: 60,
    [FieldEnum.TO_SAVE]: 60,
    [FieldEnum.DAY]: 10,
    [FieldEnum.DAYS]: [],
    [FieldEnum.PAYCHECK]: 120
}

export const day1 = {
    [FieldEnum.DAY]: 0,
    [FieldEnum.SPENDING]: 80,
    [FieldEnum.TO_SUPPLIES]: 90,
    [FieldEnum.TO_SAVE]: 100
}


export const day2 = {
    [FieldEnum.DAY]: 1,
    [FieldEnum.SPENDING]: 70,
    [FieldEnum.TO_SUPPLIES]: 80,
    [FieldEnum.TO_SAVE]: 100
}


export const day3 = {
    [FieldEnum.DAY]: 2,
    [FieldEnum.SPENDING]: 60,
    [FieldEnum.TO_SUPPLIES]: 10,
    [FieldEnum.TO_SAVE]: 50
}


export const day4 = {
    [FieldEnum.DAY]: 3,
    [FieldEnum.SPENDING]: 100,
    [FieldEnum.TO_SUPPLIES]: 30,
    [FieldEnum.TO_SAVE]: 150
}

export const defaultDays = [day1, day2, day3, day4];