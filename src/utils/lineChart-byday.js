var lineOptions = {
  chart: {
    type: 'area',
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


//export {lineOptions};
