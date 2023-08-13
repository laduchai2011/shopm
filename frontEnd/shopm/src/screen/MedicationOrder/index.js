import React from 'react';
import './styles.css';

import { HiCheck } from 'react-icons/hi';

import Header from 'screen/Header';

const MedicationOrder = () => {
    return (
        <div className='MedicationOrder'>
            <Header />
            <div className='MedicationOrder-main'>
                <h2>Order( asdas2333r23f )</h2>
                <div className='MedicationOrder-History'>
                    <div className='MedicationOrder-History-header'>History</div>
                    <div className='MedicationOrder-History-list'>
                        <div className='MedicationOrder-History-step'>
                            <div><span>1</span></div>
                            <div>Order ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>2</span></div>
                            <div>Confirm ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>3</span></div>
                            <div>Transport ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>4</span></div>
                            <div>Receive ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-MedicateList'>
                    <div className='MedicationOrder-MedicateList-header'>Medicate List</div>
                    <div className='MedicationOrder-MedicateList-list'>
                        <div className='MedicationOrder-MedicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div><button>Detail</button></div>
                        </div>
                        <div className='MedicationOrder-medicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div><button>Detail</button></div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Support'>
                    <div className='MedicationOrder-Support-header'>Support</div>
                    <div className='MedicationOrder-Support-list'>
                        <div>Doctor or Pharmacist</div>
                        <div>
                            <button>Doctor/Pharmacist Name</button>
                            <button>Doctor/Pharmacist Name</button>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Note'>
                    <div className='MedicationOrder-Note-header'>Note</div>
                    <div className='MedicationOrder-Note-list'>
                        <div>ghi chu benh an</div>
                    </div>
                </div>
                <div className='MedicationOrder-Pay'>
                    <div className='MedicationOrder-Pay-header'>Pay</div>
                    <div className='MedicationOrder-Pay-list'>
                        <div className='MedicationOrder-Pay-step'>
                            <div><span>1</span></div>
                            <div>Cash</div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Report'>
                    <div>
                        <input placeholder='Content Report' />
                    </div>
                    <div>
                        <button>Report</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicationOrder;