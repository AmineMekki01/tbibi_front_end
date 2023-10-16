import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const AgePieChart = ({ data, title }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: [
                    '#99B898',
                    '#BE9886',
                    '#F18277',
                    '#EB485E',
                    '#28353B',
                ],
            },
        ],
    };

    return (
        <div>
            <h3>{title}</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default AgePieChart;
