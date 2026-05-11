// // Taking input from the user
// const name = prompt("Please enter your name:");

// console.log(name)
age = 17

if(age>18){
    console.log("You are eligible to vote")
}else{
    console.log("You are not eligible to vote")
}

// WAP to find the largest of two numbers.
const num1 = 100
const num2 = 20
if (num1 > num2) {
    console.log("num1 is the largest")
} else {
    console.log("num2 is the largest")
}

// Using ternary operator
// condition ? expression1 : expression2

let largest = (num1>num2)? "num1 is the largest" : "num2 is the largest"
console.log(largest)

// WAP to find the largest of three numbers.
const a = 10
const b = 20
const c = 15

if (a > b && a > c) {
    console.log("a is the largest")
} else if (b > a && b > c) {
    console.log("b is the largest")
} else {
    console.log("c is the largest")
}


// WAP to check whether a number is positive, negative or zero.
const number = -5

if (number == 0) {
    console.log("The number is zero")
} else if (number > 0) {
    console.log("The number is positive")
} else {
    console.log("The number is negative")
}