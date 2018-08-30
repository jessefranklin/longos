import { baseUrl } from "../const/global";
let axios = require('axios');

const feedbackApi  = baseUrl+"/feedback";
const headers = {
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
}

//Dispatch Feedback
export function dispatchFeedback(feedback) {
    return (dispatch) => {
        return axios.post(feedbackApi,feedback,headers).then(
            (err) => {
                console.log(err);
            }
        )
    };
}

