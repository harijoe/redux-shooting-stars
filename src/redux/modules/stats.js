import {apiClient} from '../utils/client';

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_TOTAL_DATAPOINTS_SUCCESS = 'FETCH_TOTAL_DATAPOINTS_SUCCESS';
export const FETCH_TOTAL_REPOSITORIES_SUCCESS = 'FETCH_TOTAL_REPOSITORIES_SUCCESS';

// ------------------------------------
// Actions
// ------------------------------------

export function fetchStats () {
  return (dispatch) => {
    apiClient.get('github_stars_measures')
      .then((data) => {
        dispatch(setTotalDatapoints(data.data['hydra:totalItems']));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(fetchStats); // It's straightforward, but it works
        }, 5000);
      });

    apiClient.get('watched_repositories')
      .then((data) => {
        dispatch(setTotalRepositories(data.data['hydra:totalItems']));
      })
      .catch(() => {
        setTimeout(() => {
          dispatch(fetchStats); // It's straightforward, but it works
        }, 5000);
      });
  };
}

export function setTotalDatapoints (data) {
  return {
    type: FETCH_TOTAL_DATAPOINTS_SUCCESS,
    payload: data
  };
}

export function setTotalRepositories (data) {
  return {
    type: FETCH_TOTAL_REPOSITORIES_SUCCESS,
    payload: data
  };
}

export const actions = {
  fetchStats
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_TOTAL_DATAPOINTS_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {datapointsCount: action.payload});
  },
  [FETCH_TOTAL_REPOSITORIES_SUCCESS]: (state, action) => {
    return Object.assign({}, state, {repositoriesCount: action.payload});
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  datapointsCount: null,
  repositoriesCount: null
};
export default function fetchStatsReducer (state:number = initialState, action:Action):number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
