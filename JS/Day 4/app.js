// Looping -> The process of repeating a block of code until a specified condition is met.

// For Loop -> A control flow statement that allows code to be executed repeatedly based on a given boolean condition. It consists of three parts: initialization, condition, and increment/decrement.

// While loop -> A control flow statement that allows code to be executed repeatedly based on a given boolean condition. The loop continues as long as the condition is true.

// Do-While Loop -> A control flow statement that executes a block of code at least once, and then repeatedly executes the block as long as a specified condition is true. The condition is evaluated after the block of code is executed.

for(let i = 0; i <= 5; i++){
    console.log("Bishal Rijal")
}

// WAP to print first 10 natural number
for(let i =1; i<=10; i++){
    console.log(i)
}
console.log("------------------")
// WAP to print first 10 even number
let even = 0;
for(let i = 1; i <=10; i++){
    even += 2
    console.log(even)
}

console.log("______________")

// WAP to print first 10 odd number
let odd = 1;
for(let i = 1; i <=10; i++){
    console.log(odd)
    odd += 2;
}

console.log("___________-")
// WAP to print first 10 whole number
for(let i = 0; i<=10;  i++){
    console.log(i)
}
console.log("-----------------")
// sum of 10 natural number
let sum = 0;
for(let i = 1; i <=10; i++){
    sum +=i
}
console.log("The sum is: ", sum)


// Whie loop -> Entry control loop

// WAP to print first 10 natural number
let i = 1; // initialization
while(i <=10){ // condition
    console.log(i)
    i++; // increment
}
console.log("____________")
// Do while -> Exit control loop
let j = 1; // initialization
do{
    console.log(j)
    j++ // increment
}while(j <=10) // condition