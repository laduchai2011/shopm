import React from 'react';
import './styles.css';

import Header from 'screen/Header';

import { MyComponent } from 'react-tks2';

const Chest = () => {

    return (
        <div className='Chest'>
            <Header />
            <div className='Chest-main'>
                <div className='Chest-center'>
                    <h3>Chest</h3>
                    <MyComponent message="Hello from my TypeScript package!" />
                    
                    {/* <Table message="My table" children={'dsfsdf'}>
                        table
                    </Table> */}
                </div>
            </div>
        </div>
    )
}

export default Chest;