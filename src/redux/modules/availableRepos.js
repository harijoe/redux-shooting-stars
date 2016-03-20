import axios from 'axios'

let apiClient = axios.create({
  baseURL: 'http://api.vallini.io/',
  timeout: 1000
})

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REPOS_REQUEST = 'FETCH_REPOS_REQUEST'
export const FETCH_REPOS_FAILURE = 'FETCH_REPOS_FAILURE'
export const FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
export function fetchRepos () {
  return {
    type: FETCH_REPOS_REQUEST
  }
}

export function receiveReposSuccess (repos) {
  return {
    type: FETCH_REPOS_SUCCESS,
    repos: repos
  }
}

export function receiveReposFailure (errorMsg) {
  return {
    type: FETCH_REPOS_FAILURE,
    errorMsg: errorMsg
  }
}

export const refreshRepos = () => {
  return (dispatch) => {
    dispatch(fetchRepos)
    return apiClient.get('watched_repositories')
      .then(({data}) => {
        dispatch(receiveReposSuccess(data['hydra:member'].map((e) => {
          return e['name']
        })))
      })
    .catch((response) => dispatch(receiveReposFailure(response.data['hydra:title'])))
  }
}

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.

export const actions = {
  refreshRepos
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_REPOS_REQUEST]: () => {
    return {
      isFetching: true,
      items: [],
      errorMsg: ''
    }
  },
  [FETCH_REPOS_SUCCESS]: (state, action) => {
    return {
      isFetching: false,
      items: action.repos,
      errorMsg: ''
    }
  },
  [FETCH_REPOS_FAILURE]: (state, action) => {
    return {
      isFetching: false,
      items: [],
      errorMsg: action.errorMsg
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isFetching: false,
  items: [],
  errorMsg: ''
}
export default function counterReducer (state: number = initialState, action: Action): number {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
