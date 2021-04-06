async function readCountries(){

    return new Promise((resolve, reject) => {

        $.get("data/country.csv", function (response) {

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

function parse(data){

    const rows = data.split("\n");

    const entries = [];

    rows.forEach((el, i) => {

        el = $.trim(el);

        if (el.length == 0) {
            return;
        }

        let columns = el.split(";");

        entries.push({
            name: columns[0].toLowerCase(),
            z: parseInt(columns[1]),
            value: parseInt(columns[1]),
            code3: "",
            code: "",
        });
    });

    return entries;
}

function loadCodes(countries, data){

    data.forEach((el, i) => {

        let key = el.name.toLowerCase();
        let country = countries[key];

        if (country) {
            el.code = country.isoCodes[0];
            el.code3 = country.isoCodes[1];
        } else {
            console.log("Not Found", el)
        }
    });

    return data;
}

function plot(countries){

    let data = $("#input-data").val();

    let settings = {
        chartTitle: $('#chart-title').val(),
        chartSubtitle: $('#chart-subtitle').val(),
        axisTitle: $('#axis-title').val(),
        minSize: $('#min-size').val(),
        maxSize: $('#max-size').val(),
        showLegend: $('#show-legend').prop('checked'),
        showMapNavigation: $('#show-map-navigation').prop('checked'),
        showWatermark: $('#show-watermark').prop('checked'),
        showChartBorder: $('#show-chart-border').prop('checked'),
        showDataLabels: $('#show-data-labels').prop('checked'),
        showLogarithmicScale: $('#show-logarithmic-scale').prop('checked'),
        showColorAxis: $('#show-color-axis').prop('checked'),
        seriesColor: $('#series-color').val()
    }

    data = parse(data);

    data = loadCodes(countries, data);

    plotWorld(data, settings);
    plotBubble(data, settings);
}

function loadExample(countries){

    $.get("data/example.csv", function (response) {
        $("#input-data").val(response);
        plot(countries);
    });
}

function loadCountries(countries){

    const $table = $("#table-countries").find('tbody');

    for(const name in countries){

        $table.append([
            '<tr>',
                `<td>${name}</td>`,
                `<td>${countries[name].countryCode}</td>`,
                `<td>${countries[name].isoCodes}</td>`,
            '</tr>'
            ].join(''));
    };
}

$(function(){

    const documentHeight = $(document).height();
    const position = $(".map-container").offset();

    $(".map-container").height(documentHeight - position.top-20) ;

    readCountries().then((countries) => {

        loadCountries(countries);
        loadExample(countries);

        $("#btn-plot").click(() => {
            plot(countries);
        });
    });
})
