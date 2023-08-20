const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* incrementAsync() {
    yield delay(3000)
    yield 1
}

const incrementAsync_m = incrementAsync();
console.log(incrementAsync_m.next())
console.log(incrementAsync_m.next())