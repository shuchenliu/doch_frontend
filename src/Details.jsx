import React, { Component } from 'react';
import {List,} from 'semantic-ui-react';
import DetailsItem from './DetailsItem.jsx'


class Details extends Component {


  render() {
    if (!this.props.statsFetched) {
      return (<div>

      </div>)
    }

    if (this.props.statsFetched && this.props.error) {
      return (
        <h2 className='NotFound'> No recent tweets</h2>
      )
    }
    const avgRT = parseFloat(this.props.stats.avg_rt)
    const avgFav = parseFloat(this.props.stats.avg_fav)
    return (

        <List size='tiny' animated divided relaxed='very' verticalAlign='middle'>
          <DetailsItem header='Early Moring Tweets' description={this.props.stats.time_freq.early_morning} />
          <DetailsItem header='Moring Tweets' description={this.props.stats.time_freq.morning} />
          <DetailsItem header='Afternoon Tweets' description={this.props.stats.time_freq.afternoon} />
          <DetailsItem header='Night Tweets' description={this.props.stats.time_freq.night} />
          <DetailsItem header='Total Tweets' description={this.props.stats.count} />
          <DetailsItem header='Total Favorites' description={this.props.stats.total_fav} />
          <DetailsItem header='Total Rewteets' description={this.props.stats.total_rt} />
          <DetailsItem header='Avg Favorites' description={parseFloat(Math.round(avgFav * 100) / 100).toFixed(2)} />
          <DetailsItem header='Avg Retweets' description={parseFloat(Math.round(avgRT * 100) / 100).toFixed(2)} />
      </List>

    );
  }
}

export default Details;
