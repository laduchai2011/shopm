export type caseRecordMedicationOptions = {
    pageNumber: string,
    name: string,
    amount: INTEGER.UNSIGNED,
    note: text,
    price: INTEGER.UNSIGNED,
    discount: FLOAT,
    cost: INTEGER.UNSIGNED,
    status: string,
    uuid_caseRecord: uuid,
    uuid_medication: uuid
}