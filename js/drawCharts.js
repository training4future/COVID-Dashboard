var deathForecastData = []
var confirmedForecastData = []

const plotPast = (pastData) => {
    let pastConfirmed = []
    let pastDeaths = []
    let pastDates = []
    pastData.forEach(dayobj => {
        pastConfirmed.push(parseInt(dayobj.confirmed))
        pastDeaths.push(parseInt(dayobj.deaths))
        pastDates.push(dayobj.date)
    })

    deathsDataset = {
        x: pastDates,
        y: pastDeaths,
        type: 'Scatter',
        mode: 'lines+markers',
        marker: {
            color: 'blue',
            // line: {
            //     color: 'rgb(231, 99, 250)',
            //     width: 2
            // }
        },
        name: "Past Deaths",
        showlegend: true
    }

    confirmedDataset = {
        x: pastDates,
        y: pastConfirmed,
        type: 'Scatter',
        mode: 'lines+markers',
        marker: {
            color: 'blue',
            // line: {
            //     color: 'rgb(231, 99, 250)',
            //     width: 2
            // }
        },
        name: "Past Confirmed Cases",
        showlegend: true
    }

    deathForecastData.push(deathsDataset)
    confirmedForecastData.push(confirmedDataset)

    console.log("Past:", { confirmedForecastData, deathForecastData })
    Plotly.newPlot('death-forecast', deathForecastData);
    Plotly.newPlot('active-forecast', confirmedForecastData);
}

const plotNext = (nextData) => {
    let nextDates = []
    let nextDeaths = []
    let nextConfirmed = []

    nextData.forEach(weekObj => {
        let weeksPredictions = Object.values(weekObj)[0].predictions
        weeksPredictions.forEach(dayObj => {
            nextDates.push(dayObj.date)
            nextDeaths.push(dayObj.deaths)
            nextConfirmed.push(dayObj.confirmed)
        })
    })

    deathsDataset = {
        x: nextDates,
        y: nextDeaths,
        type: 'Scatter',
        mode: 'lines+markers',
        marker: {
            color: 'orange',
            // line: {
            //     color: 'rgb(231, 99, 250)',
            //     width: 2
            // }
        },
        name: "Predicted Deaths",
        showlegend: true
    }

    confirmedDataset = {
        x: nextDates,
        y: nextConfirmed,
        type: 'Scatter',
        mode: 'lines+markers',
        marker: {
            color: 'orange',
            // line: {
            //     color: 'rgb(231, 99, 250)',
            //     width: 2
            // }
        },
        name: "Predicted Confirmed Cases",
        showlegend: true
    }

    deathForecastData.push(deathsDataset)
    confirmedForecastData.push(confirmedDataset)

    console.log("Next: ", { confirmedForecastData, deathForecastData })
    Plotly.newPlot('death-forecast', deathForecastData);
    Plotly.newPlot('active-forecast', confirmedForecastData);
}

const clearPlots = () => {
    deathForecastData = []
    confirmedForecastData = []

    Plotly.newPlot('death-forecast', []);
    Plotly.newPlot('active-forecast', []);
}