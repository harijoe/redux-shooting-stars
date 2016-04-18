/* @flow */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classes from './ConnectView.scss';

export class ConnectView extends React.Component {
  static propTypes = {
  };

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        Hello world
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
});
export default ConnectView;
