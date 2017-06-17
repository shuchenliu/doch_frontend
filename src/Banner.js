import React, { Component } from 'react';
import {Image} from 'semantic-ui-react';

/*
Banner url passed in as a prop

*/

class Banner extends Component {

  render() {
    let contentShown = (
      <div className='Alt-banner'> </div>
    );

    if (!this.props.noBanner) {
       contentShown = <Image  className='Banner' fluid src={this.props.bannerUrl} alt='Banner'/>
    }

    return (
      <div className='Banner-Avatar-Holder'>
          {contentShown}
      </div>

    );
  }
}

export default Banner;
