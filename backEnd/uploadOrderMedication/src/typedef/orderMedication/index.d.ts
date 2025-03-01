import * as department_typedef from '../department';

export interface current_order_group__Options extends department_typedef.selected_department_toBuy__Options {}

export interface orderMedicationGroup__Options {
    id: integer,
    uuid_orderMedicationGroup: string,
    type: string,
    title: string,
    pageNumber: string | null,
    status: string,
    uuid_caseRecord: string | null,
    uuid_user: string
}

export interface orderMedication__Options {
    id: integer,
    uuid_orderMedication: string,
    name: string,
    amount: string,
    costTotal: float,
    note: string,
    status: string,
    uuid_department: string,
    uuid_orderMedicationGroup: string
}

export interface orderMedicationDescriptions__Options {
    id: integer,
    uuid_orderMedicationDescription: string,
    description: string,
    status: string,
    uuid_orderMedication: string
}

export interface orderMedicationVideos__Options {
    id: integer,
    uuid_orderMedicationVideo: string,
    title: string,
    videoUrl: string,
    status: string,
    uuid_orderMedication: string
}

export interface orderMedicationPrescriptions__Options {
    id: integer,
    uuid_orderMedicationPrescription: string,
    prescription: string,
    status: string,
    uuid_orderMedication: string
}

export interface orderMedicationTransports__Options {
    id: integer,
    uuid_orderMedicationTransport: string,
    type: string,
    information: string,
    cost: string,
    status: string,
    uuid_orderMedication: string
}

export interface orderMedicationPayments__Options {
    id: integer,
    uuid_orderMedicationPayment: string,
    type: string,
    information: string,
    cost: string,
    status: string,
    uuid_orderMedication: string
}

export interface orderMedicationStepBySteps__Options {
    id: integer,
    uuid_orderMedicationStepByStep: string,
    step: string,
    isCompleted: boolean,
    status: string,
    uuid_orderMedication: string
}

export interface orderMedicationMedications__Options {
    id: integer,
    uuid_orderMedicationMedication: string,
    name: string,
    amount: string,
    price: float,
    discount: float,
    cost: float,
    note: string,
    status: string,
    uuid_orderMedication: string
}