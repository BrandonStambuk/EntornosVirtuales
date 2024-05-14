import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { URL_API } from './const';
const endpoint = URL_API;
const AlumnoStats = () => {
  const [stats, setStats] = useState([]);
  const [myChart, setMyChart] = useState(null);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    try {
      const alumnoId = localStorage.getItem('alumnoData');
      const alumnoData = JSON.parse(alumnoId);
      const { id } = alumnoData;
      const response = await axios.get(`${endpoint}/alumnosShow/${id}`);
      setStats(response.data.stats);
      drawChart(response.data.stats);
    } catch (error) {
      console.error("Error al obtener estadísticas del alumno:", error);
    }
  };

  const drawChart = (statsData) => {
    const ctx = document.getElementById('myChart');
  
    if (myChart) {
      myChart.destroy();
    }
  
    const statsObject = JSON.parse(statsData);
  
    const statsArray = Object.values(statsObject);
    
    if (!Array.isArray(statsArray)) {
      console.error('Los datos de estadísticas no son un arreglo válido:', statsData);
      return;
    }
    statsArray.sort((a, b) => b.average - a.average);
    let labels = statsArray.map(entry => entry.key);
    let values = statsArray.map(entry => entry.average);
  
    setMyChart(new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Diferencia de tiempo por tecla',
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
  
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center mt-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Estadísticas del alumno</h5>
              <canvas id="myChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnoStats;
