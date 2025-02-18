export type department__Options = {
    id: integer,
    uuid_department: string,
    name: string,
    title: string,
    amount: string,
    sold: string,
    remain: string,
    recover: string,
    turnover: string,
    return: string,
    consultantCost: float,
    price: float,
    discount: float,
    firstTime: string,
    lastTime: string,
    note: text,
    status: string,
    uuid_medication: uuid,
    uuid_chest: uuid | null,
    uuid_departmentGroup: uuid
}

export type selected_department_toBuy__Options = department__Options & {
    amountToBuy?: number
} 

export type selectedDepartments_toBuy_subGroup__Options = {
    be_long_to_departmentGroup: string,
    selected_departments_toBuy: selected_department_toBuy__Options[]
}