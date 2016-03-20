import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import tagList from './modules/tagList'

export default combineReducers({
  counter,
  tagList,
  router
})
