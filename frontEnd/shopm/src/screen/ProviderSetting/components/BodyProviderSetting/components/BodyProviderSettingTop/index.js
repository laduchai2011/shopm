import React from 'react';
import './styles.css';

import { useNavigate } from 'react-router-dom';


const BodyProviderSettingTop = () => {
    const navigate = useNavigate();
    
    return (
        <div className='BodyProviderSettingTop'>
            <div className='BodyProviderSettingTop-header'>++ Provider:</div>
            <div className='BodyProviderSettingTop-lineYContainer'>
                <div className='BodyProviderSettingTop-lineYContainer1'>
                    <div className='BodyProviderSettingTop-lineY'></div>
                    <div className='BodyProviderSettingTop-lineYPoint'>1</div>
                    <div className='BodyProviderSettingTop-provider'>
                        <div>
                            <button>Provider demo</button>
                            <span><strong>Time:</strong> 5 day</span>
                            <span><strong>Follow:</strong> 1000</span>
                            <span><strong>Co-operation:</strong> true</span>
                        </div>
                    </div>
                </div>
                
                <div className='BodyProviderSettingTop-lineYContainer1'>
                    <div className='BodyProviderSettingTop-lineY'></div>
                    <div className='BodyProviderSettingTop-lineYPoint'>2</div>
                    <div className='BodyProviderSettingTop-provider'>
                        <div>
                            <button>Provider demo</button>
                            <span><strong>Time:</strong> 5 day</span>
                            <span><strong>Follow:</strong> 1000</span>
                            <span><strong>Co-operation:</strong> true</span>
                        </div>
                    </div>
                </div>
                
                <div className='BodyProviderSettingTop-lineYBottom'>
                    <button onClick={() => navigate('/provider/setting/register')}>+ Add provider</button>
                </div>               
            </div>
            
        </div>
    )
}

export default BodyProviderSettingTop;