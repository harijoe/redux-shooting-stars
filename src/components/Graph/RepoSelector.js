import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTag, removeTag } from '../../redux/modules/tagList'
import {WithContext as ReactTags} from 'react-tag-input'

class RepoSelector extends React.Component {
  static propTypes = {
    tagList: PropTypes.object.isRequired,
    availableRepos: PropTypes.object.isRequired,
    addTag: PropTypes.func.isRequired,
    removeTag: PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
        <ReactTags tags={Array.from(this.props.tagList)}
          suggestions={Array.from(this.props.availableRepos.size)}
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
  availableRepos: new Set(['repo1', 'repo2', 'repo3'])
})

export default connect((mapStateToProps), {
  addTag: (tag) => addTag(tag),
  removeTag: (tag) => removeTag(tag)
})(RepoSelector)
