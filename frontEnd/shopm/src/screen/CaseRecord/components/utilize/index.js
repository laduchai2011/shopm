import { 
    setIsCurrentPage,
    setIsCompleted,
    setIsCompletedPrescription,
    setIsCompletedOrIsCompletedPrescription,
    setIsLocked,
    setIsOrderMedicationWithCaseRecord ,
    setIsOutOfMedication
} from "reduxStore/slice/caseRecordSlice";


/**
*@typedef {
*isCheckCurrentPage: boolean,
*isCheckCompleted: boolean,
*isCheckCompletedPrescription: boolean,
*isCheckCompletedOrCompletedPrescription: boolean,
*isCheckLocked: boolean,
*isCheckOrderMedication: boolean,
*isCheckOutOfMedication: boolean
*} isCheckCaseRecordMidOptions
*/ 

/**
*@typedef {
*uuid_caseRecord: uuid_caseRecord,
*caseRecordRole: string, doctorOrPharmacist or patient
*isLocked: boolean,
*pageNumber: string
*} caseRecordLockOptions
*/ 

export function handleCaseRecordMid({isCheckCaseRecordMidOptions, resData, dispatch}) {
    if ((isCheckCaseRecordMidOptions.isCheckCurrentPage) && (resData?.checkedType==='currentPage')) {
        dispatch(setIsCurrentPage({
            isCurrentPage: resData?.isCurrentPage,
            message: resData?.message, 
            checkedType: resData?.checkedType
        }))
    } 
    if ((isCheckCaseRecordMidOptions.isCheckCompleted) && (resData?.checkedType==='completed')) {
        dispatch(setIsCompleted({
            isCompleted: resData?.isCompleted,
            message: resData?.message,
            checkedType: resData?.checkedType
        }))
    }
    if ((isCheckCaseRecordMidOptions.isCheckCompletedPrescription) && (resData?.checkedType==='completedPrescription')) {
        dispatch(setIsCompletedPrescription({
            isCompletedPrescription: resData?.isCompletedPrescription,
            message: resData?.message,
            checkedType: resData?.checkedType
        }))
    }
    if ((isCheckCaseRecordMidOptions.isCheckCompletedOrCompletedPrescription) && (resData?.checkedType==='completedOrCompletedPrescription')) {
        dispatch(setIsCompletedOrIsCompletedPrescription({
            isCompletedOrIsCompletedPrescription: resData?.isCompletedOrIsCompletedPrescription,
            message: resData?.message,
            checkedType: resData?.checkedType
        }))
    }
    if ((isCheckCaseRecordMidOptions.isCheckLocked) && (resData?.checkedType==='locked')) {
        dispatch(setIsLocked({
            isLocked: resData?.isLocked,
            message: resData?.message,
            checkedType: resData?.checkedType
        }))
    }
    if ((isCheckCaseRecordMidOptions.isCheckOrderMedication) && (resData?.checkedType==='orderMedication')) {
        dispatch(setIsOrderMedicationWithCaseRecord({
            isOrderMedication: resData?.isOrderMedication,
            message: resData?.message,
            checkedType: resData?.checkedType
        }))
    }
    if ((isCheckCaseRecordMidOptions.isCheckOutOfMedication) && (resData?.checkedType==='outOfMedication')) {
        dispatch(setIsOutOfMedication({
            isOutOfMedication: resData?.isOutOfMedication,
            message: resData?.message,
            checkedType: resData?.checkedType
        }))
    }
}

export function handleCaseRecordCondition(...args) {
    let data = {};
    let gen;

    function next() {
        setTimeout(() => {
            gen.next();
        }, 0)
    }
    
    function* generator() {
        for (let arg of args) {
            yield arg(data, next);
        };
    }

    gen = generator();
    gen.next();
}

export function isCurrentPage(data, next) {
    const pageNumber = Number(data.pageNumber);
    const pageTotal = data.caseRecord.pageTotal;
    if (pageNumber === pageTotal) {
        next();
    }
}
export function isCompleted(data, next) {
    if (data.caseRecord.status==='completed') {
        next();
    }
}
export function isCompletedPrescription(data, next) {
    if (data.caseRecord.status==='completedPrescription') {
        next();
    }
}
export function isNotCompleted(data, next) {
    if (data.caseRecord.status!=='completed') {
        next();
    }
}
export function isNotCompletedPrescription(data, next) {
    if (data.caseRecord.status!=='completedPrescription') {
        next();
    }
}
export function isCompletedOrIsCompletedPrescription(data, next) {
    if ((data.caseRecord.status==='completed') || (data.caseRecord.status==='completedPrescription')) {
        next();
    }
}
export function isLocked(data, next) {
    const caseRecordLockOptions = data.caseRecordLockOptions;
    const caseRecordRole = data.caseRecordRole;
    const pageNumber = data.pageNumber;

    if (caseRecordLockOptions?.isLocked && caseRecordLockOptions?.caseRecordRole===caseRecordRole && caseRecordLockOptions?.pageNumber===pageNumber) { 
        next();
    } 
}
export function isNotLocked(data, next) {
    const caseRecordLockOptions = data.caseRecordLockOptions;
    const caseRecordRole = data.caseRecordRole;
    const pageNumber = data.pageNumber;

    if (!caseRecordLockOptions?.isLocked || 
        ((caseRecordLockOptions?.isLocked && caseRecordLockOptions?.caseRecordRole===caseRecordRole) && caseRecordLockOptions?.pageNumber===pageNumber)
    ) {
        next();
    }
}
export function isOrderMedicationWithCaseRecord(data, next) {
    const uuid_caseRecord = data.caseRecord.uuid_caseRecord;
    const pageNumber = data.pageNumber;
    const orderMedication = data.orderMedication;

    if ((uuid_caseRecord===orderMedication.uuid_caseRecord) && (pageNumber===orderMedication.pageNumber)) {
        next();
    }
}