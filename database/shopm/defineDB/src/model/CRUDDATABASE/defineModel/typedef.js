/**
*@typedef {
*user: string,
*password: string,
*phone: string,
*firstName: string,
*lastName: string,
*avatar: string
*} userOptions
*/  

/**
*@typedef {
*room: string,
*type: string,
*status: string,
*uuid_user: uuid
*} sockerSMRoomOptions
*/ 

/**
*@typedef {
*type: string,
*information: text,
*status: string,
*uuid_user: uuid
*} paymentOptions
*/ 

/**
*@typedef {
*name: string,
*birthday: text,
*sex: string,
*address: string,
*major: string,
*graduated: string,
*phone: string,
*avatar: text,
*image: text,
*information: text,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_user: uuid
*} doctorOrPharmacistOptions
*/ 

/**
*@typedef {
*name: string,
*birthday: text,
*sex: string,
*address: string,
*phone: string,
*status: string,
*uuid_user: uuid
*} sickPersonOptions
*/

/**
*@typedef {
*type: string,
*notification: text,
*status: string,
*uuid_user: uuid
*} sickPersonOptions
*/

/**
*@typedef {
*title: string,
*tag: string,
*content: text,
*url: string,
*status: string,
*uuid_user: uuid
*} sickPersonOptions
*/

/**
*@typedef {
*name: string,
*avatar: string,
*banner: text,
*follow: integer,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_user: uuid
*} providerOptions
*/

/**
*@typedef {
*subject: string,
*content: string,
*status: string,
*uuid_provider: uuid
*} providerAboutOptions
*/

/**
*@typedef {
*name: string,
*title: string,
*avatar: string,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: float,
*note: string,
*catalog: text,
*amount: integer,
*sold: integer,
*discount: float,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_provider: uuid
*} medicationOptions
*/

/**
*@typedef {
*name: string,
*title: string,
*avatar: string,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: float,
*note: string,
*catalog: text,
*amount: integer,
*sold: integer,
*discount: float,
*averageRating: float,
*rateCount: integer,
*status: string,
*uuid_medication: uuid
*} medication_CH_Options
*/

/**
*@typedef {
*url: string,
*status: string,
*uuid_medication: uuid
*} medicationImageOptions
*/

/**
*@typedef {
*url: string,
*status: string,
*uuid_medicationImage: uuid
*} medicationImage_CH_Options
*/

/**
*@typedef {
*url: string,
*status: string,
*uuid_medication: uuid
*} medicationVideoOptions
*/

/**
*@typedef {
*url: string,
*status: string,
*uuid_medicationVideo: uuid
*} medicationVideo_CH_Options
*/

/**
*@typedef {
*news: text,
*amountOfLike: integer,
*amountOfComment: integer,
*amountOfShare: integer,
*status: string,
*uuid_provider: uuid
*} providerNewsOptions
*/

/**
*@typedef {
*title: string,
*priceTotal: integer,
*pageTotal: integer,
*currentPage: string,
*report: text,
*status: string,
*uuid_doctorOrPharmacist: uuid,
*uuid_user: uuid
*} caseRecordOptions
*/

/**
*@typedef {
*pageNumber: string,
*description: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordDescriptionOptions
*/

/**
*@typedef {
*pageNumber: string,
*imageUrl: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordImageOptions
*/

/**
*@typedef {
*pageNumber: string,
*videoUrl: string,
*title: string,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordVideoOptions
*/

/**
*@typedef {
*pageNumber: string,
*prescription: text,
*status: string,
*uuid_caseRecord: uuid
*} caseRecordPrescriptionOptions
*/

/**
*@typedef {
*pageNumber: string,
*amount: integer,
*note: text,
*price: integer,
*discount: float,
*cost: float,
*status: string,
*uuid_caseRecord: uuid,
*uuid_medication: uuid
*} caseRecordMedicationOptions
*/

/**
*@typedef {
*name: string,
*title: string,
*address: string,
*note: text,
*status: string
*} chestGroupOptions
*/
/**
*@typedef {
*customInfor: {
*   isNewCustom: bool,
*   isUpdatedToShopm: bool,
*   isCreated: bool
*},
*note: string
*} note
*/ 

/**
*@typedef {
*name: string,
*title: string,
*type: string,
*size: string,
*maxAmount: string,
*note: text,
*status: string,
*uuid_chestGroup: uuid
*} chestOptions
*/

/**
*@typedef {
*name: string,
*title: string,
*note: text,
*status: string,
*uuid_provider: uuid
*} departmentGroupOptions
*/
/**
*@typedef {
*name: string,
*title: string,
*note: text,
*status: string,
*uuid_departmentGroup: uuid
*} departmentGroup_CH_Options
*/

/**
*@typedef {
*name: string,
*title: string,
*amount: string,
*sold: string,
*remain: string,
*recover: string,
*turnover: string,
*return: string,
*consultantCost: float,
*price: float,
*discount: float,
*firstTime: string,
*lastTime: string,
*note: text,
*status: string,
*uuid_medication: uuid,
*uuid_chest: uuid,
*uuid_departmentGroup: uuid
*} departmentOptions
*/
/**
*@typedef {
*name: string,
*title: string,
*amount: string,
*sold: string,
*remain: string,
*recover: string,
*turnover: string,
*return: string,
*consultantCost: float,
*price: float,
*discount: float,
*firstTime: string,
*lastTime: string,
*note: text,
*status: string,
*uuid_medication: uuid,
*uuid_chest: uuid,
*uuid_department: uuid
*} department_CH_Options
*/

/**
*@typedef {
*type: string,
*title: string,
*pageNumber: string,
*status: string,
*uuid_caseRecord: uuid,
*uuid_user: uuid
*} orderMedicationGroupOptions
*/

/**
*@typedef {
*name: string,
*amount: string,
*costTotal: float,
*note: text,
*status: string,
*uuid_departmentMedication: uuid,
*uuid_orderMedicationGroup: uuid
*} orderMedicationOptions
*/

/**
*@typedef {
*name: string,
*amount: string,
*price: float,
*discount: float,
*cost: float,
*note: text,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationMedicationOptions
*/

/**
*@typedef {
*description: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationDescriptionOptions
*/

/**
*@typedef {
*title: string,
*imageUrl: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationImageOptions
*/

/**
*@typedef {
*title: string,
*videoUrl: string,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationVideoOptions
*/

/**
*@typedef {
*prescription: text,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationPrescriptionOptions
*/

/**
*@typedef {
*step: string,
*isCompleted: boolean,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationStepByStepOptions
*/

/**
*@typedef {
*type: string,
*information: text,
*cost: float,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationTransportOptions
*/

/**
*@typedef {
*type: string,
*information: text,
*cost: float,
*status: string,
*uuid_orderMedication: uuid
*} orderMedicationPaymentOptions
*/