function plotBubble(data, settings){

    Highcharts.mapChart('container-map-bubble', {
        chart: {
            map: 'custom/world',
            borderWidth: settings.showBorder? 1 : 0,
            borderColor: "lightgray"
        },
        title: {
            text: settings.chartTitle || null
        },
        subtitle: {
            text: settings.chartSubtitle || null
        },
        exporting: {
            sourceWidth: 1200,
            sourceHeight: 500
        },
        mapNavigation: {
            enabled: settings.showMapNavigation || false,
        },
        credits: {
            enabled: settings.showWatermark || false,
        },
        series: [{
            name: 'Countries',
            color: '#E0E0E0',
            showInLegend: false,
            enableMouseTracking: false
        }, {
            type: 'mapbubble',
            name: settings.axisTitle || "Data",
            joinBy: ['iso-a3', 'code3'],
            data: data,
            minSize: settings.minSize || 10,
            maxSize: settings.maxSize || 100,
            showInLegend: settings.showLegend,
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
