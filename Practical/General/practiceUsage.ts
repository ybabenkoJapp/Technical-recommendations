// Examples of the apply function method usage

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
const greetingByCall = greet.call(person, "Hi there", "What's up?");
// console.log("Called greet: ", greetingByCall);
// Using apply() with arrays
let arr = [2, 3, 4];
let el = [9, 6, 4];
arr.push.apply(arr, el);
// console.log("arr: ", arr);

// 2. Take another function
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

// console.log("Result of the borrowed function: ", result);

// Examples of the call function method usage
// 1. Simply use the call method
function add(x: number, y: number) {
  return x + y;
}

const sum = add.call(null, 10, 49);

// console.log("Returned sum result: ", sum);

// const thisContext = { greeting: "Hi" };
//
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