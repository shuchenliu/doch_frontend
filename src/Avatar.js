import React, { Component } from 'react';
import {Image} from 'semantic-ui-react';

/*
Banner url passed in as a prop

*/

class Avatar extends Component {

  render() {
    return (
      <div className='Avatar-Container' >
        <Image className='Avatar' shape='circular' size='small' src={this.props.avatarUrl} alt='Avatar' />
        </div>
    );
  }
}

export default Avatar;
