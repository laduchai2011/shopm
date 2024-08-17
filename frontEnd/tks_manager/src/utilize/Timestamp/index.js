export const Timestamp = (createdAt) => {
    const timeCurrent = new Date();
    const timeCreate = new  Date(createdAt);
    const calculation = ((timeCurrent - timeCreate)/1000)/60;

    if (calculation < 60) {
        return `${Math.floor(calculation)} minute`;
    } else if (calculation < 60*24) {
        return `${Math.floor(calculation/24)} hour`;
    } else if (calculation < 60*24*30) {
        return `${Math.floor(calculation/(24*30))} day`;
    } else if (calculation < 60*24*30*12) {
        return `${Math.floor(calculation/(24*30*12))} month`;
    } else {
        return createdAt;
    }
}