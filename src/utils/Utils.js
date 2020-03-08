import {CostsEnum, needCosts, wantCosts} from "../constants/Costs";

export function getTotalCostsNoTax(state) {
    return [...Object.keys(state)].reduce((acc, key) => needCosts.includes(key) || wantCosts.includes(key) ? acc + (state[key] * CostsEnum[key]) : acc, 0);
}

export function roundToTwo(val) {
    return Math.round((val + Number.EPSILON) * 100) / 100;
}
