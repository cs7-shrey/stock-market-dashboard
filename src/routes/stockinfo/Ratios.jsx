import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { StockBarChart } from "./IncomeStatements";
import CustomError from "../../components/Error";
import Loading from "../../components/Loading";
    


export default function Ratios() {
    const [data, setData] = useState();
    const { stockId } = useLoaderData();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getIncomeStatements = async () => {
            try {
                const response = await fetch(`https://financialmodelingprep.com/api/v3/ratios/${stockId}?period=annual&apikey=${import.meta.env.VITE_STOCK_API_KEY}`)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                const data = jsonData;
                setData(data);
                setLoading(false);

            }
            catch (err) {
                setError("Failed to fetch data from the server");
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        getIncomeStatements();
    }, [])
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] bg-inherit">
                <Loading />
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex justify-center items-center m-10">
                <CustomError message={error} />
            </div>
        )
    }

    return (
        <>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 max-w-[100%] max-h-[100%] m-10">
                <div>
                    <StockBarChart stockData={data} dataKey="priceEarningsRatio" chartTitle="P/E" yLabel="" />
                </div>
                <div>
                    <StockBarChart stockData={data} dataKey="returnOnEquity" chartTitle="Return on Equity" yLabel="" />
                </div>
                <div>
                    <StockBarChart stockData={data} dataKey="debtEquityRatio" chartTitle="Debt to Equity Ratio" yLabel="" />
                </div>
            </div>
        </>
    )
}