import axios from "axios";
import {notification} from "antd";
import {baseUrl, taxes} from "../constants/Constants";
import {dayDataResponse, FieldEnum} from "../constants/APIResponses";
import {useHistory} from "react-router-dom";
import {getTotalCostsNoTax} from "./Utils";
import {PageEnum} from "../constants/PageEnum";

// Gets the most recent day data for the user
export function getDayData(caller) {
    const body = {[FieldEnum.USER]: caller.context};
    console.log(body);
    axios.get(baseUrl + "/users/days", getConfig(body))
        .then((result) => caller.setState({data: result.data}))
        // .catch((err) => caller.setState({data: dayDataResponse}))
        .catch((err) => apiErrorPopup(err));
}

// Sets the user budget.
export function setBudget(caller) {
    const body = caller.state;
    body[FieldEnum.USER] = caller.context;
    console.log(body);

    axios.put(baseUrl + "/users/budget", getConfig(body))
        .then((result) => caller.setState({data: result.data}))
        .catch((err) => apiErrorPopup(err));
}

// Sends the day to the backend
export function sendDay(caller) {
    const body = caller.state;
    body[FieldEnum.SPENDING] = getTotalCostsNoTax(body) * taxes;
    body[FieldEnum.USER] = caller.context;

    console.log(body);
    axios.post(baseUrl + "/users/days", getConfig(body))
        .then((result) => {
            if (result.data[FieldEnum.SAVINGS] === 0) {
                useHistory().push(PageEnum.ENDGAME);
            }
        }).catch((err) => apiErrorPopup(err));
}

// Sends the points to the backend
export function sendPoints(caller) {
    const body = {points: caller.state.points, [FieldEnum.USER]: caller.context};

    console.log(body);
    axios.post(baseUrl + "/users/points", getConfig(body))
        .then((result) => {
            if (result.data[FieldEnum.PAYCHECK] <= 0) {
                useHistory().push(PageEnum.ENDGAME);
            } else if (result.data[FieldEnum.DAY] % 7 === 0) {
                useHistory().push(PageEnum.BUDGET);
            } else {
                useHistory().push(PageEnum.PLAN);
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
