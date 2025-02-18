import React from "react";
import './styles.css';

import { Table1 } from "react-tks/components";
import { moneyString } from 'react-tks/utils';

/**
 * @typedef {import('define/department').selected_department_toBuy__Options} selected_department_toBuy__Options
*/

const MedicationDepartmentOrder = ({data}) => { 

    const selectedDepartmentInfor = [
        { columnName: 'Name', fieldName: 'name'},
        { columnName: 'Amount To Buy', fieldName: 'amountToBuy'},
        // { columnName: 'Ship', fieldName: 'ship'},
    ]

    // /** @type {[selected_department_toBuy__Options[], React.Dispatch<React.SetStateAction<selected_department_toBuy__Options[]>>]} */
    // const [selectedDepartment_List, setSelectedDepartment_List] = useState(data.selected_departments_toBuy);
    /** @type {selected_department_toBuy__Options[]} */
    const selectedDepartment_List = data?.selected_departments_toBuy;

    const orderMoney = {
        price: 0,
        sale: 0,
        vat: 0
    };
    const shipCost = 10;
    let total = 0;

    const moneyString_ = (numberString) => {
        return moneyString({
            numberString: numberString,
            money_type: 'VND',
            alias_list: ['K', 'TR', 'T', 'KT'],
            isLog: true
        })
    } 

    for (let i = 0; i < selectedDepartment_List.length; i++) {
        const amountToBuy = selectedDepartment_List[i].amountToBuy;
        const price = selectedDepartment_List[i].price;
        const sale = selectedDepartment_List[i].discount;

        orderMoney.price = orderMoney.price + amountToBuy * price;
        orderMoney.sale = orderMoney.sale + amountToBuy * price * sale * 0.01;
        orderMoney.vat = orderMoney.vat +0. (orderMoney.price - orderMoney.sale) * 10 * 0.01;
    }

    return (
        <div className="MedicationDepartmentOrder">
            <div>
                {selectedDepartment_List.length>0 && <Table1 table1={{
                    config: {
                        columnInfor: selectedDepartmentInfor
                    },
                    data: {values: selectedDepartment_List},
                }}/> }
            </div>
            <div className="MedicationDepartment-total">
                    <div>
                        <div><strong>Order:</strong></div>
                        <div title={`${orderMoney.price} - ${orderMoney.sale} - ${orderMoney.vat}`}>{`${moneyString_(Math.round(orderMoney.price).toString()).full_with_round} - ${moneyString_(Math.round(orderMoney.sale).toString()).full_with_round} - ${moneyString_(Math.round(orderMoney.vat).toString()).full_with_round}`}</div>
                    </div>
                    <div>
                        <div><strong>Ship:</strong></div>
                        <div title={shipCost}>{moneyString_(shipCost.toString()).full_with_round}</div>
                    </div>
                    <div>
                        <div><strong>Total:</strong></div>
                        <div title={total}>{moneyString_(total.toString()).full_with_round}</div>
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