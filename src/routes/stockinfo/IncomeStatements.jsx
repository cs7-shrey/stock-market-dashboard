import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import React from 'react';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import CustomError from "../../components/Error";
import Loading from "../../components/Loading"; 

const StockBarChart = ({ stockData, dataKey, chartTitle, yLabel }) => {
    const dates = stockData.map((value) => value['date']).reverse();
    const prices = stockData.map((value) => value[dataKey]).reverse();

    const data = {
        labels: dates,
        datasets: [
            {
                label: chartTitle,
                data: prices,
                backgroundColor: "#0000aac3", // Cyan with opacity
                // borderColor: "rgb(0, 255, 255)", // Solid cyan border
                borderWidth: 1,
                borderRadius: 5, // Rounded bars
            },
        ],
    };

    const formatRevenue = (value) => {
        if (yLabel !== "Amount") return value;
        let isNegative = value < 0;
        value = Math.abs(value);
        let tick = "";
        if (value >= 1e9) {
            tick = `$${(value / 1e9).toFixed(1)}B`;
        } else if (value >= 1e6) {
            tick = `$${(value / 1e6).toFixed(1)}M`;
        } else if (value >= 1e3) {
            tick = `$${(value / 1e3).toFixed(1)}K`;
        } else {
            tick = `$${value}`;
        }
        return isNegative ? `-${tick}` : tick;
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgb(200, 200, 200)', // Light grey legend text
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(30, 30, 30, 0.8)', // Dark background for tooltip
                titleColor: 'rgb(0, 255, 255)', // Cyan title in tooltip
                bodyColor: 'rgb(200, 200, 200)', // Light grey text in tooltip
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Date",
                    color: 'rgb(200, 200, 200)', // Light grey axis title
                },
                ticks: {
                    color: 'rgb(150, 150, 150)', // Slightly darker grey for tick labels
                },
                grid: {
                    color: 'rgba(70, 70, 70, 0.5)', // Dark grey grid lines
                },
            },
            y: {
                title: {
                    display: true,
                    text: yLabel,
                    color: 'rgb(200, 200, 200)', // Light grey axis title
                },
                ticks: {
                    color: 'rgb(150, 150, 150)', // Slightly darker grey for tick labels
                    callback: function (value) {
                        return formatRevenue(value);
                    },
                },
                grid: {
                    color: 'rgba(70, 70, 70, 0.5)', // Dark grey grid lines
                },
                beginAtZero: true,
            },
        },
        animation: {
            duration: 2000, // 2 second animation duration
            easing: 'easeInOutQuart', // Smooth easing function
        },
    };

    return (
        <div className="max-h-[500px] md:max-h-[400px] min-h-[300px] md:h-[300px] md:max-w-[90%]">
            <Bar data={data} options={options} />
        </div>
    )
};

export default function IncomeStatements() {
    const [data, setData] = useState();
    const { stockId } = useLoaderData();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getIncomeStatements = async () => {
            try {
                const response = await fetch(`https://financialmodelingprep.com/api/v3/income-statement/${stockId}?period=annual&apikey=${import.meta.env.VITE_STOCK_API_KEY}`)
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
                    <StockBarChart stockData={data} dataKey="revenue" chartTitle="revenue" yLabel="Amount" />
                </div>
                <div>
                    <StockBarChart stockData={data} dataKey="netIncome" chartTitle="Net Income" yLabel="Amount" />
                </div>
                <div>
                    <StockBarChart stockData={data} dataKey="grossProfitRatio" chartTitle="Gross Margin" yLabel="" />
                </div>
                <div>
                    <StockBarChart stockData={data} dataKey="netIncomeRatio" chartTitle="Net Margin" yLabel="" />
                </div>
            </div>
        </>
    )
}

export { StockBarChart };