import configjson from '../server/config.json';

// SET_CONFIG
export const setConfig = (settings) => ({
    type: 'SET_CONFIG',
    settings
});

export function fetchConfigs() {
    return dispatch => {
        dispatch(fetchConfigSuccess({ selectedObj: 0,store: configjson[0] }));
    };
}

export const fetchConfigSuccess = (config) => ({
    type: 'FETCH_CONFIG',
    payload: { config }
  });