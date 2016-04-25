import React, {PropTypes} from 'react';

var Stats = ({stats}) => {
  console.log(stats);
  return <div>
    <table className='table'>
      <tbody>
        <tr>
          <td>datapoints</td><td>{stats.datapointsCount}</td>
        </tr>
        <tr>
          <td>repositories</td><td>{stats.repositoriesCount}</td>
        </tr>
      </tbody>
    </table>
  </div>;
};

Stats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default Stats;
