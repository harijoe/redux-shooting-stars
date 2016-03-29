/* @flow */

import Immutable from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const TAGLIST_ADD = 'TAGLIST_ADD';
export const TAGLIST_REMOVE = 'TAGLIST_REMOVE';

// ------------------------------------
// Actions
// ------------------------------------
export function addTag (tagToAdd = '') {
  return {
    type: TAGLIST_ADD,
    payload: tagToAdd
  };
}

export function removeTag (tagToRemove) {
  return {
    type: TAGLIST_REMOVE,
    payload: tagToRemove
  };
}

export const actions = {
  addTag,
  removeTag
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TAGLIST_ADD]: (state, action, appState) => {
    if (action.payload &&
      appState.availableRepos.items.indexOf(action.payload) !== -1 &&   // Selected repo must be in available Repos
      state.size < 6 &&                                                 // No more than 5 tags
      !state.some((e) => action.payload === e.text)                     // Not already present
    ) {
      let maxId = state.reduce((max, e) => e.id > max ? e.id : max, 0);  // Compute next available id

      return state.push({
        id: maxId + 1,
        text: action.payload
      });
    } else {
      return state;
    }
  },
  [TAGLIST_REMOVE]: (state, action) => state.delete(action.payload)
};

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = Immutable.List();

// ------------------------------------
// Reducer
// ------------------------------------
export default function tagListReducer (state = initialState, action, appState) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action, appState) : state;
}
