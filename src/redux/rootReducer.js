import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import tagList from './modules/tagList'
import availableRepos from './modules/availableRepos'

export default (state = {}, action) => ({
  counter: counter(state.counter, action, state),
  tagList: tagList(state.tagList, action, state),
  availableRepos: availableRepos(state.availableRepos, action, state),
  router: router(state.router, action, state)
})
