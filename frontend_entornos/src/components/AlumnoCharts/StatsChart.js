import React from 'react';
import Chart from 'chart.js/auto';

const StatsChart = ({ stats }) => {

  const labels = stats.map(entry => entry.key);
  const times = stats.map(entry => entry.time);

  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tiempo (ms)',
          data: times,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [stats]);

  return <canvas ref={chartRef} />;
};

export default StatsChart;