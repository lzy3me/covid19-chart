import React, { useState, useEffect } from 'react'
import getAllHistoricalData from '../api/getAllHistoricalData'

const useHistoricalData = () => {
    const [loop, setLoop] = useState(0)
    const [date, setDate] = useState('')
    const [chartData, setChartData] = useState([])
    const [allData, setAllData] = useState([])
    const [allDate, setAllDate] = useState([])
    const [allCountry, setAllCountry] = useState([])
    const [allInfected, setAllInfected] = useState([])
    const [isBegin, setIsBegin] = useState(false)

    useEffect(async () => {
        await getAllHistoricalData().then(val => {
            const countrys = []
            const infected = []

            setAllData(val.data)
            setAllDate(Object.keys(val.data[0].timeline.cases))
            val.data.forEach(val => {
                countrys.push(val.country)
                infected.push(val.timeline.cases)
            })
            setAllCountry(countrys)
            setAllInfected(infected)
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (isBegin) {
                if (loop < allDate.length) {
                    let tempDaliy = []

                    allInfected.forEach(val => {
                        tempDaliy.push(val[allDate[loop]])
                    })
                    setChartData(tempDaliy)

                    // let mapped = chartData.map((el, i) => {
                    //     return { index: i, value: el }
                    // })

                    // mapped.sort((a, b) => {
                    //     if (a.value > b.value)
                    //         return -1
                    //     if (a.value < b.value)
                    //         return 1
                    //     return 0
                    // })

                    // let result = mapped.map((el) => { return chartData[el.index] })
                    // setChartData(result)

                    setDate(allDate[loop])
                    setLoop(loop + 1)
                }
            }
        }, 500);
        return () => {
            clearInterval(interval)
        }
    }, [allDate, loop, isBegin])


    return [allCountry, isBegin, setIsBegin, date, chartData]
}

export default useHistoricalData