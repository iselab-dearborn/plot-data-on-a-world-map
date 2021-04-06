function readCountries(){

    return new Promise((resolve, reject) => {

        $.get("country.csv", function (response) {

            const rows = response.split("\n");

            const countries = {};

            rows.forEach((el, i) => {

                el = $.trim(el);

                if (i == 0 || el.length == 0) {
                    return;
                }

                let columns = el.split(";");

                countries[columns[0].toLowerCase()] = {
                    countryCode: $.trim(columns[1]),
                    isoCodes: columns[2].split("/").map(el => $.trim(el)),
                }
            });

            resolve(countries);
        });
    });
}

function getData(){

    return new Promise((resolve, reject) => {

        var data = $("#data").val();

        const rows = data.split("\n");

        const output = [];

        rows.forEach((el, i) => {

            el = $.trim(el);

            if (el.length == 0) {
                return;
            }

            let columns = el.split(";");

            output.push({
                id: columns[0],
                name: columns[1],
                z: parseInt(columns[2]),
                code3: "",
                code: "",
            });
        });

        resolve(output);
    });
}

function updateData(countries, data){

    data.forEach((el, i) => {

        let key = el.name.toLowerCase();
        let country = countries[key];

        if(country){
            el.code = country.isoCodes[0];
            el.code3 = country.isoCodes[1];
        }else{
            console.log("Not Found", el)
        }
    });

    return data;
}

function plot(data){

    Highcharts.mapChart('container', {

        chart: {
            map: 'custom/world'
        },

        title: {
            text: null
        },

        exporting: {
            sourceWidth: 600,
            sourceHeight: 500
        },

        mapNavigation: {
            enabled: true,
            enableButtons: false,
            buttonOptions: {
                verticalAlign: 'top'
            }
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
                pointFormat: '{point.code}: {point.value}/km²'
            }
        }]
    });
}

$(function(){

    readCountries().then((countries) => {

        getData().then((data) => {

            data = updateData(countries, data);

            plot(data);
        });
    });

})
