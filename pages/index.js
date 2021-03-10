import Head from 'next/head'
import useHistoricalData from '../actions/useHistoricalData'
import ChartData from '../components/ChartData'
import ChartRender from '../components/ChartRender'
import ChartContext from '../context/ChartContext'

export default function Home() {
  const [isBegin, setIsBegin, date, chartData] = useHistoricalData()

  const valuesContext = {
    chartData,
    isBegin,
    setIsBegin,
    date
  }

  return (
    <div>
      <Head>
        <title>Covid</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ChartContext.Provider value={valuesContext}>
        <ChartRender />
      </ChartContext.Provider>
    </div>
  )
}
