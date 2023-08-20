import React, { useState } from 'react';
import './styles.css';

import { HiCheck } from 'react-icons/hi';

import Header from 'screen/Header';
import MedicationOrderImage from './components/MedicationOrderImage';
import MedicationOrderVideoBox from './components/MedicationOrderVideoBox';
import MedicationOrderImageBox from './components/MedicationOrderImageBox';

const MedicationOrder = () => {
    const [toastImage, setToastImage] = useState('');

    const list_image = [
        'https://tse4.mm.bing.net/th?id=OIP.jEmRxT9E9n1p4bwRuR9Q5AHaLH&pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th?id=OIP.6pdYuOJykXMtN1AZfdiPDQHaEo&pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th?id=OIP.g3mwzy8yd5G35aabXinW4wHaEK&pid=Api&P=0&h=180',
        'https://tse4.mm.bing.net/th?id=OIP.XugCmVLH1rDmR8JFKTQMsgHaFA&pid=Api&P=0&h=180',
        'https://tse3.mm.bing.net/th?id=OIP.oznFbNgwGoyK3dYamXO1egHaEK&pid=Api&P=0&h=180'
    ].map((data, index) => {
        return <MedicationOrderImageBox key={index} data={data} setToastImage={setToastImage} />
    })

    const list_video = [
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/',
        'http://localhost:4040/api/video/'
    ].map((data, index) => {
        return <MedicationOrderVideoBox key={index} data={data} index={index} />
    })

    return (
        <div className='MedicationOrder'>
            <Header />
            <div className='MedicationOrder-main'>
                <h2>Order ( 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d )</h2>
                <h4>Title</h4>
                <div className='MedicationOrder-History'>
                    <div className='MedicationOrder-History-header'>History</div>
                    <div className='MedicationOrder-History-list'>
                        <div className='MedicationOrder-History-step'>
                            <div><span>1</span></div>
                            <div>Cart ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>2</span></div>
                            <div>Order ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>3</span></div>
                            <div>Confirm ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>4</span></div>
                            <div>Transport ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                        <div className='MedicationOrder-History-step'>
                            <div><span>5</span></div>
                            <div>Receive ( <span>time</span> ) </div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-MedicateList'>
                    <div className='MedicationOrder-MedicateList-header'>Medicate List</div>
                    <div className='MedicationOrder-MedicateList-list'>
                        <div className='MedicationOrder-medicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div>
                                <span>30</span>
                                <button>Detail</button>
                            </div>
                        </div>
                        <div className='MedicationOrder-medicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div>
                                <span>30</span>
                                <button>Detail</button>
                            </div>
                        </div>
                        <div className='MedicationOrder-medicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div>
                                <span>30</span>
                                <button>Detail</button>
                            </div>
                        </div>
                        <div className='MedicationOrder-medicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div>
                                <span>30</span>
                                <button>Detail</button>
                            </div>
                        </div>
                        <div className='MedicationOrder-medicateList-medicate'>
                            <div>Name</div>
                            <div>Symptom</div>
                            <div>
                                <span>30</span>
                                <button>Detail</button>
                            </div>
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
                <div className='MedicationOrder-Image'>
                    <div className='MedicationOrder-Image-header'>Image</div>
                    <div className='MedicationOrder-Image-list'>
                        { list_image }
                    </div>
                </div>
                <div className='MedicationOrder-Video'>
                    <div className='MedicationOrder-Video-header'>Video</div>
                    <div className='MedicationOrder-Video-list'>
                        { list_video }
                    </div>
                </div>
                <div className='MedicationOrder-Note'>
                    <div className='MedicationOrder-Note-header'>Note (<span>You</span>)</div>
                    <div className='MedicationOrder-Note-list'>
                        <div>ghi chu benh an</div>
                    </div>
                </div>
                <div className='MedicationOrder-Note'>
                    <div className='MedicationOrder-Note-header'>Note (<span>Doctor or Pharmacist</span>)</div>
                    <div className='MedicationOrder-Note-list'>
                        <div>ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an ghi chu benh an</div>
                    </div>
                </div>
                <div className='MedicationOrder-Transport'>
                    <div className='MedicationOrder-Transport-header'>Transport</div>
                    <div className='MedicationOrder-Transport-list'>
                        <div className='MedicationOrder-Transport-step'>
                            <div>Normal</div>
                            <div>: 10$</div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Pay'>
                    <div className='MedicationOrder-Pay-header'>Payment</div>
                    <div className='MedicationOrder-Pay-list'>
                        <div className='MedicationOrder-Pay-step'>
                            <div><span>1</span></div>
                            <div>Cash</div>
                            <div><HiCheck size={25} color='green' /></div>
                        </div>
                    </div>
                </div>
                <div className='MedicationOrder-Total'>
                    <div className='MedicationOrder-Total-header'>Total</div>
                    <div className='MedicationOrder-Total-list'>
                        <div>Medication</div>
                        <div>Transport</div>
                        <div>Total</div>
                        <div>10$</div>
                        <div>1$</div> 
                        <div>11$</div> 
                    </div>
                </div>
                <div className='MedicationOrder-Report'>
                    <div>
                        <textarea placeholder='Content Report' />
                    </div>
                    <div>
                        <button>Report</button>
                    </div>
                </div>
            </div>
            <MedicationOrderImage toastImage={toastImage} />
        </div>
    )
}

export default MedicationOrder;