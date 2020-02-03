chartIt();

async function chartIt() {
    const data = await getData();
    //forming the graph
    const ctx = document.getElementById('myChart').getContext('2d');
    // const myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: data.xs,
    //         datasets: [{
    //             label: 'Temprature in C°',
    //             data: data.ys,
    //             backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //             fill: false
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     // Include a degree sign in the ticks
    //                     callback: function (value, index, values) {
    //                         return value + '°';
    //                     }
    //                 }
    //             }]
    //         }
    //     }
    // });
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.timeDataCropped,
            datasets: [{
                label: 'Interday Data',
                data: data.dailyHighCropped,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false
            }]
        }
    });
}

async function getData() {
    //this is function which is using the local file and making the graph
    // const xs = [];
    // const ys = [];
    // const response = await fetch('test.csv');
    // const data = await response.text();

    // const table = data.split('\n').slice(1);
    // table.forEach(row => {
    //     const cols = row.split(',');
    //     const year = cols[0];
    //     xs.push(year);
    //     const temp = cols[1];
    //     //we are using the parseFloat beacuse the data fetched from the file is in String format so we will convert it into the integer and add the 14.
    //     ys.push(parseFloat(temp) + 14);
    //     //console.log(year, temp);
    // });
    // return {
    //     xs,
    //     ys
    // };

    /*Now i am trying to print the api data on the graph*/
    // const price = [];
    // let json = {"symbols_requested":1,"symbols_returned":1,"data":[{"symbol":"AAPL","name":"Apple Inc.","currency":"USD","price":"324.34","price_open":"324.45","day_high":"327.85","day_low":"321.38","52_week_high":"327.85","52_week_low":"160.23","day_change":"6.65","change_pct":"2.09","close_yesterday":"317.69","market_cap":"1421916372992","volume":"53002777","volume_avg":"32771333","shares":"4384030208","stock_exchange_long":"NASDAQ Stock Exchange","stock_exchange_short":"NASDAQ","timezone":"EST","timezone_name":"America/New_York","gmt_offset":"-18000","last_trade_time":"2020-01-29 16:00:01","pe":"25.75","eps":"12.60"}]};
    // let jsondata = {"symbols_requested":1,"symbols_returned":1,"data":[{"symbol":"AAPL","name":"Apple Inc.","currency":"USD","price":"330.34","price_open":"330.45","day_high":"327.85","day_low":"321.38","52_week_high":"327.85","52_week_low":"160.23","day_change":"6.65","change_pct":"2.09","close_yesterday":"317.69","market_cap":"1421916372992","volume":"53002777","volume_avg":"32771333","shares":"4384030208","stock_exchange_long":"NASDAQ Stock Exchange","stock_exchange_short":"NASDAQ","timezone":"EST","timezone_name":"America/New_York","gmt_offset":"-18000","last_trade_time":"2020-01-29 16:00:01","pe":"25.75","eps":"12.60"}]};
    // let jsondata2 = {"symbols_requested":1,"symbols_returned":1,"data":[{"symbol":"AAPL","name":"Apple Inc.","currency":"USD","price":"340.34","price_open":"324.45","day_high":"327.85","day_low":"321.38","52_week_high":"327.85","52_week_low":"160.23","day_change":"6.65","change_pct":"2.09","close_yesterday":"317.69","market_cap":"1421916372992","volume":"53002777","volume_avg":"32771333","shares":"4384030208","stock_exchange_long":"NASDAQ Stock Exchange","stock_exchange_short":"NASDAQ","timezone":"EST","timezone_name":"America/New_York","gmt_offset":"-18000","last_trade_time":"2020-01-29 16:00:01","pe":"25.75","eps":"12.60"}]};
    // price.push(json.data[0].price);
    // price.push(jsondata.data[0].price);
    // price.push(jsondata2.data[0].price);
    // console.log(price);
    // return price;
    /*Now i will try to plot the interday data to the graph on using the graph js*/
    //exact length array
    const timeData = [];
    const dailyHigh = [];
    //cropped length array
    let timeDataCropped = [];
    let dailyHighCropped = [];
    //json received from the server
    let json;

    const urlInterday = new URL("https://intraday.worldtradingdata.com/api/v1/intraday");
    let paramsInterday = {
        "symbol": "AAPL",
        "api_token": "EPpiK8ye36144w7A3eGMQzdNku6AnflXrRHjGaN572jtudY1zXxtCWdQ0mPg",
        "interval": "1",
        "range": "1",
    };
    Object.keys(paramsInterday).forEach(key => urlInterday.searchParams.append(key, paramsInterday[key]));
    const response = await fetch(urlInterday, {
        method: 'GET',
    });
    if (response.ok) {
        json = await response.json();
    } else {
        alert("Response_Error" + response.status);
    }
    //function for the iterating throught to the nested json object
    function jsonToArray(json) {
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            timeData.push(key.substr(11, 5));
            dailyHigh.push(json[key].high);
        });
        timeDataCropped = timeData.slice(0, 20);
        dailyHighCropped = dailyHigh.slice(0, 20);
        return {
            timeDataCropped,
            dailyHighCropped
        };
    }
    console.log(jsonToArray(json.intraday));
    return jsonToArray(json.intraday);
    // for(var i in json.intraday) {
    //     dailyHigh.push([i, json.intraday[i]]);
    //     console.log(json.intraday[i].high);
    // }
    //console.log(json.intraday.toArray);
    //time.push(json.interday);
}