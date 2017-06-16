import React, { Component } from 'react';
import { Grid, Input, Button, Message, Icon } from 'semantic-ui-react'

class SearchTarget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hint : 'Type target twitter user name, e.g. realDonaldTrump',
      target : 'realDonaldTrump',
      temp : '',
      data : {},
      success: false,
      error: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.getUser = this.getUser.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }


  getUser(target) {
    const targetUrl = '/target_search/' + target;
    fetch(targetUrl).then((response) => {
      if (response.status !== 200) {
        this.props.handleClick();
        this.setState({
          error: true,
        });
        return;
      }

      response.json().then((dataJson) => {
        this.setState({
          data: dataJson['search_info'].user[0],
          success: true,
        });
      }).then(() => {
        this.props.handleClick();
        this.props.handleStateChange(this.state.data)
      });
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleClick();
    this.setState(
      {
        target : this.state.temp.length === 0 ? 'realDonaldTrump' : this.state.temp,
        temp: '',
        error : false,
      }
    , function() {
      this.getUser(this.state.target);
    });
  }

  handleNameChange(e) {
    this.setState({
      temp : e.target.value,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <Grid stackable centered>
        <Grid.Row>
          <Grid.Column width={7}>
            <Input size='small'
                   placeholder={this.state.hint}
                   onChange={this.handleNameChange}
                   error={this.state.error}
                   action
                   fluid
                   onKeyPress={this.handleKeyPress}
                   defaultValue='realDonaldTrump'>
                   <input />
                   <Button size='small' icon='search'
                           onClick={this.handleSubmit}>
                   </Button>
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={7} >
            <Message
              icon
              negative
              hidden={!this.state.error}
              size='mini'>
              <Icon name='warning'/>
              <Message.Content>
                <Message.Header>
                  Oops!
                </Message.Header>
                No Twitter user by that name. Try something like <span className='Bold'>realDonaldTrump</span>
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SearchTarget;



/*
<Input action={{ icon: 'search' }} placeholder='Search...' />

<Grid.Row columns={6}>
  <Grid.Column>

  </Grid.Column>

</Grid.Row>
<Grid.Row columns={6}>
  <Grid.Column>
    <Grid.Column width={7}>
      <Input className='Search-bar' placeholder={this.state.hint} onChange={this.handleNameChange} error={this.state.error} />
    </Grid.Column>
    <Grid.Column width={4}>
        <Button size='large' onClick={this.handleSubmit}> search </Button>
    </Grid.Column>
  </Grid.Column>
  <Grid.Column width={11}>
    <Message
      icon
      negative
      hidden={!this.state.error}
      size='small'>
      <Icon name='warning'/>
      <Message.Content>
        <Message.Header>
          Oops!
        </Message.Header>
        No Twitter user by that name. Try something like <span className='Bold'>realDonaldTrump</span>
      </Message.Content>
    </Message>
  </Grid.Column>

</Grid.Row>

*/
