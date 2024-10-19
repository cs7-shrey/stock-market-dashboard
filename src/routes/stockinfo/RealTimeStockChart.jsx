import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { unixTimetoHumanDateTime } from "../../utils/marketopen";

export default function RealTimeStockChart({ticker}) {
    // const [chartData, setChartData] = useState({});
    const [chartData, setChartData] = useState({
        labels: [], // Store timestamps for X-axis
        datasets: [
          {
            label: "Stock Price",
            data: [], // Store stock prices for Y-axis
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      });

    const socketRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket('wss://ws.finnhub.io?token=cs6mlbpr01qkeuli5d30cs6mlbpr01qkeuli5d3g');
        socketRef.current = socket;
        // Connection opened -> Subscribe
        socket.onopen = function (event) {
            socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': ticker }))
        };
        let i = 1;
        // Listen for messages
        socket.addEventListener('message', function (event) {
            // console.log('Message from server ', event.data);
            const data = JSON.parse(event.data)['data'][0];
            // console.log(data);
            // const timestamps = data.map((value) => unixTimetoHumanDateTime(value['t']));
            // const prices = data.map((value) => value['t']);
            const timestamps = [unixTimetoHumanDateTime(data['t'])];
            if (i == 1) {
                console.log(data['t']);
                i += 1;
            }
            const prices = [data['p']];
            setChartData(prev => {
                const newLabels = [...prev.labels, ...timestamps].splice(-30);
                const newData = [...prev.datasets[0].data, ...prices].splice(-30);
                i += 1;
                return {
                    ...prev,
                    labels: newLabels,
                    datasets: [
                        {
                            ...prev.datasets[0],
                            data: newData,
                        },
                    ],
                };
            })
        });
        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ 'type': 'unsubscribe', 'symbol': ticker }));
                socket.close();
            }
        }
    }, [ticker])
    const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
          y: {
            title: {
              display: true,
              text: "Stock Price (USD)",
            },
            beginAtZero: false,
          },
        },
        animation: false,
      };
      
      return (
        <div>
            { <Line data={chartData} options={options} />}
        </div>
      )
}