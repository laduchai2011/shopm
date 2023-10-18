const p = new Promise((resolve, reject) => {
    reject(1)
})

console.log('-------1111--------')

const ft = async () => {
    console.log('---------------')
    try {
        const r = await p;
        console.log('r', r)
    } catch (error) {
        console.error('error', error)
    }
    // const r = await p;
    // console.log('r', r)
}

ft();