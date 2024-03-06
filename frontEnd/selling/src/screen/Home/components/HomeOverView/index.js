import React, { memo } from 'react';
import './styles.css';


const HomeOverView = () => {

    return (
        <div className='HomeOverView'>
            <div className='HomeOverView-turnover'>
                <div>TURNOVER</div>
                <div>1.000.000 $</div>
            </div>
            <div className='HomeOverView-turnover'>
                <div>AMOUNT</div>
                <div>1.000 UNIT</div>
            </div>
            <div className='HomeOverView-turnover'>
                <div>DEPARTMENT</div>
                <div>100</div>
            </div>
            <div className='HomeOverView-turnover'>
                <div>SOLD</div>
                <div>200</div>
            </div>
        </div>
    )
}

export default memo(HomeOverView);