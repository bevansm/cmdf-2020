import axios from "axios";
import {notification} from "antd";
import {baseUrl} from "../constants/Constants";
import {dayDataResponse} from "../constants/APIResponses";

// Gets the most recent day data for the user
export function getDayData(caller) {
    const body = {user: caller.context};
    console.log(body);
    axios.get(baseUrl + "/users/days", getConfig(body))
        .then((result) => caller.setState({data: result.data}))
        .catch((err) => caller.setState({data: dayDataResponse}))
        .catch((err) => apiErrorPopup());
}

// Sets the user budget.
export function setBudget(caller, budget) {
    const body = {budget: budget, user: caller.context};
    console.log(budget);
    console.log(body);
    axios.put(baseUrl + "/users/budget", getConfig(body))
        .then((result) => caller.setState({data: result.data}))
        .catch(() => apiErrorPopup());
}

// Sends the day to the backend
export function sendDay(caller, day) {
    const body = {days: [day], user: caller.context};
    console.log(body);
    axios.post(baseUrl + "/users/days", getConfig(body))
        .then((result) => caller.setState({data: result.data}))
        .catch((err) => apiErrorPopup());
}

function getConfig(body) {
    return {
        crossDomain: true,
        params: body,
        headers: {'Content-Type': 'application/json'}
    };
}

function apiErrorPopup() {
    notification["error"]({
        placement: "bottomRight",
        message: 'API Error',
        description:
            'Our cats back in server tried hard, but they were unable to fetch your data.'
    });
}
