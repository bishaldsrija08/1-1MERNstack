// const name = "Bishal Rijla"
// const age = 25
// const country = "Nepal"
// const profession = "Software Engineer"


const person = {
    name: "Bishal Rijla",
    age: 25,
    country: "Nepal",
    profession: "Software Engineer"
}
person.age = 26
person.hobbies = ["Coding", "Traveling", "Cooking"]
person.color = "Blue"

console.log(person)

console.log(person["name"])


// loop in object

for (let key in person) {
    console.log(`${key}: ${person[key]}`)
}

// length of object
console.log(Object.keys(person).length)

// Leterals = `

fName = "Bishal"
lName = "Rijla"

console.log(`${fName} ${lName} is a good boy.`)
console.log(fName + " " + lName + " is a good boy.")