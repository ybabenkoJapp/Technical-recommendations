function test<T>(arg: T): T {
  return arg;
}

test(true);
test("string");

// Type alias
type AnyAble<Type> = { key: Type };

const test1: AnyAble<number> = { key: 5 };
console.log(test1);

class TestGenericClass<Type> {
  private _items: Array<Type> = [];

  add(item: Type) {
    this._items.push(item);
  }

  remove(item: Type) {
    const index = this._items.findIndex((i) => i === item);
    this._items.slice(index, 1);
  }

  get items() {
    console.log(this._items);
    return this._items;
  }
}

const numberType = new TestGenericClass<number>();

numberType.add(1);
numberType.items;

const stringType = new TestGenericClass<string>();

stringType.add("my string");
stringType.items;

function getId<CustomType>(arg: CustomType): CustomType {
  return arg;
}

let id = getId(true);

function genericForArray<ArrayType>(arg: ArrayType[]) {
  return arg[arg.length - 1];
}

function genericError<T>(arg: T[]): T {
  return arg[arg.length - 1];
}

let customArray1 = genericForArray([1, 2, 3, 4]);
let customArray2 = genericForArray(["1", "2", "3", "4"]);

interface Person<Type> {
  [key: string]: Type;
}

let person: Person<number> = {
  age: 5,
};
console.log(person.age);

interface Blok {
  _uid: string;
  component: string;
}

interface SBImageAsset extends Blok {
  assets: {
    id: string;
    filename: string;
    alt: string;
  };
}

interface Figure extends Blok {
  components: SBImageAsset[];
}

function getImage<T extends Figure>(arg: T) {
  return arg.components;
}

const figureProp = {
  _uid: "2456",
  component: "figure",
  components: [
    {
      _uid: "23334",
      assets: { id: "", alt: "", filename: "src to image" },
      component: "image",
    },
  ],
};

const image1 = getImage(figureProp);
// const image2 = getImage({
//     _uid: "2456", component: "paragraph", components: [{text: "some text"}],
// });

function addAge<T extends { name: string }>(obj: T) {
  let age = 40;
  return { ...obj, age };
}

let docOne = addAge({ name: "Amara", color: "red" });

// let docTwo = addAge({series: "killing eve", color: "red"});

interface LengthOfTheArgument {
  length: number;
}

function createPair<Type1, Type2>(arg1: Type1, arg2: Type2): [Type1, Type2] {
  return [arg1, arg2];
}

const getPair = createPair("isAdmin", false);
const getPai2 = createPair(5, "false");

class NamedValue<Type> {
  private _value: Type | undefined;

  constructor(private name: string) {}

  setValue(val: Type) {
    this._value = val;
  }

  getValue(): Type | undefined {
    return this._value;
  }

  toString() {
    return `${this.name}: ${this.getValue()}`;
  }
}

const testGenericClass = new NamedValue<number>("testGenericClassName");
testGenericClass.setValue(100);
testGenericClass.toString();

type NullAble<Type> = Type | null;

let canBeNullValue: NullAble<number> = 5;

canBeNullValue = null;

// Generic as Type Aliases

type Wrapper<Type> = { content: Type[] };

const myComponentType: Wrapper<Figure> = {
  content: [figureProp, figureProp, figureProp],
};

interface IWrapper<Type> {
  content: Type[];
}

let myComponentInterface: IWrapper<Figure>;
myComponentInterface = {
  content: [figureProp],
};

const identityFuncSpecificType = (x: string): string => x;

let specificType1 = identityFuncSpecificType("hi");
// let specificType2 = identityFuncSpecificType(true)

const identityFuncAnyType = (x: any): any => x;

let anyType1 = identityFuncAnyType(true);
let anyType2 = identityFuncAnyType(5);

// const identityFuncSpecificType = (x: string): string => x;

interface GenericIdentityFunc {
  <T>(x: T): T;
}

const identityFunc: GenericIdentityFunc = function (x) {
  return x;
};

identityFunc(true);
identityFunc<number>(5);
identityFunc<[]>([]);

const getValueLength = <Type>(x: Type[] | string): number => x.length;

getValueLength([1, 2, 3]);
getValueLength("string");

interface LengthConstraint {
  length: number;
}

function f<T extends LengthConstraint>(x: T): T {
  console.log(x.length);
  return x;
}

f([1, 2, 3]);
f("string");
f({ length: 5 });
// f(false)
// f({})

const myObj = {
  test: "myTest",
  name: "testName",
  age: "3 day",
  cached: false,
} as const;

type myObjType = keyof typeof myObj;

type t = (typeof myObj)[myObjType];

const names = {
  John: "Doe",
  Sam: "Colt",
};

function getSecondName<T, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

getSecondName(names, "John");

interface GenericIdentityFn<Type> {
  <Type>(arg: Type): Type;
}

function identity<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: GenericIdentityFn<boolean> = identity;

// TODO Implement type with generic
// TODO Implement interface with generic
// TODO Implement constraint generic

function myGenericTypeConstraint<Type1, Type2 extends keyof Type1>(
  arg1: Type1,
  arg2: Type2,
) {
  return arg1[arg2];
}

let myObjForTest = { a: 1, b: 2, c: 3, d: 4 };

// myGenericTypeConstraint(myObjForTest, 'e') // make an error

class Point<Type> {
  x: Type;
  y: Type;
  constructor(x: Type, y: Type) {
    this.x = x;
    this.y = y;
  }
  set _x(val: Type) {
    this.x = val
  }
}

const pt = new Point<number>(3, 4);

pt._x = 200

interface Pingable {
  ping(): void
}

class Sonar implements Pingable, LengthConstraint {
  length!: number
  ping() {}
}

class Boll implements Sonar {
  length!: number
  ping() {
  }
}

class Base {
  private static greeting = 'Special greeting from the base class'
  static sayGreeting() {
    console.log(Base.greeting)
  }
  greet() {
    console.log("Hello, world!");
  }
}

class Derived extends Base {
  greet(name?: string) {
    if (name === undefined) {
      super.greet();
    } else {
      console.log(`Hello, ${name.toUpperCase()}`);
    }
  }
}

Base.sayGreeting()