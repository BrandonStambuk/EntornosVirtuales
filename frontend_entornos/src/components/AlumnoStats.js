import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { URL_API } from './const';

const endpoint = URL_API;

const AlumnoStats = () => {
  const [stats, setStats] = useState([]);
  const [myChart, setMyChart] = useState(null);
  const [accuracy, setAccuracy] = useState(0);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const alumnoId = localStorage.getItem('alumnoData');
      const alumnoData = JSON.parse(alumnoId);
      const { id } = alumnoData;
      const response = await axios.get(`${endpoint}/alumnosShow/${id}`);
      const { stats, errors } = response.data;


      drawCharts(stats);
      drawDonutChart(errors);
    } catch (error) {
      console.error("Error al obtener estadísticas del alumno:", error);
    }
  };

  const drawCharts = (stats) => {
    const ctx = document.getElementById('barChart');

    if (myChart) {
      myChart.destroy();
    }

    const statsObject = JSON.parse(stats);
    const statsArray = Object.values(statsObject);

    if (!Array.isArray(statsArray)) {
      console.error('Los datos de estadísticas no son un arreglo válido:', stats);
      return;
    }
    statsArray.sort((a, b) => b.average - a.average);
    const labels = statsArray.map(entry => entry.key);
    const values = statsArray.map(entry => entry.average);

    setMyChart(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Valor promedio en ms',
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
    }));
  };

  const drawDonutChart = (errorData) => {
    const ctx = document.getElementById('donutChart');

    const errorDataObject = JSON.parse(errorData);
    const errorDataArray = Object.values(errorDataObject);

    setMyChart(new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Exactitud', 'Errores'],
        datasets: [{
          label: 'Precisión (%)',
          data: [errorDataArray[0].accuracy, 100-errorDataArray[0].accuracy],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)'
          ],
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
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Estadísticas del alumno</h5>
              <canvas id="barChart" width="400" height="200"></canvas>
            </div>
            <div className="card-body">
              <h5 className="card-title">Precisión del alumno</h5>
              <canvas id="donutChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoStats;
