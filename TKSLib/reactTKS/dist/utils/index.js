export const handleCutPXInString = (s) => {
    const arr = ['p', 'x'];
    let s_new = '';
    for (let i = 0; i < s.length; i++) {
        if (arr.indexOf(s[i]) === -1) {
            s_new = `${s_new}${s[i]}`;
        }
    }
    return s_new.trim();
};
