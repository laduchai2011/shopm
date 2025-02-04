import { 
    isNumberString as isNumberStringFC,
    cluster_for_string,
    alias_for_string,
    round_numberString
} from '../string';

import { 
    money_string_Props,
    return_money_string_Props
} from "./type";

import { alias_for_string_alias_list_Props } from "../string/type";

const moneyString = (money_string_parameter: money_string_Props): return_money_string_Props => {
    const numberString: string = money_string_parameter.numberString;

    const money_type: string = money_string_parameter.money_type;
    const alias_list: string[] = money_string_parameter.alias_list;

    const isLog_default: boolean = false;
    const isLog: boolean = money_string_parameter.isLog!==undefined ? money_string_parameter.isLog : isLog_default;

    const isNumberString = isNumberStringFC({
        string: money_string_parameter.numberString,
        isLog: isLog 
    })

    const clusted_string = cluster_for_string({
        string: numberString,
        amount_of_a_cluster: 3
    })

    // handle alias
    const alias_array_for_string: alias_for_string_alias_list_Props[] = [];
    for (let i: number = 0; i < alias_list.length; i++) {
        alias_array_for_string.push({
            alias: alias_list[i],
            amount_of_char: 3 * (i + 1)
        })
    }
    const alias_string = alias_for_string({
        string: numberString,
        alias_list: alias_array_for_string,
        skip_with_amount_of_fullChar: true
    })

    // round numberStrng
    const amount_after_dot: number = 2;
    let fromIndex: number = 0;  // determine at first dot in clusred_string
    let toIndex: number = 0;
    const dot: string = '.';
    const clusted_string_len = clusted_string.length;
    for (let i: number = 0; i < clusted_string_len; i++) {
        if ((fromIndex===0) && (clusted_string[i]===dot)) {
            fromIndex = i;
            break;
        }
    }
    toIndex = fromIndex + amount_after_dot;

    const rounded_numberString = round_numberString({
        numberString: numberString,
        fromIndex: fromIndex,
        toIndex: toIndex
    })

    // clusted for rounded numberString
    let clusted_rounded_numberString: string = '';
    const rounded_numberString_len = rounded_numberString.length;
    for (let i: number = 0; i < rounded_numberString_len; i++) {
        if (fromIndex===i && alias_string.alias.length>0) {
            clusted_rounded_numberString = clusted_rounded_numberString + dot + rounded_numberString[i];
        } else {
            clusted_rounded_numberString = clusted_rounded_numberString + rounded_numberString[i];
        }
    }

    let return_money_string_Props: return_money_string_Props = {
        numberString: numberString,
        isNumberString: isNumberString,
        clusted_string: "",
        alias_string: alias_string,
        rounded_numberString: "",
        clusted_rounded_numberString: "",
        full: "",
        full_with_round: "",
        money_type: money_type
    }

    if (isNumberString) {
        return_money_string_Props = {
            numberString: numberString,
            isNumberString: isNumberString,
            clusted_string: clusted_string,
            alias_string: alias_string,
            rounded_numberString: rounded_numberString,
            clusted_rounded_numberString: clusted_rounded_numberString,
            full: `${clusted_string} ${money_type}`,
            full_with_round: `${clusted_rounded_numberString} ${alias_string.alias} ${money_type}`,
            money_type: money_type
        }
    }

    return return_money_string_Props;
}

export default moneyString;