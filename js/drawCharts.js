const plotActive = () => {
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };

    var trace2 = {
        x: [1, 2, 3, 4],
        y: [16, 5, 11, 9],
        type: 'scatter'
    };

    var data = [trace1, trace2];

    Plotly.newPlot('active-forecast', data);
}

const plotDeaths = () => {
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };

    var data = [trace1];

    Plotly.newPlot('death-forecast', data);
}

const plotPast = (pastData) => {
    // clearPlots()
    let pastConfirmed = []
    let pastDeaths = []
    let pastDates = []
    pastData.forEach(dayobj => {
        pastConfirmed.push(parseInt(dayobj.confirmed))
        pastDeaths.push(parseInt(dayobj.deaths))
        pastDates.push(dayobj.date)
    })

    let confirmedDataset = {
        x: pastDates,
        y: pastConfirmed,
        type: 'Scatter'
    }

    let deathsDataset = {
        x: pastDates,
        y: pastDeaths,
        type: 'Scatter'
    }

    console.log({ confirmedDataset, deathsDataset })

    Plotly.redraw('death-forecast', [deathsDataset]);
    Plotly.redraw('active-forecast', [confirmedDataset]);
}

const plotNext = (nextData) => {
    let pastDates = ["2020-07-18", "2020-07-19", "2020-07-20", "2020-07-21", "2020-07-22", "2020-07-23", "2020-07-24"]
    let pastConfirmed = [1, 2, 3, 4, 5, 6, 7]
    let pastDeaths = [10, 20, 30, 40, 50, 60, 70]
    let confirmedDataset = {
        x: pastDates,
        y: pastConfirmed,
        type: 'Scatter'
    }

    let deathsDataset = {
        x: pastDates,
        y: pastDeaths,
        type: 'Scatter'
    }

    console.log({ confirmedDataset, deathsDataset })

    Plotly.redraw('death-forecast');
    Plotly.redraw('active-forecast');
}

const clearPlots = () => {
    Plotly.newPlot('death-forecast', []);
    Plotly.newPlot('active-forecast', []);
}