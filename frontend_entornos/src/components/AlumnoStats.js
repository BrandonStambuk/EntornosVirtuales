import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { URL_API } from './const';

const endpoint = URL_API;

const AlumnoStats = () => {
  const [stats, setStats] = useState([]);
  const [barChart, setBarChart] = useState(null);
  const [donutChart, setDonutChart] = useState(null);
  const [barChartNoBackSpace, setBarChartNoBackSpace] = useState(null);
  const [donutChartNoBackSpace, setDonutChartNoBackSpace] = useState(null);
  const [cpm, setCpm] = useState(0);
  const [cpmNoBackSpace, setCpmNoBackSpace] = useState(0);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const alumnoId = localStorage.getItem('alumnoData');
      const alumnoData = JSON.parse(alumnoId);
      const { id } = alumnoData;
      const response = await axios.get(`${endpoint}/alumnosShow/${id}`);
      const { stats, errors, statsNoBackSpace, errorsNoBackSpace } = response.data;

      drawCharts(stats);
      drawDonutChart(errors);
      drawChartsNoBackSpace(statsNoBackSpace);
      drawDonutChartNoBackSpace(errorsNoBackSpace);
      calculateCpm(errors);
      calculateCpmNobackSpace(errorsNoBackSpace);
    } catch (error) {
      console.error("Error al obtener estadísticas del alumno:", error);
    }
  };

  const calculateCpm = (data) =>{
    const errorDataObject = JSON.parse(data);
    const errorDataArray = Object.values(errorDataObject);
    const totalTyped = errorDataArray[0].totalTyped;
    const time = errorDataArray[0].totalTime;
    const timeInMinutes = time / 60000;
    const cpm = totalTyped / timeInMinutes;
    setCpm(cpm);
  };
  const calculateCpmNobackSpace = (data) =>{
    const errorDataObject = JSON.parse(data);
    const errorDataArray = Object.values(errorDataObject);
    const totalTyped = errorDataArray[0].totalTyped;
    const time = errorDataArray[0].totalTime;
    const timeInMinutes = time / 60000;
    const cpm = totalTyped / timeInMinutes;
    setCpmNoBackSpace(cpm);
  };

  const drawCharts = (stats) => {
    const ctx = document.getElementById('barChart');

    if (barChart) {
      barChart.destroy();
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

    setBarChart(new Chart(ctx, {
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

    if (donutChart) {
      donutChart.destroy();
    }

    const errorDataObject = JSON.parse(errorData);
    const errorDataArray = Object.values(errorDataObject);

    setDonutChart(new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Exactitud', 'Errores'],
        datasets: [{
          label: 'Precisión (%)',
          data: [errorDataArray[0].accuracy, 100 - errorDataArray[0].accuracy],
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

  const drawChartsNoBackSpace = (stats) => {
    const ctx = document.getElementById('barChartNoBackSpace');

    if (barChartNoBackSpace) {
      barChartNoBackSpace.destroy();
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

    setBarChartNoBackSpace(new Chart(ctx, {
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

  const drawDonutChartNoBackSpace = (errorData) => {
    const ctx = document.getElementById('donutChartNoBackSpace');

    if (donutChartNoBackSpace) {
      donutChartNoBackSpace.destroy();
    }

    const errorDataObject = JSON.parse(errorData);
    const errorDataArray = Object.values(errorDataObject);

    setDonutChartNoBackSpace(new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Exactitud', 'Errores'],
        datasets: [{
          label: 'Precisión (%)',
          data: [errorDataArray[0].accuracy, 100 - errorDataArray[0].accuracy],
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
    <div className="container2 mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Estadísticas del alumno</h5>
              <p>CPM: {cpm.toFixed(2)}</p>
              <canvas id="barChart"></canvas>
            </div>
            <div className="card-body">
              <h5 className="card-title">Precisión del alumno</h5>
              <canvas id="donutChart"></canvas>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Estadísticas del alumno sin Backspace</h5>
              <p>CPM: {cpmNoBackSpace.toFixed(2)}</p>
              <canvas id="barChartNoBackSpace"></canvas>
            </div>
            <div className="card-body">
              <h5 className="card-title">Precisión del alumno sin Backspace</h5>
              <canvas id="donutChartNoBackSpace"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoStats;
