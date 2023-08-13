// string validation
export function isVietkey(string) {
    const reunicode = /(á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẩ|ậ|ẫ|đ|é|è|ẻ|ẹ|ẽ|ê|ế|ề|ể|ệ|ễ|í|ì|ỉ|ị|ĩ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ử|ự|ữ|ó|ò|ỏ|ọ|õ|ơ|ớ|ờ|ở|ợ|ỡ|ô|ố|ồ|ổ|ộ|ỗ|ý|ỳ|ỷ|ỵ|ỹ|Á|À|Ả|Ạ|Ã|Ă|Ắ|Ằ|Ẳ|Ặ|Ẵ|Â|Ấ|Ầ|Ẩ|Ậ|Ẫ|Đ|É|È|Ẻ|Ẹ|Ẽ|Ê|Ế|Ề|Ể|Ệ|Ễ|Í|Ì|Ỉ|Ị|Ĩ|Ú|Ù|Ủ|Ụ|Ũ|Ư|Ứ|Ừ|Ử|Ự|Ữ|Ó|Ò|Ỏ|Ọ|Õ|Ơ|Ớ|Ờ|Ở|Ợ|Ỡ|Ô|Ố|Ồ|Ổ|Ộ|Ỗ|Ý|Ỳ|Ỷ|Ỵ|Ỹ)/g;
    if (string.match(reunicode)) {
        return true;
    }
    return false;
}

export function isCapital(string) {
    const reunicode = /(Q|W|E|R|T|Y|U|I|O|P|A|S|D|F|G|H|J|K|L|Z|X|C|V|B|N|M)/g;
    if (string.match(reunicode)) {
        return true;
    }
    return false;
}

export function isSpecialChar(string) {
    let bool = false;
    const charString = '`~!@#$%^&*()_-=+:;<,.>?/|"';
    for (let i = 0; i < string.length; i++) {
        if(charString.indexOf(string[i]) === -1) {
            bool = false;
        } else {
            bool = true;
            return true;
        }
    }
    return bool;
    // var reunicode = /(`|~|!|@|#|$|%|^|&|*|(|)|_|-|=|+|:|;|'|"|\|||<|,|.|>|?|/|/)/g;  
}

export function idSpace(string) {
    const reunicode = /( )/g;
    if (string.match(reunicode)) {
        return true;
    }
    return false;;
}