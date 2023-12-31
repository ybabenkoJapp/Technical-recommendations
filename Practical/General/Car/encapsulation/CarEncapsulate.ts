// We can achieve encapsulation by using access modifiers in TypeScript

class CarEncapsulate {
  // Now we encapsulate data by access modifiers
  private isWorking: boolean = false;

  constructor(
    private readonly brand: string,
    private readonly model: string,
    private readonly year: number,
  ) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  // define setter for using private properties within derived classes
  protected get _brand() {
    return this.brand;
  }

  protected get _model() {
    return this.model;
  }

  protected get _year() {
    return this.year;
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
class Truck extends CarEncapsulate {
  constructor(
    brand: string,
    model: string,
    year: number,
    private readonly payloadCapacity: number,
  ) {
    super(brand, model, year);
    this.payloadCapacity = payloadCapacity;
  }

  // create this class own methods
  loadCargo() {
    console.log("Cargo has been loaded");
  }

  pullCargo() {
    console.log(
      `This ${this._brand} ${this._model} is pulling a payloadCapacity: ${this.payloadCapacity} kgs`,
    );
  }
}

// Create derived SportCar class
class SportCar extends CarEncapsulate {
  constructor(
    brand: string,
    model: string,
    year: number,
    private readonly maxSpeed: number,
  ) {
    super(brand, model, year);
    this.maxSpeed = maxSpeed;
  }

  // create this class own methods
  accelerate() {
    console.log(
      `This ${this._brand} ${this._model} is accelerating to ${this.maxSpeed} km/h`,
    );
  }
}

// Create derived ElectricCar class
class ElectricCar extends CarEncapsulate {
  constructor(
    brand: string,
    model: string,
    year: number,
    private readonly batteryCapacity: number,
  ) {
    super(brand, model, year);
    this.batteryCapacity = batteryCapacity;
  }

  // create this class own methods
  chargeBattery() {
    console.log(
      `This ${this._brand} ${this._model} has been charged up to ${this.batteryCapacity} kwh`,
    );
  }
}

// let's define variables with our classes
const regularCar: CarEncapsulate = new CarEncapsulate("Ford", "Focus 3", 2014);
const truckCar: Truck = new Truck("Volvo", "F10", 2018, 10000);
const sportCar: SportCar = new SportCar("Ford", "Mustang", 2019, 300);
const electricCar: ElectricCar = new ElectricCar("Nissan", "Leaf", 2020, 48);

// regularCar.brand <== an typescript error occurs
