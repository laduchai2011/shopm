import React, { memo, useState } from 'react';
import './styles.css';

import Chart from "react-apexcharts";


const HomeChart = () => {
    const [todayChartOptions, setTodayChartOptions] = useState({
        horizontal: true,
        dataLabels: false
    });

    const state = {
          
        series: [{
            data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }, 
        {
            data: [410, 440, 458, 480, 540, 580, 690, 1100, 1200, 1380]
        },
        {
            data: [410, 440, 458, 480, 540, 580, 690, 1100, 1200, 1380]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: todayChartOptions.horizontal,
                }
            },
            dataLabels: {
                enabled: todayChartOptions.dataLabels
            },
            xaxis: {
                categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                    'United States', 'China', 'Germany'
                ]
            }
        },
    }

    const handleShowAll = () => {
        setTodayChartOptions(pre => {
            return {
                ...pre,
                dataLabels: !pre.dataLabels
            }
        })
    }

    const handleChartDirection = () => {
        setTodayChartOptions(pre => {
            return {
                ...pre,
                horizontal: !pre.horizontal
            }
        })
    }

    return (
        <div className='HomeChart'>
            <h3>Today</h3>
            <div className='HomeChart-today'>
                <div>
                    <Chart
                        options={state.options}
                        series={state.series}
                        type="bar"
                        width="100%"
                    />
                </div>
                <div className='HomeChart-today-setting'>
                    <input type='checkbox' checked={todayChartOptions.dataLabels} onChange={() => handleShowAll()} />
                    <span>Show all</span>
                    <br />
                    <input type='checkbox' checked={!todayChartOptions.horizontal} onChange={() => handleChartDirection()} />
                    <span>Horizontal or vertical</span>
                </div>
            </div>
        </div>
    )
}

export default memo(HomeChart);