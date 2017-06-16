import React, { Component } from 'react';
import {List} from 'semantic-ui-react';


class ProfileItem extends Component {

  render() {
    //TODO parse time into more readable fashion
    return (
      <List.Item>
        <List.Icon name={this.props.icon} size='large' verticalAlign='middle'/>
        <List.Content>
          <List.Header>{this.props.header}</List.Header>
          <List.Description>{this.props.description}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default ProfileItem;
