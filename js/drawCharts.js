var deathForecastData = [{
    x: [],
    y: [],
    type: 'Scatter',
    mode: 'lines+markers',
}]
var confirmedForecastData = [{
    x: [],
    y: [],
    type: 'Scatter',
    mode: 'lines+markers',
}]

const plotPast = (pastData) => {
    let pastConfirmed = []
    let pastDeaths = []
    let pastDates = []
    pastData.forEach(dayobj => {
        pastConfirmed.push(parseInt(dayobj.confirmed))
        pastDeaths.push(parseInt(dayobj.deaths))
        pastDates.push(dayobj.date)
    })

    deathForecastData[0].x = deathForecastData[0].x.concat(pastDates)
    deathForecastData[0].y = deathForecastData[0].x.concat(pastDeaths)

    confirmedForecastData[0].x = confirmedForecastData[0].x.concat(pastDates)
    confirmedForecastData[0].y = confirmedForecastData[0].y.concat(pastConfirmed)

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
    deathForecastData[0].x = deathForecastData[0].x.concat(nextDates)
    deathForecastData[0].y = deathForecastData[0].x.concat(nextDeaths)

    confirmedForecastData[0].x = confirmedForecastData[0].x.concat(nextDates)
    confirmedForecastData[0].y = confirmedForecastData[0].y.concat(nextConfirmed)

    console.log("Next: ", { confirmedForecastData, deathForecastData })
    Plotly.newPlot('death-forecast', deathForecastData);
    Plotly.newPlot('active-forecast', confirmedForecastData);
}

const clearPlots = () => {
    deathForecastData = [{
        x: [],
        y: [],
        type: 'Scatter',
        mode: 'lines+markers',
    }]
    confirmedForecastData = [{
        x: [],
        y: [],
        type: 'Scatter',
        mode: 'lines+markers',
    }]

    Plotly.newPlot('death-forecast', []);
    Plotly.newPlot('active-forecast', []);
}