import React, { Component } from 'react';
import {List} from 'semantic-ui-react';



class DetailsItem extends Component {

  render() {
    return (
      <List.Item>
        <List.Content>
          <List.Header>
              <span className='Get-Poiret'>
                  {this.props.header}
              </span>
            </List.Header>
            <span>{this.props.description}</span>
        </List.Content>
      </List.Item>
    );
  }
}

export default DetailsItem;
