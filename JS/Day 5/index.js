// name1="Sajal"
// name2="Chelson"
// name3="Bishal"

const names = ["Sajal", "Chelson", "Bishal"]
// names[3] = "Sujan"
// names[1] = "Rishav"
// console.log(names[names.length - 1])
// console.log(names.sort())
// console.log(names.join("_"))
// console.log(names.pop())
names.unshift("Hello")
// console.log(names.shift())
console.log(names)
// console.log(names[0])
// console.log(names[1])
// console.log(names[2])

const cars = []
// console.log(cars.length)
cars[0] = "BMW"
cars[1] = "Audi"
cars[2] = "Mercedes"
cars.push("Lexus")
console.log(cars)
// console.log(cars.length)

cars.forEach((car) => {
    console.log(car)
})

console.log(cars.at(2))


const hand = ["A", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog."]
const sentence = hand.join(" ")
console.log(sentence)
console.log(Array.isArray(hand))


const myGirls = ["Cecilie", "Lone"];
const myBoys = ["Emil", "Tobias", "Linus"];

const myChilderen = myBoys.concat(myGirls, hand)
console.log(myChilderen)