import axios from "axios";
import {notification} from "antd";
import {baseUrl, taxes} from "../constants/Constants";
import {dayDataResponse, defaultDays, FieldEnum} from "../constants/APIResponses";
import {getTotalCostsNoTax} from "./Utils";
import {PageEnum} from "../constants/PageEnum";

// Gets the most recent day data for the user
export function getStatus(caller) {
    const body = {[FieldEnum.USER]: sessionStorage.getItem("user")};
    console.log(body);
    axios.get(baseUrl + "/users/status", getConfig(body))
        .catch((err) => caller.setState({data: dayDataResponse})) //uncomment to load static data
        .then((result) => caller.setState({data: result.data}))
        .catch((err) => apiErrorPopup(err));
}

// Gets the most recent day data for the user
export function getDays(caller) {
    const body = {[FieldEnum.USER]: sessionStorage.getItem("user")};
    console.log(body);
    axios.get(baseUrl + "/users/days", getConfig(body))
        .catch(() => ({data: defaultDays}))
        .then((result) => caller.setState({data: result.data}))
        .catch((err) => apiErrorPopup(err));
}

// Sets the user budget.
export function setBudget(caller) {
    const body = caller.state;
    body[FieldEnum.USER] = sessionStorage.getItem("user");
    console.log(body);

    axios.put(baseUrl + "/users/budget", getConfig(body))
        .catch(() => ({data: defaultDays}))
        .then((result) => caller.setState({data: result.data}))
        .catch((err) => apiErrorPopup(err));
}

// Sends the day to the backend
export function sendDay(caller) {
    const body = caller.state;
    body[FieldEnum.SPENDING] = getTotalCostsNoTax(body) * taxes;
    body[FieldEnum.USER] = sessionStorage.getItem("user");

    console.log(body);
    axios.post(baseUrl + "/users/days", getConfig(body))
        .catch((err) => ({data: dayDataResponse}))
        .then((result) => {
            if (result.data[FieldEnum.SAVINGS] === 0) {
                window.location.pathname = PageEnum.ENDGAME;
            }
        }).catch((err) => apiErrorPopup(err));
}

// Sends the points to the backend
export function sendPoints(caller) {
    const body = {points: caller.state.points, [FieldEnum.USER]: sessionStorage.getItem("user")};

    console.log(body);
    axios.post(baseUrl + "/users/points", getConfig(body))
        .catch((err) => ({data: dayDataResponse}))
        .then((result) => {
            if (result.data[FieldEnum.PAYCHECK] < 0) {
                window.location.pathname = PageEnum.ENDGAME;
            } else if (result.data[FieldEnum.DAY] % 7 === 0) {
                window.location.pathname = PageEnum.BUDGET;
            } else {
                window.location.pathname = PageEnum.PLAN;
            }
        }).catch((err) => apiErrorPopup(err));
}

function getConfig(body) {
    return {
        crossDomain: true,
        params: body,
        headers: {'Content-Type': 'application/json'}
    };
}

function apiErrorPopup(err) {
    notification["error"]({
        placement: "bottomRight",
        message: 'API Error',
        description:
            'Our cats back in server tried hard, but they were unable to fetch your data: ' + err.message
    });
}
