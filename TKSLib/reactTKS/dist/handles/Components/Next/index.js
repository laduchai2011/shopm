function handleNext(...args) {
    let data = undefined;
    let gen;
    function next() {
        setTimeout(() => {
            gen.next();
        }, 0);
    }
    function* generator() {
        for (let arg of args) {
            yield arg(data, next);
        }
        ;
    }
    gen = generator();
    gen.next();
}
export default handleNext;
