/* @flow */

import Immutable from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------
export const TAGLIST_ADD = 'TAGLIST_ADD'
export const TAGLIST_REMOVE = 'TAGLIST_REMOVE'

// ------------------------------------
// Actions
// ------------------------------------
export function addTag (tagToAdd = '') {
  return {
    type: TAGLIST_ADD,
    payload: tagToAdd
  }
}

export function removeTag (tagToRemove = '') {
  return {
    type: TAGLIST_REMOVE,
    payload: tagToRemove
  }
}

export const actions = {
  addTag,
  removeTag
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [TAGLIST_ADD]: (state, action) => {
    if (action.payload) {
      return state.push({
        id: state.size + 1,
        text: action.payload
      })
    } else {
      return state
    }
  },
  [TAGLIST_REMOVE]: (state, action) => state.delete(action.payload)
}

// ------------------------------------
// Initial State
// ------------------------------------
const initialState = Immutable.List([{id: 1, text: 'myTag1'}, {id: 2, text: 'myTag2'}])

// ------------------------------------
// Reducer
// ------------------------------------
export default function tagListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
