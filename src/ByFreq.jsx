import React, { Component } from 'react';
import {List, Segment, Label, Grid} from 'semantic-ui-react';
import DetailsItem from './DetailsItem.jsx'


class ByFreq extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    if (!this.props.statsFetched) {
      return (<div>

      </div>)
    }

    return (
      <Grid.Column width={12}>
        <List animated divided relaxed='very' verticalAlign='middle'>
            <DetailsItem header='Early Moring Tweets' description={this.props.stats.time_freq.early_morning} />
            <DetailsItem header='Moring Tweets' description={this.props.stats.time_freq.morning} />
            <DetailsItem header='Afternoon Tweets' description={this.props.stats.time_freq.afternoon} />
            <DetailsItem header='Night Tweets' description={this.props.stats.time_freq.night} />
        </List>
      </Grid.Column>
    );
  }
}

export default ByFreq;
