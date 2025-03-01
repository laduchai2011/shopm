export interface department__Options {
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

export interface selected_department_toBuy__Options extends department__Options {
    amountToBuy?: number
}