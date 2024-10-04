export const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

const dotCount = (string) => {
    let dotCount = 0;
    for (let i = 0; i < string.length; i++) {
        if (['.'].includes(string[i])) {
            dotCount++;
        }
    }

    return dotCount;
}

export const isFloat = (string) => {
    const s = string.trim();
    const intArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    let isFloat = false;

    if (s.length > 0 && s[0]!=='.' && dotCount(s)===1) {
        for (let i = 0; i < s.length; i++) {
            if (intArr.includes(s[i])) {
                isFloat = true;
            } else {
                isFloat = false;
                break;
            }
        }
    }
    
    return isFloat;
}

export const isInteger = (string) => {
    const s = string.trim();
    const intArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let isInteger = false;

    if (s.length > 0 && dotCount(s)===0) {
        for (let i = 0; i < s.length; i++) {
            if (intArr.includes(s[i])) {
                isInteger = true;
            } else {
                isInteger = false;
                break;
            }
        }
    }
    
    return isInteger;
}