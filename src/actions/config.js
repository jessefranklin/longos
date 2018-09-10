import configjson from '../server/config.json';
import assignees from '../server/assignees.json';
import { headers } from '../const/global';
import axios from 'axios';
// SET_CONFIG
export const setConfig = (settings) => ({
    type: 'SET_CONFIG',
    settings
});

export let getAssignees = (url) => {
    return (dispatch) => {
        return axios.get(url, headers).then(
            (response) => {
                dispatch(setAssignees(response.data));
            },
            (err) => {
                console.log(err);
            }
        )
    }
}


export const setAssignees = (assignees) => ({
    type: 'SET_ASSIGNEES',
    assignees
});

export function fetchConfigs() {
    let assigneeOptions = [{value:'default',label:'Assign', disabled: true}];
    {assignees.map(assign => {
        assigneeOptions.push({value:assign.name,label:assign.name})
      })}
    return dispatch => {
        dispatch(fetchConfigSuccess({ selectedObj: 0, store: configjson[0], assignees: assigneeOptions }));
    };
}

export const fetchConfigSuccess = (config) => ({
    type: 'FETCH_CONFIG',
    payload: { config }
  });