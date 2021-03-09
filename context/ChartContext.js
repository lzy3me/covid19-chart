import { createContext, useContext } from 'react'

const ChartContext = createContext()
export default ChartContext

export const useChartContext = () => {
    return useContext(ChartContext)
}