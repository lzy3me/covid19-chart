import Head from 'next/head'
import useHistoricalData from '../actions/useHistoricalData'
import ChartData from '../components/ChartData'

export default function Home() {
  const [allCountry, isBegin, setIsBegin, date, chartData] = useHistoricalData()

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Covid-19 Historical Data</h1>
      <button onClick={() => setIsBegin(true)} disabled={isBegin}>Begin</button>
      <p>{date}</p>
      <ChartData item={[allCountry, chartData]} />
    </div>
  )
}
