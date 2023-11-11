// Create base class
class Car {
  // let's leave these properties without access modifiers for now
  isWorking: boolean = false;
  brand: string;
  model: string;
  year: number;

  constructor(brand: string, model: string, year: number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  startEngine() {
    this.isWorking = true;
    console.log(`This ${this.brand} ${this.model} engine is working`);
  }

  stopEngine() {
    this.isWorking = false;
    console.log(`This ${this.brand} ${this.model} engine stopped`);
  }
}

// Create derived Truck class
class Truck extends Car {
  // let's leave these properties without access modifiers for now
  payloadCapacity: number;

  constructor(
    brand: string,
    model: string,
    year: number,
    payloadCapacity: number,
  ) {
    super(brand, model, year);
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.payloadCapacity = payloadCapacity;
  }

  // create this class own methods
  loadCargo() {
    console.log("Cargo has been loaded");
  }

  pullCargo() {
    console.log(
      `This ${this.brand} ${this.model} is pulling a payloadCapacity: ${this.payloadCapacity} kgs`,
    );
  }
}

// Create derived SportCar class
class SportCar extends Car {
  // let's leave these properties without access modifiers for now
  maxSpeed: number;

  constructor(brand: string, model: string, year: number, maxSpeed: number) {
    super(brand, model, year);
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.maxSpeed = maxSpeed;
  }

  // create this class own methods
  accelerate() {
    console.log(
      `This ${this.brand} ${this.model} is accelerating to ${this.maxSpeed} km/h`,
    );
  }
}

// Create derived ElectricCar class
class ElectricCar extends Car {
  // let's leave these properties without access modifiers for now
  batteryCapacity: number;

  constructor(
    brand: string,
    model: string,
    year: number,
    batteryCapacity: number,
  ) {
    super(brand, model, year);
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.batteryCapacity = batteryCapacity;
  }

  // create this class own methods
  chargeBattery() {
    console.log(
      `This ${this.brand} ${this.model} has been charged up to ${this.batteryCapacity} kwh`,
    );
  }
}

// let's define variables with our classes
const regularCar: Car = new Car("Ford", "Focus 3", 2014);
const truckCar: Truck = new Truck("Volvo", "F10", 2018, 10000);
const sportCar: SportCar = new SportCar("Ford", "Mustang", 2019, 300);
const electricCar: ElectricCar = new ElectricCar("Nissan", "Leaf", 2020, 48);

// let's use inherited methods:
regularCar.startEngine();
truckCar.startEngine();
sportCar.startEngine();
electricCar.startEngine();

regularCar.stopEngine();
truckCar.stopEngine();
sportCar.stopEngine();
electricCar.stopEngine();

// let's use own methods:
// Truck class methods:
truckCar.loadCargo();
truckCar.pullCargo();

// SportCar class methods:
sportCar.accelerate();

// ElectricCar class methods:
electricCar.chargeBattery();

// As all the properties of the base and derived classes are implicit set as public
// we can easily override their values
regularCar.isWorking = false;
sportCar.brand = "bike";
truckCar.model = "iPhone X";
sportCar.year = 3005;
truckCar.payloadCapacity = 0;
sportCar.maxSpeed = 50;
electricCar.batteryCapacity = 1;
// we need to hide them from user
