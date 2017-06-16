var Highcharts = require('highcharts');

var pieOptions = {
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
        pointFormat: '<b>{point.y}</b> tweets'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: []
};

export {pieOptions};
