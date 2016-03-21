import React, { PropTypes } from 'react'
import _ from 'lodash'

import { connect } from 'react-redux'
import { addTag, removeTag } from '../../redux/modules/tagList'
import {WithContext as ReactTags} from 'react-tag-input'

class RepoSelector extends React.Component {
  static propTypes = {
    tagList: PropTypes.object.isRequired,
    availableRepos: PropTypes.array.isRequired,
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired
  };

  render () {
    let suggestions = _.difference(this.props.availableRepos, (this.props.tagList.toArray().map((e) => e.text)))

    return (
      <div>
        <ReactTags tags={Array.from(this.props.tagList)}
          suggestions={suggestions}
          handleDelete={this.props.removeTag}
          handleAddition={this.props.addTag}
          handleDrag={function () {}}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  tagList: state.tagList,
  availableRepos: state.availableRepos.items
})

export default connect((mapStateToProps), {
  addTag: (tag) => addTag(tag),
  removeTag: (tag) => removeTag(tag)
})(RepoSelector)
