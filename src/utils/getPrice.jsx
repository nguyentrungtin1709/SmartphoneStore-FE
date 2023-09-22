export const getPrice = (price) => {
    price = String(price)
    price = price.split("").reverse()
    let count = 0
    let result = []
    price.map(number => {
        if (count === 3){
            count = 1
            result.push(".", number)
        } else {
            count++
            result.push(number)
        }
    })
    return result.reverse().join("")
}
