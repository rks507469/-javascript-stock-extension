chartIt();

async function chartIt() {
const data = await getData();
//forming the graph
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
type: 'line',
data: {
    labels: data.xs,
    datasets: [{
    label: 'Combined Land-surface Air and Sea-Surface Water Temprature in C°',
    data: data.ys,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1,
    fill: false
    }]
},
options: {
    scales: {
    yAxes: [{
        ticks: {
        // Include a degree sign in the ticks
        callback: function(value, index, values) {
            return value + '°';
        }
        }
    }]
    }
}
});
}

async function getData() {
const xs = [];
const ys = [];
const response = await fetch('ZonAnn.Ts+dSST.csv');
const data = await response.text();

const table = data.split('\n').slice(1);
table.forEach(row => {
    const cols = row.split(',');
    const year = cols[0];
    xs.push(year);
    const temp = cols[1];
    //we are using the parseFloat beacuse the data fetched from the file is in String format so we will convert it into the integer and add the 14.
    ys.push(parseFloat(temp) + 14);
    console.log(year, temp);
});
return {
    xs,
    ys
};
}