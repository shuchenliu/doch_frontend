import React, { Component } from 'react';
import {List, Segment, Label, Grid} from 'semantic-ui-react';
import ProfileItem from './ProfileItem.js'



class Profile extends Component {


  render() {
    var checkVerified;
    if (this.props.user.isVerified) {
      checkVerified = (
        <ProfileItem icon='checkmark' header='Verified Account' description='Yes' />
      );
    } else {
      checkVerified = (
        <ProfileItem icon='remove' header='Verified Account' description='No' />
        );
    }
    return (
    <Grid.Column width={4}>
      <Segment loading={this.props.loading} raised>
        <Label as='a' color='blue' ribbon>
          Profile
        </Label>
        <List divided relaxed>
          <ProfileItem icon='user circle' header='Name' description={this.props.user.name} />
          <ProfileItem icon='user circle outline' header='Screen Name' description={this.props.user.screenName} />
          <ProfileItem icon='key' header='User ID' description={this.props.user.id} />
          <ProfileItem icon='calendar' header='Joined at' description={this.props.user.createdAt} />
          <ProfileItem icon='users' header='Followers' description={this.props.user.followers} />
          <ProfileItem icon='twitter' header='Total Statuses' description={this.props.user.statusCount} />
          <ProfileItem icon='marker' header='Location' description={this.props.user.location} />
          {checkVerified}
        </List>
      </Segment>
    </Grid.Column>
    );
  }
}

export default Profile;
