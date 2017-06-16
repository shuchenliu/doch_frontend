import {lineOptions} from './lineChart-byday.js';
import {pieOptions} from './pieChart-byday.js';

export function getOptions(chartType, weekStats, screenName) {
    let options = chartType === 0 ? lineOptions : pieOptions;
    let mapping = {};
    let dateArray = [];
    let datapoints = [];
    let dataPies = [];
    let data = weekStats.byDay;

    for (let dateString in data) {
      var dateNums = dateString.split('-');

      var thatDate = Date.UTC(dateNums[0], dateNums[1] - 1, dateNums[2]);
      mapping[thatDate] = dateString;

      dateArray.push(thatDate);

    }

    dateArray.sort(function(a, b){
      return a - b;
    });

    for (let i = 0; i < dateArray.length; i++) {
      let date = dateArray[i];
      let numTweets = data[mapping[date]]
      datapoints.push(numTweets);
      let sliced = false;
      if (i === 0) {
        sliced = true;
      }
      dataPies.push({
        name: (new Date(date).toDateString()),
        y:  numTweets,
        sliced: sliced,
      });
    }

    options.title.text = screenName + '\'s Tweet Stats from Last 7 Days - by day';

    tweetsSeries = {
          name: 'Tweets Amount',
          data: datapoints,
          pointStart: dateArray[0],
          pointInterval: 24 * 3600 * 1000 // one day
    }
    
    if (chartType === 0) {

    } else {
         options.series[0].data = dataPies;
    }


    return options;
}
