import React, { PropTypes } from 'react';
import _ from 'lodash';

import { connect } from 'react-redux';

import axios from 'axios';

import { Line as LineChart, Pie as PieChart } from 'react-chartjs';

import classes from './Graph.scss';

const chartOptions = {
  scaleShowGridLines: false,
  pointDot: false,
  bezierCurve: false,
  showTooltips: false
};

let apiClient = axios.create({
  baseURL: 'http://api.vallini.io/',
  timeout: 1000
});

const colors = [
  {hex: '#F4B400', rgb: '244,180,0'}, // yellow
  {hex: '#3F85F2', rgb: '63,133,242'},
  {hex: '#DD4437', rgb: '221,68,55'},
  {hex: '#7E3794', rgb: '126,55,148'},
  {hex: '#0f9d58', rgb: '15,157,88'}
];

/*
 This class needs heavy refactoring
 */
class Graph extends React.Component
{
  static propTypes = {
    tagList: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props);
    this.state = {
      data: {
        labels: _.rangeRight(-30),
        datasets: null,
        loaded: false
      }
    };
  }

  componentWillReceiveProps (props) {
    this.refreshData(props);
  }

  refreshData (props) {
    var newData = this.state.data;
    newData.datasets = [];
    var that = this;
    if (props.tagList.size === 0) {
      this.setState({loaded: false});

      return;
    }
    var promises = [];
    _(props.tagList.toArray()).forEach(function (repo, index) {
      promises.push(that.fetchRepoData(repo.text, newData, colors[index]));
    });
    this.setState({loaded: false});
    Promise.all(promises).then(() => {
      this.setState({loaded: true});
    });
  }

  setDataset (dataset, newData) {
    newData.datasets = newData.datasets.concat(dataset);
    this.setState({data: newData, loaded: true});
  }

  fetchRepoData (repo, newData, color) {
    return apiClient.get('github_stars_measures?repository=' + repo + '&order[measureDatetime]')
      .then(({data}) => {
        let datapoints = data['hydra:member'];
        datapoints = datapoints.map((e) => {
          return parseInt(e['stars']);
        });
        datapoints = _.flip(function () {
          return _.toArray(arguments);
        })(...datapoints);

        datapoints = _.rangeRight(0, 30 - datapoints.length, 0).concat(datapoints);
        var dataset = {
          label: repo,
          fillColor: 'rgba(' + color.rgb + ',0.2)',
          strokeColor: 'rgba(' + color.rgb + ',1)',
          pointColor: 'rgba(' + color.rgb + ',1)',
          pointStrokeColor: color.hex,
          pointHighlightFill: color.hex,
          pointHighlightStroke: 'rgba(' + color.rgb + ',1)',
          data: datapoints
        };
        this.setDataset(dataset, newData);
      });
  }

  render () {
    let content = <div></div>;
    if (this.state.loaded && this.state.data.datasets.length === 1) {
      content = <div>
        <h3>30 last days</h3>
        <LineChart data={this.state.data} options={chartOptions} width='800' height='400' redraw />;
      </div>;
    } else if (this.state.loaded && this.state.data.datasets.length >= 2) {
      let pieData =
          _.map(this.state.data.datasets, (el) => {
            return {
              value: el.data.slice(-1).pop(),
              label: el.label
            };
          })
        ;

      _.forEach(pieData, (value, key) => {
        pieData[key].color = colors[key].hex;
        pieData[key].highlightColor = colors[key].hex;
      });

      content = <div>
        <h3>Today</h3>
        <PieChart data={pieData} options={{}} width='800' height='400' redraw />;
      </div>;
    }

    return <div className={classes.drawing}>
      {content}
    </div>;
  };
}

const mapStateToProps = (state) => ({
  tagList: state.tagList
});

export default connect((mapStateToProps), {})(Graph);
