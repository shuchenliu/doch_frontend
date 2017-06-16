import React, { Component } from 'react';
import {Grid, Segment, Label, Divider, Image, Loader, Menu, Dropdown, Icon} from 'semantic-ui-react';
//import $ from "jquery"


class Timeline extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstHtmlFetched: false,
      error: false,
      htmls: [],
      nextHTMLFetched: false,
      pageEnd: false,
      isFetchingHtml: false,
      tweets: [],
      sortByDate: [true, true], // 0: current criteria, 1: Oldest First
      sortByFavs: [false, true],
      sortByRts: [false, true],
    };
    this.currentPage = 0;
    this.totalPage = -1;
    this.getNextFiveTweets = this.getNextFiveTweets.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByFavs = this.sortByFavs.bind(this);
    this.sortByRts = this.sortByRts.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  handleScroll() {
    if (!this.props.dataFetched
        || this.state.error
        || this.totalPage === this.currentPage
        || this.state.isFetchingHtml)

        return;

    const windowScroll = window.scrollY || window.pageYOffsest;
    const windowHeight = window.innerHeight;
    const totalHeight = document.body.scrollHeight || document.documentElement.scrollHeight;

    if (totalHeight === windowScroll + windowHeight) {
      this.setState({
        isFetchingHtml: true,
      }, this.setState({
          nextHTMLFetched: false,
      }, this.getNextFiveTweets));
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.dataFetched && nextProps.stats === -1) {

      this.setState({
        error: true,
      });

    } else if (nextProps.dataFetched) {
      this.totalPage = Math.ceil(nextProps.stats.tweets.length / 5);
      this.currentPage = 0;
      this.setState({
        tweets: nextProps.stats.tweets,
      }, this.setState({
          firstHtmlFetched: false,
      }, this.setState({
          isFetchingHtml: true,
      }, this.setState({
          htmls: [],
          sortByDate: [true, true],
          sortByFavs: [false, true],
          sortByRts: [false, true],
          isFetchingHtml: true,
      }, this.getNextFiveTweets))));
    }

  }


  getNextFiveTweets() {
    if (this.totalPage === this.currentPage)
      return;

    let tweets = this.state.tweets;
    let start = (this.currentPage - 0) * 5; // 5 tweets per load,
    let end = Math.min(start + 5, tweets.length)
    let htmlStrings = []


    for (let i = start; i < end; i++) {
      let url = '/single_html/' + this.props.user.id + '/' + tweets[i].id;
      fetch(url).then((response) => {
        if (response.status !== 200) {
          return;
        }
        response.json().then((data) => {
          htmlStrings[i] = data.html;
        }).then(() => {
          if (i === end - 1) {
            this.setState({
              htmls: this.state.htmls.concat(htmlStrings),
            }, this.setState({
                firstHtmlFetched: true,
            }, this.setState({
                  nextHTMLFetched: true,
            }, this.setState({
                    isFetchingHtml: false,
            }))))
          }
        }).then(() => {
          window.twttr.widgets.load();
        });
      });
    }

    this.currentPage++;

  }

  sortByDate(state){
    if (this.state.sortByDate[0] && this.state.sortByDate[1] === state)
      return

    this.setState({
      sortByDate: [true, state],
      sortByFavs: [false, this.state.sortByFavs[1]],
      sortByRts: [false, this.state.sortByRts[1]],
      isFetchingHtml: true,
    }, this.setState({
      firstHtmlFetched: false,
    }, () => {
      let tmp = this.props.stats.tweets;
      tmp.sort(function(a, b) {
          if (state) {
            return a.id - b.id;
          }

          return b.id - a.id;
      })
      this.currentPage = 0;
      this.setState({
        htmls: [],
        tweets: tmp,
      }, this.getNextFiveTweets);
    }));
  }


  sortByFavs(state){
    if (this.state.sortByFavs[0] && this.state.sortByFavs[1] === state)
      return

    this.setState({
      sortByDate: [false, this.state.sortByDate[1]],
      sortByFavs: [true, state],
      sortByRts: [false, this.state.sortByRts[1]],
      isFetchingHtml: true,
    }, this.setState({
      firstHtmlFetched: false,
    }, () => {
      let tmp = this.props.stats.tweets;
      tmp.sort(function(a, b) {
          if (!state) {
            return a.favs - b.favs;
          }

          return b.favs - a.favs;
      })
      this.currentPage = 0;
      this.setState({
        htmls: [],
        tweets: tmp,
      }, this.getNextFiveTweets);
    }));
  }

  sortByRts(state){
    if (this.state.sortByRts[0] && this.state.sortByRts[1] === state)
      return

    this.setState({
      sortByDate: [false, this.state.sortByDate[1]],
      sortByFavs: [false, this.state.sortByFavs[1]],
      sortByRts: [true, state],
      isFetchingHtml: true,
    }, this.setState({
      firstHtmlFetched: false,
    }, () => {
      let tmp = this.props.stats.tweets;
      tmp.sort(function(a, b) {
          if (!state) {
            return a.rts - b.rts;
          }

          return b.rts - a.rts;
      })
      this.currentPage = 0;
      this.setState({
        htmls: [],
        tweets: tmp,
      }, this.getNextFiveTweets);
    }));
  }

  refresh() {

  }

  render() {

    let contentShown = '';

    if (this.props.dataFetched && this.state.error) {

      contentShown = <h2 className='NotFound'> No recent tweets to display</h2>;

    } else if (this.props.dataFetched && !this.state.error) {

        let rows = [];
        let i = 0;
        this.state.htmls.forEach((html) => {
          if (html !== 404) {
            rows.push(
              <div key={i}>
                <span className='Get-Poiret'>{i + 1}</span>
                <div dangerouslySetInnerHTML={{__html: html}}></div>
                {i === this.state.htmls.length - 1 ? '' : <Divider />}
              </div>
            );
            i++;
          }
        });

        contentShown = rows;
    }

    let pageEndIndicator = '';
    if (this.currentPage === this.totalPage
        && !this.state.isFetchingHtml
        && this.state.nextHTMLFetched) {
          pageEndIndicator = <Divider horizontal
                                      className='EndOfScroll'
                                      > The End </Divider>
        }


    const oldestText = 'oldest first';
    const newestText = 'newest first'
    const oldFirstButton = (
      <span className={!this.state.sortByDate[0] ? 'Inactive': 'Active'}>
        <Icon name={'sort content descending'}
              disabled={!this.state.sortByDate[1]}/>
        {oldestText}
      </span>
    )

    const newFirstButton = (
      <span className={!this.state.sortByDate[0] ? 'Inactive': 'Active'}>
        <Icon name={'sort content ascending'}
              disabled={this.state.sortByDate[1]}/>
            {newestText}
      </span>
    )

    const mostFavText = 'most favored first';
    const leastFavText = 'least favored first';

    const mostFavButton = (
      <span className={!this.state.sortByFavs[0] ? 'Inactive': 'Active'}>
        <Icon name={'sort numeric descending'}
              disabled={!this.state.sortByFavs[1] || !this.state.sortByFavs[0]}/>
            {mostFavText}
      </span>
    )

    const leastFavButton = (
      <span className={!this.state.sortByFavs[0] ? 'Inactive': 'Active'}>
        <Icon name={'sort numeric ascending'}
              disabled={this.state.sortByFavs[1] || !this.state.sortByFavs[0]}/>
            {leastFavText}
      </span>
    )


    const mostRtText = 'most retweeted first';
    const leastRtText = 'least retweeted first';

    const mostRtButton = (
      <span className={!this.state.sortByRts[0] ? 'Inactive': 'Active'}>
        <Icon name={'sort numeric descending'}
              disabled={!this.state.sortByRts[1] || !this.state.sortByRts[0]}/>
            {mostRtText}
      </span>
    )

    const leastRtButton = (
      <span className={!this.state.sortByRts[0] ? 'Inactive': 'Active'}>
        <Icon name={'sort numeric ascending'}
              disabled={this.state.sortByRts[1] || !this.state.sortByRts[0]}/>
            {leastRtText}
      </span>
    )



    return (
      <Grid.Column width={8}>
        <Menu compact stackable>
          <Menu.Item header>
            Sort By:
          </Menu.Item>
          <Menu.Menu>
            <Dropdown item
                      trigger={this.state.sortByDate[1] ? oldFirstButton : newFirstButton}
                      disabled={!this.state.firstHtmlFetched || this.state.error}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    this.sortByDate(true)
                  }}>
                    {oldFirstButton}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    this.sortByDate(false)
                  }}>
                    {newFirstButton}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>


          <Menu.Menu>
            <Dropdown item
                      trigger={this.state.sortByFavs[1] ? mostFavButton : leastFavButton}
                      disabled={!this.state.firstHtmlFetched || this.state.error}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    this.sortByFavs(true)
                  }}>
                    {mostFavButton}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    this.sortByFavs(false)
                  }}>
                    {leastFavButton}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Menu.Menu>
          <Menu.Menu position='right'>
            <Dropdown item
                      trigger={this.state.sortByRts[1] ? mostRtButton : leastRtButton}
                      disabled={!this.state.firstHtmlFetched || this.state.error}
                      >
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => {
                    this.sortByRts(true)
                  }}>
                    {mostRtButton}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => {
                    this.sortByRts(false)
                  }}>
                    {leastRtButton}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
{/*
          <Menu.Menu>
            <Menu.Item name='Refresh'
                       onClick={this.refresh}>
              <Icon name='refresh'/> Refresh
            </Menu.Item>
          </Menu.Menu>
*/}
        </Menu>


        <Segment loading={!this.state.firstHtmlFetched && !this.state.error}>
          <Label as='a' color='purple' ribbon='right'>
            Recent Tweets
          </Label>
          <Image src='paragraph.png' hidden={this.state.firstHtmlFetched || this.state.error}/>
          <Image src='paragraph.png' hidden={this.state.firstHtmlFetched || this.state.error}/>
          {contentShown}
          <Loader active={this.props.dataFetched
                        && this.state.firstHtmlFetched
                        && !this.state.nextHTMLFetched }
                  inline='centered' />
        </Segment>
        {pageEndIndicator}
      </Grid.Column>
    );

  }
}

export default Timeline;
