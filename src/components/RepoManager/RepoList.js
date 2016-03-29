import React, { PropTypes } from 'react';

var RepoList = ({availableRepos}) => <div>
  <h3>Repos watched:</h3>
  <p>{availableRepos.length} repos watched</p>
  <ul>
    {availableRepos.map((e) => {
      return <li key={e}>{e}</li>;
    })}
  </ul>
</div>;

RepoList.propTypes = {
  availableRepos: PropTypes.array.isRequired
};

export default RepoList;
