import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom"
import { Line } from "react-chartjs-2";
import isMarketClosed from "../../utils/marketopen";
import RealTimeStockChart from "./RealTimeStockChart";
import CustomError from "../../components/Error";
import Loading from "../../components/Loading";
// import { Chart as ChartJS } from "chart.js/auto";

const Li = ({ children, onClick }) => {
    return (
        <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={onClick}>
            {children}
        </li>
    )
}
export const chartLineStyles = {
    fill: true,
    backgroundColor: 'rgba(0, 0, 255, 0.1)', // Light cyan area under the line
    borderColor: "rgb(0, 0, 255)", // Cyan line color
    borderWidth: 2,
    pointBackgroundColor: 'rgb(0, 0, 255)',
    pointBorderColor: '#0000ff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(0, 255, 255)',
    tension: 0.1,
}

export const StockLineChart = ({ dates, prices }) => {
    const chartingData = {
        labels: dates,
        datasets: [
            {
                label: "Stock Price",
                data: prices,
                ...chartLineStyles
            },
        ],
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
            // tooltip: {
            //     // mode: 'index',
            //     // intersect: false,    
            // },
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
                //   grid: {
                //     color: 'rgba(70, 70, 70, 0.5)', // Dark grey grid lines
                //   },
            },
            y: {
                title: {
                    display: true,
                    text: "Price (USD)",
                    color: 'rgb(200, 200, 200)', // Light grey axis title
                },
                ticks: {
                    color: 'rgb(150, 150, 150)', // Slightly darker grey for tick labels
                },
                grid: {
                    color: 'rgba(70, 70, 70, 0.5)', // Dark grey grid lines
                },
                beginAtZero: false,
            },
        },
        // animation: {
        //     y: {
        //         duration: 0 // Disable y-axis animation
        //     }
        // },
    };

    return (
        <div className="max-h-[500px] md:max-h-[700px] min-h-[400px] md:h-[600px] md:max-w-[90%] ">
            <Line data={chartingData} options={options} />
        </div>
    )
};
export default function Prices() {
    const { stockId } = useLoaderData();
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeLength, setTimeLength] = useState("past7days");
    const [dropdownText, setDropdownText] = useState("7d");

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [chartingData, setChartingData] = useState({});

    const samplingFunc = (priceData) => {
        const past7days = priceData.length >= 7 ? priceData.splice(0, 7) : priceData;
        const oneMonth = priceData.length >= 30 ? priceData.splice(0, 30) : priceData;
        const sixMonths = priceData.length >= 180 ? priceData.splice(0, 180) : priceData;
        return [past7days, oneMonth, sixMonths];
    }
    useEffect(() => {
        const getStockPrices = async () => {
            try {
                const response = await fetch(`https://financialmodelingprep.com/api/v3/historical-price-full/${stockId}?apikey=${import.meta.env.VITE_STOCK_API_KEY}`)
                if (!(response.ok)) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                const data = jsonData["historical"];
                const [past7days, oneMonth, sixMonths] = samplingFunc(data);
                setData(data);
                setChartingData({
                    past7days: past7days.reverse(),
                    oneMonth: oneMonth.reverse(),
                    sixMonths: sixMonths.reverse(),
                })
            }
            catch (err) {
                setError("Failed to fetch data from the server");
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }

        getStockPrices();
    }, [])
    // if (!data) {
    //     return (
    //         <div>
    //             Loading...
    //         </div>
    //     )
    // }
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

    console.log(chartingData)

    const marketHours = {
        open: '7:00 PM',
        close: '1:30 AM',
        timezone: 'Indian Standard Time (IST)'
    };

    return (
        <div className="">
            <div className="md:pl-28 md:mt-6">
                {/* prices */}
                {/* <Line data={chartingData} options={options} /> */}
                <div className="flex flex-row w-full mt-7 mb-6">
                    <div className="relative self-start">
                        <button
                            id="dropdownDefaultButton"
                            onClick={toggleDropdown}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                        >
                            {dropdownText}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div
                                id="dropdown"
                                className="z-10 absolute mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDefaultButton"
                                >
                                    <Li onClick={() => {
                                        setDropdownText('Realtime');
                                        setTimeLength('realtime');
                                        setIsDropdownOpen(false);
                                    }}
                                    >
                                        Realtime
                                    </Li>
                                    <Li onClick={() => {
                                        setDropdownText('7d');
                                        setTimeLength('past7days');
                                        setIsDropdownOpen(false);
                                    }}
                                    >
                                        7d
                                    </Li>
                                    <Li onClick={() => {
                                        setDropdownText('1M');
                                        setTimeLength('oneMonth');
                                        setIsDropdownOpen(false);
                                    }}
                                    >
                                        1M
                                    </Li>
                                    <Li onClick={() => {
                                        setDropdownText('6M');
                                        setTimeLength('sixMonths');
                                        setIsDropdownOpen(false);
                                    }}
                                    >
                                        6M
                                    </Li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {
                    timeLength === "past7days" ? <StockLineChart dates={chartingData.past7days.map((value) => value['date'])} prices={chartingData.past7days.map((value) => value['close'])} /> :
                        timeLength === "oneMonth" ? <StockLineChart dates={chartingData.oneMonth.map((value) => value['date'])} prices={chartingData.oneMonth.map((value) => value['close'])} /> :
                            timeLength === "sixMonths" ? <StockLineChart dates={chartingData.sixMonths.map((value) => value['date'])} prices={chartingData.sixMonths.map((value) => value['close'])} /> :
                                timeLength === "realtime" ?
                                    isMarketClosed() ? <div className="h-[70vh] flex">
                                        <div className="bg-red-100 border-l-4 dark:bg-[#210000] border-red-500 text-red-700 dark:text-red-200 p-4 rounded shadow-md max-w-md h-fit mt-8">
                                            <h2 className="font-bold text-lg mb-2">Market Closed</h2>
                                            <p className="mb-2">
                                                The markets are currently closed. Please visit during regular trading hours:
                                            </p>
                                            <p className="font-semibold">
                                                Monday to Friday: {marketHours.open} - {marketHours.close} {marketHours.timezone}
                                            </p>
                                            <p className="text-sm mt-2 text-red-600">
                                                Note: Markets are closed on weekends and holidays.
                                            </p>
                                        </div>
                                    </div> : <RealTimeStockChart ticker={stockId} /> : null
                }
            </div>
        </div>
    )
}