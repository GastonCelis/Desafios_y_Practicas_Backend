const getRandomNumber = require("./randomNumber")

process.on("message", cant => {
    const numbers = []
    const results = {}

    for (let i = 0; i < cant; i++) {
        const randomNumber = getRandomNumber(1, 1001)
        numbers.push(randomNumber)
    }

    numbers.forEach( number =>{
        results[number] ? results[number]++ : results[number] = 1 
    })

    process.send(results)
    process.exit()
})

process.send("completed")