// Let's implement polymorphism by using interfaces

// define interfaces
interface Vehicle {
  startEngine(): void;

  stopEngine(): void;
}

interface InfoProvider {
  getInfo(): string;
}

interface ElectricStation {
  chargeBattery(): void;
}

interface CargoService {
  loadCargo(): void;

  pullCargo(): void;
}

// define an abstract class
abstract class Action {
  abstract performAction(): void;
}

class CarPolymorph implements Vehicle, Action, InfoProvider {
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

  // define a method from an abstract class Action
  performAction(): void {
    console.log("Car is performing a general action");
  }

  // define a method from interface InfoProvider
  getInfo(): string {
    return `Car Info: ${this._year} ${this._brand} ${this._model}`;
  }
}

// Create derived Truck class
class Truck extends CarPolymorph implements CargoService {
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

  // override the method from an abstract class Action
  performAction(): void {
    console.log("Truck is pulling cargo");
  }

  // override a method from interface InfoProvider
  getInfo(): string {
    return `Truck Info: ${this._year} ${this._brand} ${this._model}`;
  }
}

// Create derived SportCar class
class SportCar extends CarPolymorph {
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

  // override the method from an abstract class Action
  performAction(): void {
    console.log("Sport car is charging the battery");
  }

  // override the method from interface InfoProvider
  getInfo(): string {
    return `Sport car Info: ${this._year} ${this._brand} ${this._model}`;
  }
}

// Create derived ElectricCar class
class ElectricCar extends CarPolymorph implements ElectricStation {
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

  // override the method from an abstract class Action
  performAction(): void {
    console.log("Electric car is charging the battery");
  }

  // override the method from interface InfoProvider
  getInfo(): string {
    return `Electric car Info: ${this._year} ${this._brand} ${this._model}`;
  }
}

class Motorboat implements Vehicle, Action, InfoProvider {
  startEngine(): void {
    console.log("Motorboat engine started pedaling");
  }

  stopEngine(): void {
    console.log("Motorboat engine stopped pedaling");
  }

  // implement the abstract method
  performAction(): void {
    console.log("Motorboat is riding");
  }

  // define a method from interface InfoProvider
  getInfo(): string {
    return "Motorboat Info: No additional information";
  }
}

// let's define functions for using polymorphism via interfaces
function operateVehicle(vehicle: Vehicle) {
  console.log("---");
  vehicle.startEngine();
  vehicle.stopEngine();
  console.log("---");
}

function operateVehiclesWithActionAndInfo(vehicles: (Vehicle & Action)[]) {
  for (const vehicle of vehicles) {
    operateVehicle(vehicle);
    vehicle.performAction();
    console.log("---");
  }
}

function getComputedVehicleInformation(infoProviders: InfoProvider[]) {
  for (const infoProvider of infoProviders) {
    console.log(infoProvider.getInfo());
    console.log("---");
  }
}

function cargoServiceController(service: CargoService) {
  service.loadCargo();
  service.pullCargo();
}

// let's define variables with our classes
const regularCar: CarPolymorph = new CarPolymorph("Ford", "Focus 3", 2014);
const truckCar: Truck = new Truck("Volvo", "F10", 2018, 10000);
const sportCar: SportCar = new SportCar("Ford", "Mustang", 2019, 300);
const electricCar: ElectricCar = new ElectricCar("Nissan", "Leaf", 2020, 48);
const motorboat: Motorboat = new Motorboat();

// operateVehicle(truckCar);
// operateVehiclesWithActionAndInfo([regularCar, truckCar, sportCar, electricCar, motorboat]);
// getComputedVehicleInformation([
//   regularCar,
//   truckCar,
//   sportCar,
//   electricCar,
//   motorboat,
// ]);

cargoServiceController(truckCar);
