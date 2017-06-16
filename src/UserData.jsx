import React, { Component } from 'react';
import {Grid, Dimmer, Header, Icon} from 'semantic-ui-react';
import Banner from './Banner.js'
import Avatar from './Avatar.js'
import Profile from './Profile.js'
import Stats from './Stats.jsx'
import Description from './Description.jsx'
import Timeline from './Timeline.jsx'
import SpecialTweets from './SpecialTweets.jsx'


class UserData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      stats: {},
      dataFetched: false,
      userFetched: false,
      notFound: false,
    };
    this.handleStats = this.handleStats.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  handleStats(data) {
    this.setState({
      stats: data,
    }, () => {
      this.setState({
        dataFetched: true,
      });
    });
  }


 componentDidMount() {
   const screenName = this.props.match.params.name;
   const targetUrl = '/user/' + screenName;


 fetch(targetUrl).then((response) => {

     if (response.status !== 200) {
       const newUrl = '/target_search/' + screenName;
       fetch(newUrl).then((res) => {
         if (res.status !== 200) {
           this.setState({
             notFound: true,
           });
           return;
         }

         res.json().then((data) => {
           this.setState({
             user: data.search_info.user[0],
           });
         }).then(() => {
           this.setState({
             userFetched: true,
           });
         })
       })
       return;
     }

     response.json().then((data) => {
       this.setState({
         user: data.user,
       });
     }).then(() => {
       this.setState({
         userFetched: true,
       });
     })
   })

 }

 goHome() {
   this.props.history.push('/');
 }
  render() {
       return (
        <div className='Data-page'>
          <Dimmer
            active={this.state.notFound}
            onClickOutside={this.goHome}
            page
          >
            <Header as='h2' icon inverted>
              <Icon name='doctor' />
              User Not Found
              <Header.Subheader>Try something like...  NewYorker</Header.Subheader>
            </Header>
          </Dimmer>
          <div className='Banner-Avatar-Holder'>
                  <Banner bannerUrl={this.state.user.bannerUrl} />
                  <Avatar avatarUrl={this.state.user.avatarUrl} />
          </div>
          <Description description={this.state.user.description} />

          <Grid stackable className='Content-container' columns={2}>
              <Profile user={this.state.user}
                       loading={!this.state.userFetched}/>
              <Stats user={this.state.user}
                     handleStats={this.handleStats} />
          </Grid>

          <Grid centered stackable>
                <SpecialTweets
                      user={this.state.user}
                      stats={this.state.stats}
                      dataFetched={this.state.dataFetched} />

                    <Timeline user={this.state.user}
                          stats={this.state.stats}
                          dataFetched={this.state.dataFetched}/>
          </Grid>
        </div>
      )
  }
}

export default UserData;
