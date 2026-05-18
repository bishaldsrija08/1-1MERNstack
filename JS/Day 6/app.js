function add(a,b){ // Define
    console.log(a+b);
}

add(5,10); //Call
add(20,30); //Call



/*
function functionName(parameters){
    //code to be executed
}
functionName(arguments);
*/

function printName(name){ // Function Definition
    console.log(`My name is ${name}.`) // BOS
}

printName("Bishal") // Function Call
printName("Sita") // Function Call
printName("Sajal") // Function Call
printName("Chelson") // Function Call


function addTwoNumbers(num1,num2){
    return num1 + num2;
}

result = addTwoNumbers(5,10); // Function Call
console.log(result)

result2= addTwoNumbers(20,30);
console.log(result2);

//  Arrow functions

/*
Syntax: 

const functionName = (parameters) => {
    //code to be executed
}

*/

const addTwoNumbersArrow = (num1, num2)=>{
    return num1 + num2;
}

const result3 = addTwoNumbersArrow(15,25);
console.log(result3);

// Call back functions are those functions that are passed as arguments to other functions and are executed after some operation is completed. Ex:


// HOF - Higher Order Functions are those functions that can take other functions as arguments or return functions as their output. Ex:


arr = ["HTML", "CSS", "JavaScript", "Python", "Java"];


arr.forEach(element => {
    console.log(element);
});