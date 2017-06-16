import React, { Component } from 'react';
import {Grid, Dimmer, Loader } from 'semantic-ui-react'
import SearchTarget from './SearchTarget.js';
import {Redirect} from 'react-router-dom'


class Landing extends Component {


  constructor() {
    super();
    this.state = {
        searchInProgress: false,
        dataRendered : false,
        user : {},
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleClick() {
    this.setState({
      searchInProgress : !this.state.searchInProgress,
    });
  }


  handleStateChange(data){
    this.setState({
      user : data,
    }, function(){
      this.setState({
        dataRendered : true,
      });
    });
  }

  render() {
    if (this.state.dataRendered) {
      const path = "/" + this.state.user.screenName;
      return <Redirect push to={path} />
    }
      return (
        <div className='App'>
          <div className='Centered'>
            <Grid stackable>
              <Grid.Row centered className='Site-sign-grid'>
                  <h1 className='Site-sign'>Doch.co!</h1>
              </Grid.Row>
              <Grid.Row columns={2} className='Site-intro-grid'>
                <Grid.Column width={11}>
                  <h5 className='Site-intro'> A twitter analytics tool made simple</h5>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <SearchTarget
              handleClick={this.handleClick}
              handleStateChange={this.handleStateChange}
              />
          </div>
          <Dimmer active={this.state.searchInProgress}>
            <Loader>
              <h2>Fetching user data...</h2>
            </Loader>
          </Dimmer>
        </div>
      )
  }
}

export default Landing;
