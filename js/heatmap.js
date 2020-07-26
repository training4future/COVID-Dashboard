const HEAT_FACTORS_ENDPOINT = 'http://152.67.162.241:3000/countries/US/heatfactors'
var normalizedHeatFactors = undefined

const normalize = (obj, min, max) => {
    let normalized = {}
    for (key in obj) {
        let n = undefined
        if (obj[key] === 0) {
            n = 0.1
        } else {
            n = (obj[key] - min) / (max - min)
        }
        normalized[key] = n
    }

    return normalized
}

const resetOpacity = (key) => {
    let stateObj = simplemaps_usmap_mapdata.state_specific[key]
    let name = stateObj.name
    let opacity = normalizedHeatFactors[name]
    simplemaps_usmap_mapdata.state_specific[key].opacity = `${opacity}`
    let element = document.querySelector(`path.sm_state_${key}`)
    // element.style.opacity = `${opacity}`
    element.style.fillOpacity = `${opacity}`
}

const setStateOpacities = () => {
    for (let key in simplemaps_usmap_mapdata.state_specific) {
        resetOpacity(key)
    }
}

const getHeatFactors = async () => {
    let response = await fetch(HEAT_FACTORS_ENDPOINT)
    let jsonData = await response.json()

    let maxHeatFactor = undefined
    let minHeatFactor = undefined
    let allHeatFactorsMap = {}
    // console.log(jsonData.heatFactors)
    for (let key in simplemaps_usmap_mapdata.state_specific) {
        let stateObj = simplemaps_usmap_mapdata.state_specific[key]
        let name = stateObj.name
        let heatFactor = jsonData.heatFactors[name]
        if (heatFactor === undefined) {
            heatFactor = 0
        }
        if (maxHeatFactor === undefined || maxHeatFactor < heatFactor) {
            maxHeatFactor = heatFactor
        }
        if (minHeatFactor === undefined || minHeatFactor > heatFactor) {
            minHeatFactor = heatFactor
        }
        allHeatFactorsMap[name] = heatFactor
    }
    normalizedHeatFactors = normalize(allHeatFactorsMap, maxHeatFactor, minHeatFactor)
    setStateOpacities()
    // console.log(normalizedHeatFactors)
}
getHeatFactors()