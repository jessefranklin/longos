import configjson from '../server/config.json';

// SET_CONFIG
export const setConfig = (config) => ({
    type: 'SET_CONFIG',
    config
});

export function fetchConfigs() {
    return dispatch => {
        dispatch(fetchConfigSuccess(configjson));
    };
}

export const fetchConfigSuccess = (config) => ({
    type: 'FETCH_CONFIG',
    payload: { config }
  });