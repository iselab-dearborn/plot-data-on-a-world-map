function plotWorld(data, settings){

    let minColorAxis = Number.MAX_SAFE_INTEGER;
    let maxColorAxis = Number.MIN_SAFE_INTEGER;

    data.forEach((el, i) => {
        minColorAxis = Math.min(el.value, minColorAxis);
        maxColorAxis = Math.max(el.value, maxColorAxis);
    });

    Highcharts.mapChart('container-map-world', {
        chart: {
            map: 'custom/world',
            borderWidth: settings.showChartBorder? 1 : 0,
            borderColor: "lightgray"
        },
        title: {
            text: settings.chartTitle || null
        },
        subtitle: {
            text: settings.chartSubtitle || null
        },
        exporting: {
            sourceWidth: settings.exportingSourceWidth || 1200,
            sourceHeight: settings.exportingSourceHeight || 500
        },
        mapNavigation: {
            enabled: settings.showMapNavigation || false,
        },
        credits: {
            enabled: settings.showWatermark || false,
        },
        legend: {
            title: {
                text: null,
                style: {
                    color: ( // theme
                        Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.title &&
                        Highcharts.defaultOptions.legend.title.style &&
                        Highcharts.defaultOptions.legend.title.style.color
                    ) || 'black'
                }
            },
            backgroundColor: ( // theme
                Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.backgroundColor
            ) || 'rgba(255, 255, 255, 0.85)'
        },
        colorAxis: settings.showColorAxis ? {
            min: minColorAxis,
            max: maxColorAxis,
            type: settings.showLogarithmicScale ? 'logarithmic' : null,
            minColor: '#EEEEFF',
            maxColor: settings.seriesColor || '#000022',
        } : null,
        plotOptions: {
            series:{
                color: settings.seriesColor || "#7cb5ec"
            }
        },
        series: [{
            name: settings.axisTitle || "Data",
            joinBy: ['iso-a3', 'code3'],
            data: data,
            minSize: settings.minSize || 10,
            maxSize: settings.maxSize || 100,
            showInLegend: settings.showLegend,
            dataLabels: {
                enabled: settings.showDataLabels || false,
                color: '#FFFFFF',
                format: '{point.z}'
            },
            tooltip: {
                pointFormat: '{point.code}: {point.z}'
            }
        }]
    });
}
