import React, { memo, useEffect } from 'react';
import './styles.css';

import ApexCharts from 'apexcharts';

import { $ } from 'utilize/Tricks';

const DepartmentChart = () => {

    useEffect(() => {
        return() => {
            var options = {
                series: [{
                name: 'Website Blog',
                type: 'column',
                data: [1,2,3,4,5,6,7]
            }, {
                name: 'Social Media',
                type: 'line',
                data: [1,2,3,4,5,6,7]
            }],chart: {
                height: 350,
                type: 'line',
            },stroke: {
                width: [0, 4]
            },title: {
                text: 'Department Chart'
            },dataLabels: {
                enabled: true,
                enabledOnSeries: [1]
            },labels: [
                1,2,3,4,5,6,7
            ],xaxis: {
                type: 'datetime'
            },yaxis: [{
                    title: {
                        text: 'Website Blog',
                    },
            }, {
                opposite: true,
                title: {
                text: 'Social Media'
            }}]};
            var chart1 = new ApexCharts($('.DepartmentChart-chart1'), options);
            chart1.render();
            var chart2 = new ApexCharts($('.DepartmentChart-chart2'), options);
            chart2.render();
        }
    }, [])

    return (
        <div className='DepartmentChart'>
            <div className='DepartmentChart-chart1' />
            <div>
                Chart of a Department
            </div>
            <label htmlFor="departments">Select a Department:</label>
            <select name="departments" id="departments">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
            <div className='DepartmentChart-chart2' />
            <div>fasdfasf</div>
        </div>
    )
}

export default memo(DepartmentChart);