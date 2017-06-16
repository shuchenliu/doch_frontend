import React, { Component } from 'react';
import {setOptions} from './utils/parseData.js';
var Highcharts = require('highcharts');



class Chart extends Component {
  // When the DOM is ready, create the chart.
    constructor(props) {
      super(props);
      this.state = {
        dataRecieved: false,
      };
    }


    //Destroy chart before unmount.
    componentDidMount() {
      // set blank pic
      let ops = setOptions(this.props);
      this.chart = new Highcharts[this.props.type || "Chart"](
          this.props.container,
          ops,
      );
    }

    componentWillUnmount() {
        this.chart.destroy();
    }

    componentWillReceiveProps(nextProps) {
      let ops = setOptions(nextProps);
      /*
      this.chart = new Highcharts[this.props.type || "Chart"](
          this.props.container,
          ops,
      );
      */
      this.chart = new Highcharts[this.props.type || "Chart"](
          this.props.container,
          ops,
      );

  }

    //Create the div which the chart will be rendered to.
    render() {
        return (
          <div id={this.props.container}>
          </div>
        );
    }
}

export default Chart;
