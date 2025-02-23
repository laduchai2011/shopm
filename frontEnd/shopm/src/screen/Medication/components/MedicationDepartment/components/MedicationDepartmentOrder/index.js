import React, { useRef, useState } from "react";
import './styles.css';

import { 
    Table1, 
    BigDownArrow,
    BigUpArrow 
} from "react-tks/components";
import { moneyString } from 'react-tks/utils';
 

/**
 * @typedef {import('define/department').selected_department_toBuy__Options} selected_department_toBuy__Options
*/
/**
 * @typedef {import('define/department').calculate_money__Options} calculate_money__Options
*/

const MedicationDepartmentOrder = ({index, data}) => { 
    const selectedDepartmentInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Amount To Buy', fieldName: 'amountToBuy'},
        // { columnName: 'Ship', fieldName: 'ship'},
    ]

    const moneyString_ = (numberString) => {
        return moneyString({
            numberString: numberString,
            money_type: 'VND',
            alias_list: ['K', 'TR', 'T', 'KT'],
            isLog: true
        })
    } 

    /** @type {selected_department_toBuy__Options[]} */
    const selectedDepartments_List = data?.selected_departments_toBuy;
    /** @type {calculate_money__Options} */
    const calculate_money = data.calculate_money;

    //----------------handle ship-----------------------//
    const show_ship_method_element = useRef(null);
    const [ship_type, set_ship_type] = useState('normal');

    const handleShow_shipMethod = () => {
        if (show_ship_method_element.current) {
            show_ship_method_element.current.classList.toggle('show');
        }
    }

    const handleShipType = (type) => {
        set_ship_type(type);
    }
    //---------------------------------------//

    return (
        <div className="MedicationDepartmentOrder">
            <div>
                {selectedDepartments_List.length>0 && <Table1 table1={{
                    config: {
                        columnInfor: selectedDepartmentInfor
                    },
                    data: {values: selectedDepartments_List},
                }}/> }
            </div>
            <div className="MedicationDepartmentOrder-selecte_ship_method">
                <div>
                    <div>
                        Ship Method
                    </div>
                    <BigDownArrow onClick={() => handleShow_shipMethod()} />
                </div>
                <div className="MedicationDepartmentOrder-show_ship_method" ref={show_ship_method_element}>
                    <div>
                        You selected normal ship (default)
                    </div>
                    <div>
                        <div>
                            <div>
                                <input type="checkbox" checked={ship_type==='normal'} onChange={() => handleShipType('normal')} />
                                <p>Ship normal</p>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" checked={ship_type==='now'} onChange={() => handleShipType('now')} />
                            <p>Ship now</p>
                        </div>
                        <div>
                            <input type="checkbox" checked={ship_type==='slow'} onChange={() => handleShipType('slow')} />
                            <p>Ship slow</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="MedicationDepartmentOrder-total">
                    <div>
                        <div><strong>Order:</strong></div>
                        <div title={`${calculate_money.price} - ${calculate_money.sale} - ${calculate_money.vat}`}>{`${moneyString_(Math.round(calculate_money.price).toString()).full_with_round} - ${moneyString_(Math.round(calculate_money.sale).toString()).full_with_round} - ${moneyString_(Math.round(calculate_money.vat).toString()).full_with_round}`}</div>
                    </div>
                    <div>
                        <div><strong>Ship:</strong></div>
                        <div title={calculate_money.ship}>{moneyString_(Math.round(calculate_money.ship).toString()).full_with_round}</div>
                    </div>
                    <div>
                        <div><strong>Total:</strong></div>
                        <div title={calculate_money.total}>{moneyString_(Math.round(calculate_money.total).toString()).full_with_round}</div>
                    </div>
                </div>
                <div className="MedicationDepartment-buttom">
                   <div>
                        <button>Buy Now</button>
                        <button> Add Cart</button>
                    </div>
                </div>
        </div>
    )
}

export default MedicationDepartmentOrder;