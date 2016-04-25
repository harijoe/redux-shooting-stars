import { routerReducer as router } from 'react-router-redux';
import counter from './modules/counter';
import tagList from './modules/tagList';
import stats from './modules/stats';
import availableRepos from './modules/availableRepos';
import addRepo from './modules/addRepo';

export default (state = {}, action) => ({
  counter: counter(state.counter, action, state),
  tagList: tagList(state.tagList, action, state),
  availableRepos: availableRepos(state.availableRepos, action, state),
  addRepo: addRepo(state.addRepo, action, state),
  stats: stats(state.stats, action, state),
  router: router(state.router, action, state)
});
