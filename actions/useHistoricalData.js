import React, { useState, useEffect } from 'react'
import getAllHistoricalData from '../api/getAllHistoricalData'

const useHistoricalData = () => {
    const [loop, setLoop] = useState(0)
    const [date, setDate] = useState('')
    const [chartData, setChartData] = useState([])
    const [allData, setAllData] = useState([])
    const [allDate, setAllDate] = useState([])
    const [isBegin, setIsBegin] = useState(false)

    useEffect(async () => {
        await getAllHistoricalData().then(val => {
            const dataset = []

            val.data.forEach(val => {
                dataset.push({"country": val.country, "infected": val.timeline.cases})
            })
            setAllDate(Object.keys(val.data[0].timeline.cases))
            setAllData(dataset)
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (isBegin) {
                if (loop < allDate.length) {
                    let dataset = []

                    allData.map(val => {
                        dataset.push({"country": val.country, "infected":  val.infected[allDate[loop]]})
                    })

                    let mapped = dataset.map((el, i) => {
                        return { index: i, value: el }
                    })

                    mapped.sort((a, b) => {
                        if (a.value.infected > b.value.infected)
                            return -1
                        if (a.value.infected < b.value.infected)
                            return 1
                        return 0
                    })

                    let result = mapped.map((el) => { return dataset[el.index] })

                    setChartData(result)
                    setDate(allDate[loop])
                    setLoop(loop + 1)
                }
            }
        }, 500);
        return () => {
            clearInterval(interval)
        }
    }, [allDate, loop, isBegin])

    return [isBegin, setIsBegin, date, chartData]
}

export default useHistoricalData