/**
*@typedef {
*account: string,
*password: string,
*phone: string,
*fullName: string,
*avatar: string,
*childCompany: string,
*department: string,
*office: string,
*note: text,
*status: string
*} memberOptions
*/ 

/**
*@typedef {
*account: string,
*password: string,
*phone: string,
*fullName: string,
*avatar: string,
*childCompany: string,
*department: string,
*office: string,
*note: text,
*time: string,
*uuid_member: UUID
*} member_CH_Options
*/ 

/**
*@typedef {
*VM: string,
*service: string,
*type: string,
*log: text,
*image: text,
*video: text,
*document: text,
*note: text,
*read: bool,
*fixbug: bool
*} logOptions
*/

/**
*@typedef {
*VM: string,
*service: string,
*type: string,
*log: text,
*image: text,
*video: text,
*document: text,
*note: text,
*read: bool,
*fixbug: bool,
*uuid_member: UUID,
*uuid_log: UUID
*} log_CH_Options
*/

/**
*@typedef {
*name: string,
*title: string,
*address: string,
*note: text,
*status: string,
*createdBy: UUID
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
*address: string,
*note: text,
*status: string,
*uuid_member: UUID,
*uuid_chestGroup: UUID
*} chestGroup_CH_Options
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
*uuid_departmentChest: UUID,
*uuid_chestGroup: UUID
*} chestOptions
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
*uuid_member: UUID,
*uuid_chest: UUID
*} chestOptions
*/ 