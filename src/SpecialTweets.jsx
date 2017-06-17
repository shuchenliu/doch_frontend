import React, { Component } from 'react';
import {Grid, Segment, Label, Image, Advertisement} from 'semantic-ui-react';


class SpecialTweets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favHTML: -1,
      rtHTML: -1,
      error: false,
    };

    this.getSpecialTweets = this.getSpecialTweets.bind(this);
  }

  componentDidMount() {
    (window.adsbygoogle = window.adsbygoogle || []).push({})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataFetched && nextProps.stats === -1) {
      this.setState({
        error: true,
      });
    } else if (nextProps.dataFetched) {
      this.getSpecialTweets(nextProps.stats);
    }
  }

  getSpecialTweets(stats) {
    const mostFavID = stats.max_fv.id;
    const mostRtID = stats.max_rt.id;
    const favURL = '/single_html/' + this.props.user.screenName + '/' + mostFavID;
    const rtURL = '/single_html/' + this.props.user.screenName + '/' + mostRtID;

    fetch(favURL).then((response) => {
      if (response.status !== 200) {
        this.setState({
          favHTML: 0,
        });
        return;
      }
      response.json().then((data) => {
        this.setState({
          favHTML: data.html,
        });
      }).then(() => {
        window.twttr.widgets.load();
      });
    });

    fetch(rtURL).then((response) => {
      if (response.status !== 200) {
        this.setState({
          rtHTML: 0,
        });
        return;
      }
      response.json().then((data) => {
        this.setState({
          rtHTML: data.html,
        });
      }).then(() => {
        window.twttr.widgets.load();
      });
    });
  }

  render() {
      let favContent = '';
      let rtContent = '';
      if (this.props.dataFetched && this.state.error) {
        favContent = (
          <h2 className='NotFound'>
            No recent tweets found.
          </h2>
        );

        rtContent = (
          <h2 className='NotFound'>
            No recent tweets found.
          </h2>
        );
      } else {
        if (this.state.favHTML !== -1 && this.state.favHTML !== 0) {
          favContent = (
            <div dangerouslySetInnerHTML={{__html: this.state.favHTML}}></div>
          );
        }
        if (this.state.rtHTML !== -1 && this.state.rtHTML !== 0) {
          rtContent = (
            <div dangerouslySetInnerHTML={{__html: this.state.rtHTML}}></div>
          );
        }
      }
      return (
        <Grid.Column width={7}>
              <Segment raised loading={this.state.favHTML === -1 && !this.state.error} >
                <Label as='a' color='orange' ribbon>
                  Most Favorited Tweet from past 7 days
                </Label>
                <Image src='static/paragraph.png' hidden={this.state.error || this.state.favHTML !== -1}/>
                {favContent}
              </Segment>
              <Segment raised loading={this.state.rtHTML === -1 && !this.state.error} >
                <Label as='a' color='pink' ribbon>
                  Most Retweeted Tweet from past 7 days
                </Label>
                <Image src='static/paragraph.png' hidden={this.state.error || this.state.rtHTML !== -1}/>
                {rtContent}
              </Segment>

              <Advertisement unit='medium rectangle'>
                 <ins
                   className='adsbygoogle'
                   data-ad-client='ca-pub-2964301197851129'
                   data-ad-format='auto'
                   data-ad-slot='4215614094'
                   style={{ display: 'block' }}
                 />
              </Advertisement>
        </Grid.Column>

      )
  }
}

export default SpecialTweets;
