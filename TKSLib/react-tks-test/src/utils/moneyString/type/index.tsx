import { alias_for_string_alias_list_Props } from "src/utils/string/type"

export type money_string_Props = {
    numberString: string,
    money_type: string,
    alias_list: string[],
    isLog?: boolean
}

export type return_money_string_Props = {
    numberString: string,
    isNumberString: boolean,
    clusted_string: string,
    alias_string: alias_for_string_alias_list_Props,
    rounded_numberString: string,
    clusted_rounded_numberString: string,
    full: string,
    full_with_round: string
    money_type: string
}