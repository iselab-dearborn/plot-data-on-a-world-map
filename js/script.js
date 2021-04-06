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

        if(country){
            el.code = country.isoCodes[0];
            el.code3 = country.isoCodes[1];
        }else{
            console.log("Not Found", el)
        }
    });

    return data;
}

function plot(countries){

    let data = $("#data").val();

    data = parse(data);

    data = loadCodes(countries, data);

    plotBubble(data);
}

function loadExample(countries){

    $.get("data/example.csv", function (response) {
        $("#data").val(response);
        plot(countries);
    });
}

$(function(){

    readCountries().then((countries) => {

        loadExample(countries);

        $("#btn-plot").click((event) => {
            event.preventDefault();
            plot(countries);
        });
    });

    //let countries =  readCountries();

    // console.log(countries)

    //

    //     getData().then((data) => {

    //         data = updateData(countries, data);

    //         plot(data);
    //     });
    // });

})
