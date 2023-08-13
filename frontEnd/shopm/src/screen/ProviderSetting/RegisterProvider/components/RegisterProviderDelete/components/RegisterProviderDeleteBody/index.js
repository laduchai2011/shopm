import React from 'react';
import './styles.css';

const RegisterProviderDeleteBody = () => {
    return (
        <div className='RegisterProviderDeleteBody'>
            <div className='RegisterProviderDeleteBody-list'>
                <div className='RegisterProviderDeleteBody-list-header'><strong>List</strong></div>
                <div className='RegisterProviderDeleteBody-list-provider'>
                    <div>provider provider provider provider 1</div>
                    <div>provider 2</div>
                </div>
            </div>
            <div className='RegisterProviderDeleteBody-authenticDelete'>
                <div className='RegisterProviderDeleteBody-authenticDelete-header'><strong>Authentic Delete</strong></div>
                <div className='RegisterProviderDeleteBody-authenticDelete-content'>
                    <div>Enter string to delete !</div>
                    <div>String: 123</div>
                    <div>
                        <input />
                    </div>
                    <div>
                        <button>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterProviderDeleteBody;