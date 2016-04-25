import React, { PropTypes } from 'react';

class AddRepo extends React.Component {
  constructor (props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static propTypes = {
    addRepo: PropTypes.func.isRequired
  }

  state = {
    value: ''
  }

  onSubmit (e) {
    e.preventDefault();

    this.props.addRepo(this.state.value);
  }

  onChange = (e) => {
    this.setState({value: e.target.value.toLowerCase()});
  }

  render () {
    return (
      <div>
        <h3>Add a repo</h3>
        <form onSubmit={this.onSubmit}>
          <div className='input-group'>
            <input className='form-control' onChange={this.onChange} />
            <div className='input-group-btn'>
              <button className='btn btn-default' type='submit'>Add</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default AddRepo;
