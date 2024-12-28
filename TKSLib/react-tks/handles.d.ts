declare function handleNext<T>(...args: ((data: T | undefined, next: () => void) => void)[]): void;

export { handleNext as Next };
