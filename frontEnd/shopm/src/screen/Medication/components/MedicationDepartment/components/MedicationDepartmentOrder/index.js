import React, { useRef, useState, useCallback, useEffect } from "react";
import './styles.css';

import { 
    Table1, 
    BigDownArrow, 
    BigUpArrow
} from "react-tks/components";
import { moneyString } from 'react-tks/utils';

import MedicationDepartmentOrderShip from "./components/MedicationDepartmentOrderShip";

import { getCookie } from "auth/cookie";

/**
 * @typedef {import('define/department').selected_department_toBuy__Options} selected_department_toBuy__Options
*/
/**
 * @typedef {import('define/department').calculate_money__Options} calculate_money__Options
*/

const MedicationDepartmentOrder = ({index, data, onSetShipCost}) => { 
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
    const ship_type_default = getCookie('ship_type_default');
    const show_ship_method_element = useRef(null);
    const [isShow_methodShip, set_isShow_methodShip] = useState(false);
    const [ship_type, set_ship_type] = useState(() => {
        if (ship_type_default.length > 0) {
            return ship_type_default;
        } else {
            return 'normal';
        }
    });
    const [default_text, set_default_text] = useState('');
    useEffect(() => {
        let default_text_;
        if (ship_type_default===ship_type) {
            default_text_ = ' (default)';
        } else { 
            if (ship_type_default.length > 0) {
                default_text_ = '';
            } else {
                if (ship_type==='normal') {
                    default_text_ = ' (default)';
                } else {
                    default_text_ = '';
                }
            }
        }
        set_default_text(default_text_);
    }, [ship_type, ship_type_default])
    const handleShow_shipMethod = () => {
        let isShow = isShow_methodShip;
        if (show_ship_method_element.current) {
            if (show_ship_method_element.current.classList.contains('show')) {
                show_ship_method_element.current.classList.remove('show');
                isShow = false;
            } else {
                show_ship_method_element.current.classList.add('show');
                isShow = true;
            }
        }

        setTimeout(() => {
            set_isShow_methodShip(isShow);
        }, 300)
    }
    const handleShipType = useCallback((type, newShipCost) => {
        set_ship_type(type);
        onSetShipCost(index, newShipCost);
    }, [index, onSetShipCost])
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
                    {
                        isShow_methodShip ?
                        <BigUpArrow onClick={() => handleShow_shipMethod()} /> :
                        <BigDownArrow onClick={() => handleShow_shipMethod()} />
                    }  
                </div>
                <div className="MedicationDepartmentOrder-show_ship_method" ref={show_ship_method_element}>
                    <div>{`You selected ${ship_type} ship${default_text}`}</div>
                    <div>
                        <MedicationDepartmentOrderShip type={'normal'} ship_type={ship_type} onSelected={handleShipType} />
                        <MedicationDepartmentOrderShip type={'now'} ship_type={ship_type} onSelected={handleShipType} />
                        <MedicationDepartmentOrderShip type={'economize'} ship_type={ship_type} onSelected={handleShipType} />
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