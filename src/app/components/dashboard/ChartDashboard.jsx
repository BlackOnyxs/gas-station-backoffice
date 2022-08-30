import React, { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
 
export const ChartDashboard = () => {
   
    const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
    const data = {
        labels: labels,
        datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
  
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    }
 
    useEffect(() => {
        
        const myChart = new Chart(
            document.getElementById('myChart'),
            config
          );
 
          return () => {
            myChart.destroy()
          }
    }, [])
    
 
 
  return (
    <canvas id="myChart"></canvas>
  )
}