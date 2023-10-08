// Examples of the APPLY function method usage

// 1. Simple using apply method
function greet(
  this: { [key: string]: string },
  greeting: string,
  message: string,
) {
  return `${greeting} ${this.name}! ${message}`;
}

const person = { name: "Jack", surname: "Doe" };

const resGreeting = greet.apply(person, ["Hi", "How are you doing?"]);
// console.log("Applied greet: ", resGreeting);

// 2. Using apply() with arrays
let arr = [2, 3, 4];
let el = [9, 6, 4];
arr.push.apply(arr, el);
// console.log("arr: ", arr);

// 3. Pick up another function
const macbook = {
  name: "Macbook",
  isWork: false,
  turnOn() {
    this.isWork = true;
    return `The ${this.name} is turned on`;
  },
  turnOff() {
    this.isWork = false;
    return `The ${this.name} is turned off`;
  },
};

const dellPowerEdge = {
  name: "Dell PowerEdge T30",
  isWork: false,
};

const result = macbook.turnOn.apply(dellPowerEdge);

function isOdd(number: number) {
  return number % 2;
}

function getOddNumbers() {
  //@ts-ignore
  return Array.prototype.filter.apply(arguments, [isOdd]);
}
//@ts-ignore
let results = getOddNumbers(10, 1, 3, 4, 8, 9);
console.log(results);

// console.log("Result of the borrowed function: ", result);

// Examples of the CALL function method usage
// 1. Simply use the call method
function add(x: number, y: number) {
  return x + y;
}

const sum = add.call(null, 10, 49);

// console.log("Returned sum result: ", sum);

const greetOption = {
  greeting: "Hello",
};

var greeting = 'Hi there bro';

function say(this: { greeting?: string } | void, name: string) {
  const actualGreeting = (this && this.greeting) || greeting;
  console.log(`${actualGreeting} ${name}!`);
  return `The greeting is: ${actualGreeting} ${name}!`
}

say('Tim');
say.call(greetOption, 'Sam');


// 2. Pick up another function
const greetingByCall = greet.call(person, "Hi there", "What's up?");
// console.log("Called greet: ", greetingByCall);
function reducer() {
  // @ts-ignore
  return Array.prototype.reduce.call(arguments, add);
}
// @ts-ignore
console.log(reducer(1,2,3,45,6));

// 3. Use call for utility functions
const myArray: string[] = [];
const push = Array.prototype.push;
push.call(myArray, 'one', 'two', 'three', 'four');

// console.log(myArray);

// 4. Chain constructors for an object
function Product(this: any, title: string, price: number) {
  this.title = title;
  this.price = price;
}


function Food(this: any, title: string, price: number, category: string) {
  Product.call(this, title, price);
  this.category = category;
}
/// @ts-ignore
const cheese = new Food('dorblue', 20, 'cheese');

console.log(cheese);