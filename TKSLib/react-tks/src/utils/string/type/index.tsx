export type cluster_for_string_Props = {
    string: string, 
    amount_of_a_cluster?: number,
    isStringTrim?: boolean
}

export type isNumberString_Props = {
    string: string, 
    isLog?: boolean | false,
}

export type alias_for_string_Props = {
    string: string,
    alias_list: alias_for_string_alias_list_Props[],
    skip_with_amount_of_fullChar?: boolean
}
export type alias_for_string_alias_list_Props = {
    alias: string,
    amount_of_char: number
}

export type round_numberString_Props = {
    numberString: string,
    fromIndex?: number,
    toIndex?: number
}