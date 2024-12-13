function handleNext <T>(...args: ((data: T, next: () => void) => void)[]): void {
    let data: T;
    let gen: Generator<void, void, unknown>;

    function next() {   
        setTimeout(() => {
            gen.next();
        }, 0)
    }
    
    function* generator(): Generator<void, void, unknown> {
        for (let arg of args) {
            yield arg(data, next);
        };
    }

    gen = generator();
    gen.next();
}

export default handleNext