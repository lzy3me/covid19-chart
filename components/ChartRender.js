import React, { useState, useEffect, useCallback } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { useChartContext } from '../context/ChartContext'

const staticDataset = {
    labels: [],
    datasets: [
        {
            label: 'infected',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            barThickness: 12,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
        }
    ]
}

const ChartRender = () => {
    const { chartData, isBegin, setIsBegin, date } = useChartContext()
    const [dataset, setDataset] = useState(staticDataset)

    const onStart = () => setIsBegin(true)

    const onStop = () => setIsBegin(false)

    const onDatasetChange = useCallback(() => {
        let tempCountry = []
        let tempInfected = []
        let newDataset = {
            ...staticDataset
        }

        chartData.map(val => {
            tempCountry.push(val.country)
            tempInfected.push(val.infected)
        })

        newDataset.labels = tempCountry
        newDataset.datasets[0].data = tempInfected

        console.log(newDataset)
        setDataset(newDataset)
    },
        [chartData],
    )

    useEffect(() => {
        onDatasetChange()
    }, [chartData, date])

    return (
        <>
            <h1>Covid-19 Historical Data</h1>
            <button onClick={onStart} disabled={isBegin}>Start/Resume</button>
            <button onClick={onStop} disabled={!isBegin}>Stop</button>
            <p>{date}</p>
            <HorizontalBar data={dataset} height={1000} />
        </>
    )
}

export default ChartRender