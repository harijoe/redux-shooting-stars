import axios from 'axios';

let apiClient = axios.create({
  baseURL: 'http://api.vallini.io/',
  timeout: 1000
});

let githubClient = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000,
  headers: {'Authorization': 'token ' + 'ca75bbd82f37fbd57e0de838256e48b84057afe5'}
});

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_REPO_REQUEST = 'ADD_REPO_REQUEST';
export const ADD_REPO_FAILURE = 'ADD_REPO_FAILURE';
export const ADD_REPO_SUCCESS = 'ADD_REPO_SUCCESS';
export const ADD_REPO_RESET = 'ADD_REPO_RESET';

// ------------------------------------
// Actions
// ------------------------------------

export function addRepo (repoName) {
  return (dispatch) => {
    dispatch(addRepoRequest());

    githubClient.get('/repos/' + repoName)
      .then(() => apiClient.post('/watched_repositories', {
        name: repoName
      }))
      .then(() => {
        dispatch(addRepoSuccess());
      })
      .catch(({statusText}) => {
        dispatch(addRepoFailure(statusText));
        setTimeout(() => {
          dispatch(addRepoReset());
        }, 3000);
      });
  };
}

export function addRepoRequest () {
  return {
    type: ADD_REPO_REQUEST
  };
}

export function addRepoFailure (errorMsg) {
  return {
    type: ADD_REPO_FAILURE,
    errorMsg: errorMsg
  };
}

export function addRepoSuccess () {
  return {
    type: ADD_REPO_SUCCESS
  };
}

export function addRepoReset () {
  return {
    type: ADD_REPO_RESET
  };
}

export const actions = {
  addRepo
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [ADD_REPO_REQUEST]: () => {
    return {
      isFetching: true,
      isSuccess: false,
      isFailure: false,
      errorMsg: ''
    };
  },
  [ADD_REPO_SUCCESS]: () => {
    return {
      isFetching: false,
      isSuccess: true,
      isFailure: false,
      errorMsg: ''
    };
  },
  [ADD_REPO_FAILURE]: (state, action) => {
    return {
      isFetching: false,
      isSuccess: false,
      isFailure: true,
      errorMsg: action.errorMsg
    };
  },
  [ADD_REPO_RESET]: () => {
    return initialState;
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  isSuccess: false,
  isFailure: false,
  errorMsg: ''
};
export default function addRepoReducer (state:number = initialState, action:Action):number {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
