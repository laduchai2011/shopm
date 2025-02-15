import { ENVIR_DEVELOPMENT } from "src/const/environment";

import { 
    cluster_for_string_Props,
    isNumberString_Props,
    alias_for_string_Props,
    alias_for_string_alias_list_Props,
    round_numberString_Props 
} from "./type";

const REACT_APP_NODE_ENV = process.env.REACT_APP_NODE_ENV;

export const handleCutPXInString = (s: string): string => {
    const arr: string[] = ['p', 'x']
    let s_new: string = '';
    for (let i: number = 0; i < s.length; i++) {
        if (arr.indexOf(s[i])===-1) {
            s_new = `${s_new}${s[i]}`;
        }
    }
    return s_new.trim();
}

export const cluster_for_string = (cluster_for_string_parameter: cluster_for_string_Props): string => {
    // default
    const amount_of_a_cluster_default: number = 3;
    const isStringTrim_default: boolean = true;

    // handle parameter
    const amount_of_a_cluster: number = cluster_for_string_parameter.amount_of_a_cluster!==undefined ? cluster_for_string_parameter.amount_of_a_cluster : amount_of_a_cluster_default; 

    const isStringTrim: boolean = cluster_for_string_parameter.isStringTrim!==undefined ? cluster_for_string_parameter.isStringTrim : isStringTrim_default;
    const string = isStringTrim ? cluster_for_string_parameter.string.trim() : cluster_for_string_parameter.string;
    const len: number = string.length;

    let cluster_for_string_: string = '';
    let count_amount_of_cluster = 0;

    if (len > 3) {
        for (let i: number = 0; i < len; i++) {
            let currentElement: string = string[len - 1 - i];
    
            if (count_amount_of_cluster < amount_of_a_cluster) {
                cluster_for_string_ = currentElement + cluster_for_string_;
                count_amount_of_cluster = count_amount_of_cluster + 1;
            } else {
                cluster_for_string_ = currentElement + "." + cluster_for_string_;
                count_amount_of_cluster = 1;
            }
        }
    } else {
        cluster_for_string_ = string;
    }
   

    return cluster_for_string_;
}

export function isFloat(value: number): boolean {
    return typeof value === 'number' && Number.isFinite(value) && !Number.isInteger(value);
}

export const isNumberString = (isNumberStringProps: isNumberString_Props): boolean => {
    const string = isNumberStringProps.string.trim();
    const len: number = string.length;
    const isLog = isNumberStringProps.isLog;

    const space = ' ';

    const alphabet: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); 
    const alphabetLower: string[] = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
    const fullAlphabet: string[] = [...alphabet, ...alphabetLower];

    const specialChars: string[] = [];
    for (let i: number = 32; i < 127; i++) {
        const char = String.fromCharCode(i);
        if (!/[a-zA-Z0-9\s]/.test(char)) {
            specialChars.push(char);
        }
    }
   
    const numberArray: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let isNumberString_: boolean = false;

    if (len > 0) {
        for (let i: number = 0; i < len; i++) {
            if (string[i]===space) {
                isNumberString_ = false;
                if (isLog) {
                    console.warn({
                        message: `Your string have a space at position ${i}, begin from first position !`, 
                        isNumberString: isNumberString_, 
                        string: string
                    })
                }
                break;
            } else if (fullAlphabet.includes(string[i])) {
                isNumberString_ = false;
                if (isLog) {
                    console.warn({
                        message: `Your string have a character at position ${i}, begin from first position !`, 
                        isNumberString: isNumberString_
                    })
                }
                break;
            } else if (specialChars.includes(string[i])) {
                isNumberString_ = false;
                if (isLog) {
                    console.warn({
                        message: `Your string have a special character at position ${i}, begin from first position !`, 
                        isNumberString: isNumberString_
                    })
                }
                break;
            } else if (numberArray.includes(string[i])===false) {
                isNumberString_ = false;
                if (isLog) {
                    console.warn({
                        message: `Your string have a character ( NOT is number ) at position ${i}, begin from first position. We will update in next time. Thank you !`, 
                        isNumberString: isNumberString_
                    })
                }
                break;
            } else {
                isNumberString_ = true;
            }
        }
    } else {
        console.warn({
            message: `Your string must more a character`, 
            isNumberString: isNumberString_
        })
    }

    return isNumberString_;
}

export const alias_for_string = (alias_for_string_parameter: alias_for_string_Props): alias_for_string_alias_list_Props => {
    const string: string = alias_for_string_parameter.string;
    const string_len: number = string.length;

    const alias_list: alias_for_string_alias_list_Props[] = alias_for_string_parameter.alias_list;
    const alias_list_len: number = alias_list.length;

    const skip_with_amount_of_fullChar_default = false; 
    const skip_with_amount_of_fullChar: boolean = alias_for_string_parameter.skip_with_amount_of_fullChar!==undefined ? alias_for_string_parameter.skip_with_amount_of_fullChar : skip_with_amount_of_fullChar_default;

    let alias_selected: alias_for_string_alias_list_Props = {
        alias: '',
        amount_of_char: 0
    };

    for (let i: number = 0; i < alias_list_len; i++) {
        if (alias_selected!==undefined) {
            if (string_len > alias_list[i].amount_of_char) {
                if (alias_selected.amount_of_char < alias_list[i].amount_of_char) {
                    alias_selected = alias_list[i];
                }
            } else if ((string_len===alias_list[i].amount_of_char) && !skip_with_amount_of_fullChar) {
                if (alias_selected.amount_of_char < alias_list[i].amount_of_char) {
                    alias_selected = alias_list[i];
                }
            }
        } else {
            if (string_len >= alias_list[i].amount_of_char) {
                alias_selected = alias_list[i];
            }
        }
    }

    return alias_selected;
}   

export const round_numberString = (round_numberString_parameter: round_numberString_Props): string => {
    const numberString: string = round_numberString_parameter.numberString;
    const isNumberString_: boolean = isNumberString({string: numberString});

    const toIndex_default: number = 5;
    const fromIndex_default: number = 0;
    const toIndex: number = round_numberString_parameter.toIndex ? round_numberString_parameter.toIndex : toIndex_default;
    const fromIndex: number = round_numberString_parameter.fromIndex ? round_numberString_parameter.fromIndex : fromIndex_default;
    
    const len: number = numberString.length;
    let rounded_numberString: string = '';

    if (isNumberString_) {
        if (fromIndex!==0) {
            for (let i: number = 0; i < len; i++) {
                if (i < toIndex) {
                    if (i===(toIndex-1)) {
                        const number_at_toIndex: number = Number(numberString[toIndex]);
                        let number_at_i: number = Number(numberString[i]);
                        if (number_at_toIndex >= 5) {
                            number_at_i = number_at_i + 1;
                        }
                        rounded_numberString = rounded_numberString + number_at_i.toString();
                    } else {
                        rounded_numberString = rounded_numberString + numberString[i];
                    }
                } 
            }
        } else {
            rounded_numberString = numberString;
        }
    } else {
        if (REACT_APP_NODE_ENV===ENVIR_DEVELOPMENT) {
            console.error({
                your_string: numberString,
                message: 'Your string is NOT number string !'
            })
        } else {
            console.warn({
                your_string: numberString,
                message: 'Your string is NOT number string !'
            })
        }
    }

    return rounded_numberString;
}