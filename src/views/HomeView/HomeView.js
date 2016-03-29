/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { increment, doubleAsync } from '../../redux/modules/counter';
import { refreshRepos } from '../../redux/modules/availableRepos';
import TagSelector from '../../components/TagSelector/TagSelector';
import RepoManager from '../../containers/RepoManager/RepoManager';
import Graph from '../../components/Graph/Graph';
import classes from './HomeView.scss';

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    refreshRepos: PropTypes.func.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.props.refreshRepos();
  }

  render () {
    return (
      <div className='main-container'>
        <nav className='navbar navbar-default text-center' role='navigation'>
          <h2>Github Trends</h2>
        </nav>
        <div className='container'>
          <div className='col-sm-4'>
            <RepoManager />
          </div>
          <div className='col-sm-8'>
            <h3>Graph</h3>
            <div className={classes.tags}>
              <TagSelector />
            </div>

            <Graph />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});
export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync,
  refreshRepos
})(HomeView);
