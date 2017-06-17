import React, { Component } from 'react';
import {Menu, Dropdown, Icon, Segment, Label, Grid, Image} from 'semantic-ui-react';
import {configs} from './utils/parseData.js'
import DataRep from './dataRepresentation.jsx';
import Details from './Details.jsx'

/*
Profile component displays twitter Profile.
1, Image
2, ScreenName
3, ID
4, banner => maybe another component

*/


class Stats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weekStats: {},
      configs: [],
      statsFetched: false,
      options : {},
      error: false,
      chartToggleChecked: false,
      //0 - fvs, 1 - rts, 2 - tweets
      elements: [false, false, true],
    };
    this.handleChartToggle = this.handleChartToggle.bind(this);
    this.handleElementChange = this.handleElementChange.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  fetchStats(id) {
    var targetUrl = '/seven_no_rt/' + id;
    fetch(targetUrl).then((response) => {
      if (response.status !== 200) {
        this.setState({
          statsFetched: true,
          error: true,
        }, () => {
          this.props.handleStats(-1);
        });
        return;
      }

      response.json().then((data) => {
        this.setState({
          configs: configs(data),
          weekStats: data,
          statsFetched: true,
        });
      }).then(() => {
        this.props.handleStats(this.state.weekStats);
      }
    );
    });
}


  componentWillReceiveProps(nextProps) {
    if (!this.state.statsFetched) {
        this.fetchStats(nextProps.user.id);
    }
  }

  handleChartToggle() {
    this.setState({
      chartToggleChecked : !this.state.chartToggleChecked,
    })
  }

  handleElementChange(i) {
    var newE = [];
    Object.assign(newE, this.state.elements);
    newE[i] = !(newE[i]);

    this.setState({
      elements: newE,
    });
  }

  refresh() {
    const payload = {
      user_id: this.props.user.id,
      since_id: this.state.weekStats.tweets[0].id,
    }
    const promiseSetState = state => new Promise((resolve) => {
        this.setState(state, resolve);
      })

    promiseSetState({statsFetched: false})
    .then(fetch('/update_tweets', {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload),
    })
    .then((res) => {
      if (res.status !== 200) {
        this.setState({
          statsFetched: true,
        })
        return;
      }
      this.fetchStats(this.props.user.id)
    }));
  }

  render() {
    return (
    <Grid.Column width={12}>
      <Grid stackable>

        <Grid.Row columns={2}>
          <Grid.Column width={13}>
            <Menu size='small' fluid>
              <Menu.Menu>
                <Dropdown item text='Chart Type'>
                  <Dropdown.Menu>
                    <Dropdown.Item active={!this.state.chartToggleChecked}
                                   onClick={() => {
                                    this.handleChartToggle()
                                  }}>
                            <Icon name='checkmark'
                                  color={this.state.chartToggleChecked ? 'grey' : 'green'} />
                                Bar Chart
                    </Dropdown.Item>
                    <Dropdown.Item active={this.state.chartToggleChecked}
                                   onClick={() => {
                                    this.handleChartToggle()
                                  }}>
                            <Icon name='checkmark'
                                  color={!this.state.chartToggleChecked ? 'grey' : 'green'}/>
                                Pie Chart
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown item text='Data Type' >
                  <Dropdown.Menu>
                    <Dropdown.Item active={this.state.elements[2]}
                                   onClick={() => {
                                    this.handleElementChange(2)
                                  }}>
                                  <Icon name='checkmark'
                                        color={this.state.elements[2] ? 'green' : 'grey'}/>
                                Tweets
                    </Dropdown.Item>
                    <Dropdown.Item active={this.state.elements[0]}
                                   onClick={() => {
                                    this.handleElementChange(0)
                                  }}>
                                  <Icon name='checkmark'
                                        color={this.state.elements[0] ? 'green' : 'grey'}/>
                                Favorites
                    </Dropdown.Item>
                    <Dropdown.Item active={this.state.elements[1]}
                                   onClick={() => {
                                    this.handleElementChange(1)
                                  }}>
                                  <Icon name='checkmark'
                                        color={this.state.elements[1] ? 'green' : 'grey'}/>
                                Retweets
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Menu>

                <Menu.Item
                           name='Refresh'
                           onClick={this.refresh}
                           disabled={!this.state.statsFetched}>
                  <Icon name='refresh'/> Refresh
                </Menu.Item>
            </Menu>
            <Segment raised loading={!this.state.statsFetched}>
              <Label as='a' color='red' ribbon='right'>
                Statistics
              </Label>
              <Image src='/static/paragraph.png' hidden={this.state.statsFetched}/>
                  <DataRep
                    statsFetched={this.state.statsFetched}
                    error={this.state.error}
                    user={this.props.user}
                    chartToggleChecked={this.state.chartToggleChecked}
                    configs={this.state.configs}
                    elements={this.state.elements}
                    handleElementChange={this.handleElementChange}
                    handleChartToggle={this.handleChartToggle}
                    />

            </Segment>
          </Grid.Column>

          <Grid.Column width={3}>
                <Segment raised
                         textAlign='center'
                         color='red'
                         loading={!this.state.statsFetched}>
                  <Image src='static/paragraph.png' hidden={this.state.statsFetched}/>
                  <Details
                    statsFetched={this.state.statsFetched}
                    stats={this.state.weekStats}
                    error={this.state.error}/>

                </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Grid.Column>
    );
  }
}

export default Stats;


/*

<Grid>
  <Grid.Row columns = {2}>
    <Grid.Column width={13}>
      <Chart container='chart' screenName={this.props.user.screenName} pie={this.state.chartToggleChecked} configs={this.state.configs} elements={this.state.elements}/>
    </Grid.Column>
    <Grid.Column width={3}>
      <Checkbox label={'Favorites'} onChange={() => this.handleElementChange(0)} />
      <Checkbox label={'Retweets'} onChange = {() => this.handleElementChange(1)} />
      <Checkbox label={'Tweets'} onChange = {() => this.handleElementChange(2)} defaultChecked/>
      <Checkbox slider fitted={true} label={this.state.chartType === 0 ? 'Line Chart' : 'Pie Chart'} onChange={this.handleChartToggle}/>
    </Grid.Column>
  </Grid.Row>
</Grid>
*/
