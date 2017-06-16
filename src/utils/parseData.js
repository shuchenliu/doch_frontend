var Highcharts = require('highcharts');

function configs(weekStats) {
  let mapping = {};
  let dateArray = [];
  let datapoints = [];
  let favdata = [];
  let rtdata = [];
  let data = weekStats.byDay;
  let interacts = weekStats.interacts;
  interacts.sort(function(a, b){
    return new Date(a.date) - new Date(b.date);
  });

  for (let dateString in data) {
    var dateNums = dateString.split('-');
    var thatDate = Date.UTC(dateNums[0], dateNums[1] - 1, dateNums[2]);
    mapping[thatDate] = dateString;
    dateArray.push(thatDate);
  }

  dateArray.sort(function(a, b){
    return a - b;
  });

  var tweetPie = {
      type: 'pie',
      name: 'tweets',
      size: '100%',
      innerSize: '75%',
      colorByPoint: true,
      data: [],

  };
  var favPie = {
      type: 'pie',
      name: 'favorites',
      size: '75%',
      innerSize: '50%',
      colorByPoint: true,
      data: [],
  };
  var rtPie = {
      type: 'pie',
      name: 'retweets',
      size: '50%',
      innerSize: '45%',
      colorByPoint: true,
      data: [],
  };
  var dataPies = [favPie, rtPie, tweetPie];

  for (let i = 0; i < dateArray.length; i++) {
    let date = dateArray[i];
    let numTweets = data[mapping[date]]
    datapoints.push(numTweets);
    favdata.push(interacts[i].favs);
    rtdata.push(interacts[i].rts);

    tweetPie.data.push({
      name: (new Date(date).toISOString().substring(0,10)),
      y:  numTweets,
    });

    favPie.data.push({
      name: (new Date(date).toISOString().substring(0,10)),
      y:  interacts[i].favs,
    });

    rtPie.data.push({
      name: (new Date(date).toISOString().substring(0,10)),
      y:  interacts[i].rts,
    });
  }
/*
  for (let i = 0; i < interacts.length; i++) {
    favdata.push(interacts[i].favs);
    rtdata.push(interacts[i].rts);
  }
*/

  let favLineoptions = {
    series: {
      name: 'Received Favs',
      type: 'column',
      data: favdata,
      color: Highcharts.getOptions().colors[3],
    },
    yAxis: {
      title: {
        text: 'Number of Favs',
        style: {
          color: Highcharts.getOptions().colors[3],
        },
      },
      labels: {
        style: {
          color: Highcharts.getOptions().colors[3],
        },
      },
      opposite: true,
    },
  };

  let rtLineOptions = {
    series: {
      name: 'Received Retweets',
      type: 'column',
      //dashStyle: 'shortdot',
      data: rtdata,
      color: Highcharts.getOptions().colors[0]
    },
    yAxis: {
      title: {
        text: 'Number of Retweets',
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      labels: {
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      opposite: true,
    },
  };


  let tweetLineOptions = {
      pointStart: dateArray[0],
      series: {
          name: 'Tweets Amount',
          //type: 'spline',
          data: datapoints,
          color: Highcharts.getOptions().colors[5],
      },
      yAxis: {
        title: {
          text: 'Number of Tweets',
          style: {
            color: Highcharts.getOptions().colors[5],
          }
        },
        labels: {
          style: {
            color: Highcharts.getOptions().colors[5],
          },
        },
        opposite: false,
      }
  };

  //console.log(Highcharts.getOptions().colors[0]);
  const configs = {
    line: [favLineoptions, rtLineOptions, tweetLineOptions],
    pie: dataPies,
  }

  return configs;
}



function setOptions(settings) {
  let options = {
    chart: {
      //type: 'area',
    },

    title: {
      //setable
      text: undefined,
    },

    subtitle: {
      text: 'All dates US/Eastern. Powered by <a href="http://highcharts.com">Highcharts</a>',
    },

    credits : {
      enabled: false,
    },

    xAxis: {
          crosshair: true,
          type: 'datetime',
          dateTimeLabelFormats: {
              day: '%b %e'
          }
      },
    //setable
    yAxis: [],

    tooltip: {
          shared: true,
      },

    plotOptions: {
      series: {
        //setable
        pointStart: undefined,
        pointInterval: 24 * 3600 * 1000
    },
        },
    //setable
    series: [],
  };

  let elements = settings.elements;
  let configs = settings.configs.line;

  if (settings.pie) {
      options = {
        chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie',
          },
          title: {
              text: ''
          },
          subtitle: {
            text: 'All dates US/Eastern. Powered by <a href="http://highcharts.com">Highcharts</a>',
          },
          credits: {
            enabled: false,
          },
          tooltip: {
              pointFormat: '<b>{point.y}</b> {series.name}, {point.percentage:.1f}% of total'
          },
          plotOptions: {
              pie: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                    formatter: function () {
                        //return this.y > 5 ? this.point.name : null;
                        return this.point.x === 0 ? this.series.name : null;
                    },
                    color: '#ffffff',
                    distance: -15,
                  },
                  showInLegend: false,
              }
          },
          legend:{
            title: {
                text: '',
            },
          },
          series: []
      };
      configs = settings.configs.pie;
      for (let i = 0; i < 3; i++) {
        if (elements[i]) {
          options.series.push(configs[i]);
        }
      }

      if (options.series.length > 0) {
        options.series[0].showInLegend = true;
      }
      for (let i = 1; i < options.series.length; i++) {
        options.series[i].showInLegend = false;
      }

    //  options.legend.title.text = 'Amount of ' + options.series[0].name + ' by day';
  } else {
      options.plotOptions.series.pointStart = configs[2].pointStart;
      var index = 0;
      for (let i = 0; i < elements.length; i++) {
        if (elements[i]) {
          configs[i].series.yAxis = index;
          options.yAxis.push(configs[i].yAxis);
          options.series.push(configs[i].series);
          index++;
        }
      }
  }
  options.title.text = settings.screenName + '\'s Tweet Stats from Last 7 Days - by day';
  return options;
}



/*
let sliced = false;
if (i === 0) tweetLineOptions, favLineoptions, rtLineOptions{;
  sliced = true;
}
dataPies.push({
  name: (new Date(date).toDateString()),
  y:  numTweets,
  sliced: sliced,
});
*/

export {configs, setOptions}
