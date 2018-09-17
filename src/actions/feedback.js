import { baseUrl, headers } from "../const/global";
import axios from 'axios';

// const feedbackApi  = baseUrl+"/client/feedback";
const feedbackApi  = baseUrl+"/reports/order/feedback";

// POST http://digitalpreorder-staging.azurewebsites.net/api/client/feedback
//Dispatch Feedback
export function dispatchFeedback(feedback) {
    return (dispatch) => {
        return axios.post(feedbackApi,feedback,headers).then(
            (response) => {
                console.log(response.data);
            },
            (err) => {
                console.log(err);
            }
        )
    };
}

const reportApi  = baseUrl+"/reports/app/feedback";

export function dispatchReport(feedback) {
    return (dispatch) => {
        return axios.post(reportApi,feedback,headers).then(
            (response) => {
                console.log(response.data);
            },
            (err) => {
                console.log(err);
            }
        )
    };
}

