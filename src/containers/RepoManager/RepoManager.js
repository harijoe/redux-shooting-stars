import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AddRepo from '../../components/RepoManager/AddRepo';
import RepoList from '../../components/RepoManager/RepoList';
import Message from '../../components/RepoManager/Message';
import { addRepo } from '../../redux/modules/addRepo';

class RepoManager extends React.Component
{
  static propTypes = {
    addRepo: PropTypes.func.isRequired,
    addRepoState: PropTypes.object.isRequired,
    availableRepos: PropTypes.array.isRequired
  };

  render () {
    return <div>
      <Message {...this.props.addRepoState} />
      <AddRepo addRepo={this.props.addRepo} />
      <RepoList availableRepos={this.props.availableRepos} />
    </div>;
  }
}

const mapStateToProps = (state) => ({
  availableRepos: state.availableRepos.items,
  addRepoState: state.addRepo
});

export default connect((mapStateToProps), {
  addRepo
})(RepoManager);
