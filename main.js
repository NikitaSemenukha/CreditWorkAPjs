const Chart = require('chart.js');
const { getExchangeRates } = require('./api');

const visibility = {
    EUR: true,
    USD: true,
    PLN: true
};

const chartLabels = ['7 days', '14 days', 'month', 'year'];

function createChart(data) {
    const ctx = document.getElementById('chart').getContext('2d');
    const chartData = {
        labels: chartLabels,
        datasets: []
    };

    Object.keys(data).forEach(currency => {
        if (visibility[currency]) {
            const currencyData = {
                label: currency,
                data: data[currency],
                fill: false
            };
            chartData.datasets.push(currencyData);
        }
    });

    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Period'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}

getExchangeRates((error, rates) => {
    if (error) {
        console.error('Error', error);
    } else {
        const data = {};

        Object.keys(rates).forEach(currency => {
            data[currency] = [rates[currency]];

            for (let i = 1; i < chartLabels.length; i++) {
                const startDate = getStartDate(chartLabels[i]);
                const endDate = getEndDate();
                const historicalRates = getHistoricalRates(startDate, endDate);
                data[currency].push(historicalRates[currency]);
            }
        });

        createChart(data);
    }
});
