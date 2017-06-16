import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import Chart from './Chart.jsx';



class DataRep extends Component {

    render() {
      if (this.props.statsFetched && !this.props.error) {
        return (

            <Chart container='chart'
                   screenName={this.props.user.screenName}
                   pie={this.props.chartToggleChecked}
                   configs={this.props.configs}
                   elements={this.props.elements}/>

        );
      } else {
        return (
          <Grid centered>
            <Grid.Row>
              <h2 className='NotFound'>
                No recent tweets from {this.props.user.screenName}
              </h2>
            </Grid.Row>
          </Grid>
        );
      }
    }
}

export default DataRep;


/*
<Grid.Column width={3}>
  <Checkbox label={'Favorites'} onChange={() => this.props.handleElementChange(0)} />
  <Checkbox label={'Retweets'} onChange = {() => this.props.handleElementChange(1)} />
  <Checkbox label={'Tweets'} onChange = {() => this.props.handleElementChange(2)} defaultChecked/>
  <Checkbox slider fitted={true} label='Pie Chart' onChange={this.props.handleChartToggle}/>
</Grid.Column>
*/
