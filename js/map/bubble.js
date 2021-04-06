function plotBubble(data){

    Highcharts.mapChart('container', {

        chart: {
            map: 'custom/world'
        },

        title: {
            text: null
        },

        exporting: {
            sourceWidth: 1200,
            sourceHeight: 500
        },

        mapNavigation: {
            enabled: true
        },
        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><br>Lat: {point.lat:.2f}, Lon: {point.lon:.2f}'
        },
        series: [{
            name: 'Countries',
            color: '#E0E0E0',
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            name: 'Population 2016',
            joinBy: ['iso-a3', 'code3'],
            data: data,
            minSize: 4,
            maxSize: '12%',
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.z}'
            },
            tooltip: {
                pointFormat: '{point.code}: {point.z}'
            }
        }]
    });
}
