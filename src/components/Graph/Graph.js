import React from 'react'
import _ from 'lodash'

import RepoSelector from './RepoSelector'

import { Line as LineChart } from 'react-chartjs'

const chartOptions = {
  scaleShowGridLines: false,
  pointDot: false,
  bezierCurve: false,
  multiTooltipTemplate: '<%= datasetLabel %>: <%= value %>',
  tooltipTemplate: '<%= datasetLabel %>: <%= value %>'
}

const colors = [
  {hex: '#F4B400', rgb: '244,180,0'}, // yellow
  {hex: '#3F85F2', rgb: '63,133,242'},
  {hex: '#DD4437', rgb: '221,68,55'},
  {hex: '#7E3794', rgb: '126,55,148'},
  {hex: '#0f9d58', rgb: '15,157,88'}
]

class Graph extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedRepos: [],
      selectedReposNormalized: [],
      data: {
        labels: _.rangeRight(-30),
        datasets: null,
        loaded: false
      }
    }
  }

  componentWillMount () {
    this.refreshData()
  }

  refreshData () {
    var newData = this.state.data
    newData.datasets = []
    var that = this
    if (this.state.selectedReposNormalized.length === 0) {
      this.setState({loaded: false})

      return
    }
    this.setState({loaded: false}, () => {
      // Display some kind of graph loader here
      var promises = []
      _(this.state.selectedReposNormalized).forEach(function (repo, index) {
        promises.push(that.fetchRepoData(repo, newData, colors[index]))
      })
      Promise.all(promises).then(() => {
        this.setState({loaded: true})
      })
    })

  }

  setDataset (dataset, newData) {
    newData.datasets = newData.datasets.concat(dataset)
    this.setState({data: newData, loaded: true})
  }

  fetchRepoData (repo, newData, color) {
    return this.props.apiClient.get('github_stars_measures?repository=' + repo)
      .then(({data}) => {
        var datapoints = data['hydra:member']
        datapoints = datapoints.map((e) => {
          return parseInt(e['stars'])
        })
        datapoints = _.rangeRight(0, 30 - datapoints.length, 0).concat(datapoints)
        var dataset = {
          label: repo,
          fillColor: 'rgba(' + color.rgb + ',0.2)',
          strokeColor: 'rgba(' + color.rgb + ',1)',
          pointColor: 'rgba(' + color.rgb + ',1)',
          pointStrokeColor: color.hex,
          pointHighlightFill: color.hex,
          pointHighlightStroke: 'rgba(' + color.rgb + ',1)',
          data: datapoints
        }
        this.setDataset(dataset, newData)
      })
  }

  updateRepos (repos) {
    var selectedReposNormalized = repos.map((e) => {
      return e['text']
    })
    this.setState({selectedRepos: repos, selectedReposNormalized}, () => {
      this.refreshData()
    })
  }

  render () {
    return <div>
      <h3>Graph</h3>
      <RepoSelector repos={this.props.repos} updateRepos={this.updateRepos.bind(this)}
        selectedRepos={this.state.selectedRepos}/>
      {this.state.loaded && this.state.data.datasets.length >= 1 &&
      <LineChart data={this.state.data} options={chartOptions} width='800' height='400' redraw
      />}
    </div>
  }
}

export default Graph
