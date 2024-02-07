
function fc1 (data, next) {
    data.fc1_status = true;
    console.log('1', data);
    next();
}
function fc2 (data, next) {
    data.fc2_status = true;
    console.log('2', data);
    next();
}
function fc3 (data, next) {
    data.fc3_status = true;
    console.log('3', data);
    next();
}

function handleCaseRecordCondition(...args) {
    let data = {};
    let gen;

    function next() {
        setTimeout(() => {
            console.log('next')
            gen.next();
        }, 0)
    }
    
    function* generator() {
        for (let arg of args) {
            arg(data, next);
            yield;
        };
    }

    gen = generator();
    gen.next();
}

handleCaseRecordCondition(fc1, fc2, fc3)