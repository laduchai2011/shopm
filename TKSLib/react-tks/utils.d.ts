type cluster_for_string_Props = {
    string: string;
    amount_of_a_cluster?: number;
    isStringTrim?: boolean;
};
type isNumberString_Props = {
    string: string;
    isLog?: boolean | false;
};
type alias_for_string_Props = {
    string: string;
    alias_list: alias_for_string_alias_list_Props[];
    skip_with_amount_of_fullChar?: boolean;
};
type alias_for_string_alias_list_Props = {
    alias: string;
    amount_of_char: number;
};
type round_numberString_Props = {
    numberString: string;
    fromIndex?: number;
    toIndex?: number;
};

type money_string_Props = {
    numberString: string;
    money_type: string;
    alias_list: string[];
    isLog?: boolean;
};
type return_money_string_Props = {
    numberString: string;
    isNumberString: boolean;
    clusted_string: string;
    alias_string: alias_for_string_alias_list_Props;
    rounded_numberString: string;
    clusted_rounded_numberString: string;
    full: string;
    full_with_round: string;
    money_type: string;
};

declare const moneyString: (money_string_parameter: money_string_Props) => return_money_string_Props;

declare const cluster_for_string: (cluster_for_string_parameter: cluster_for_string_Props) => string;
declare const isNumberString: (isNumberStringProps: isNumberString_Props) => boolean;
declare const alias_for_string: (alias_for_string_parameter: alias_for_string_Props) => alias_for_string_alias_list_Props;
declare const round_numberString: (round_numberString_parameter: round_numberString_Props) => string;

export { alias_for_string, cluster_for_string, isNumberString, moneyString, round_numberString };
