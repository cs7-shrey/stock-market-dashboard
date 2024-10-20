import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { StockLineChart } from './stockinfo/Prices';
import { chartLineStyles } from './stockinfo/Prices';
const WebSocketChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Random Number',
        data: [],
        // borderColor: 'rgb(75, 192, 192)',
        // tension: 0.1,
        ...chartLineStyles
      },
    ],
  });

  const socketRef = useRef(null);

    useEffect(() => {
      const socket = new WebSocket('wss://simpleclockbackend-gxeyedauc4afdcbk.canadacentral-01.azurewebsites.net/ws');
      socket.onopen = (event) => {
        console.log("Connection to web socket successful");
        socketRef.current = socket;
      }
      socket.onmessage = (event) => {
        const newNumber = parseInt(event.data, 10);
        updateChartData(newNumber);
      };

      return () => {
        if (socketRef.current) socketRef.current.close();
      };
    }, []);

  const updateChartData = (newNumber) => {
    setChartData(prevData => {
      const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
      const newData = [...prevData.datasets[0].data, newNumber];

      // Keep only the last 30 data points
      if (newLabels.length > 10) {
        newLabels.shift();
        newData.shift();
      }

      return {
        labels: newLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      };
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Random Number WebSocket Chart',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(70, 70, 70, 0.5)', // Dark grey grid lines
        },
      },
    },
    animation: {
        y: {
          duration: 0 // Disable y-axis animation
        }
      },
  };

  return (
    <div className='dark:bg-black h-full sm:p-10'>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WebSocketChart;