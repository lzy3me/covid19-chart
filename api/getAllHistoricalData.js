import axios from 'axios'

const getAllHistoricalData = () => axios.get('https://disease.sh/v3/covid-19/historical?lastdays=all')

export default getAllHistoricalData