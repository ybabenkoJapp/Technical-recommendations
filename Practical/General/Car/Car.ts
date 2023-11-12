interface FuelStation {
  amountFuelInTank: number;

  refuel(fuel: number): void;
}

interface EnginStatusWork {
  startEngine(): string;

  stopEngine(): string;

  engineStatus(): string;
}

interface ChargeStation {
  batteryLevel: number;

  batteryCharge(power: number): void;
}

interface Drivable {
  drive(): string;
}

interface Parkable {
  park(): string;
}

abstract class Car implements Drivable, Parkable, EnginStatusWork {
  protected isWorking: boolean = false;

  protected constructor(
    readonly maker: string,
    readonly model: string,
    readonly year: number,
  ) {}

  abstract checkAllSystems(): boolean;

  drive(): string {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not drive now. Please check if there is fuel in the trunk or if the engine is turned on.`;
    }
    return `${this.maker} ${this.model} is driving now`;
  }

  park(): string {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not park now. Please check if there is fuel in the trunk or if the engine is turned on.`;
    }

    return `${this.maker} ${this.model} is parked now`;
  }

  startEngine() {
    this.isWorking = true;
    return `${this.maker} ${this.model} engine is working`;
  }

  stopEngine() {
    this.isWorking = false;
    return `${this.maker} ${this.model} engine has been stopped`;
  }

  engineStatus() {
    return this.isWorking
      ? `${this.maker} ${this.model} engine is working`
      : `${this.maker} ${this.model} engine is off`;
  }
}

class RegularCar extends Car implements FuelStation {
  constructor(
    maker: string,
    model: string,
    year: number,
    private fuelTankMaxCapacity: number,
  ) {
    super(maker, model, year);
  }

  private _amountFuelInTank: number = 0;

  get amountFuelInTank(): number {
    return this._amountFuelInTank || 0;
  }

  checkAllSystems(): boolean {
    return this.isWorking && this.checkLevelOfFuel();
  }

  refuel(fuel: number): void {
    if (fuel >= this.fuelTankMaxCapacity) {
      fuel = this.fuelTankMaxCapacity;
    }
    if (fuel < 0) {
      fuel = 0;
    }
    this._amountFuelInTank = fuel;
    console.log("The car tank is refueled: " + this._amountFuelInTank + "L");
  }

  private checkLevelOfFuel(): boolean {
    if (this._amountFuelInTank === 0) {
      console.error("The lack of fuel in the tank. Please fill up fuel.");
      return false;
    }
    if (this._amountFuelInTank && this._amountFuelInTank <= 5) {
      console.warn(
        "Low level of fuel in the tank. Please drive to the nearest petrol station.",
      );
      return false;
    }
    return true;
  }
}

class Truck extends Car implements FuelStation {
  readonly payloadCapacity: number;

  constructor(
    maker: string,
    model: string,
    year: number,
    payloadCapacity: number,
  ) {
    super(maker, model, year);
    this.payloadCapacity = payloadCapacity;
  }

  private _amountFuelInTank: number = 0;

  get amountFuelInTank(): number {
    return this._amountFuelInTank || 0;
  }

  checkAllSystems(): boolean {
    return this.isWorking && this.payloadCapacity != 0;
  }

  refuel(fuel: number): void {
    if (fuel >= this.amountFuelInTank) {
      fuel = this.amountFuelInTank;
    }
    if (fuel < 0) {
      fuel = 0;
    }
    this._amountFuelInTank = fuel;
    console.log("The truck tank is refueled: " + this._amountFuelInTank + "L");
  }
}

class SportCar extends Car implements FuelStation {
  readonly maxSpeed: number = 400;

  constructor(
    maker: string,
    model: string,
    year: number,
    private fuelTankMaxCapacity: number,
    maxSpeed: number,
  ) {
    super(maker, model, year);
    this.maxSpeed = maxSpeed;
  }

  private _amountFuelInTank: number = 0;

  get amountFuelInTank(): number {
    return this._amountFuelInTank || 0;
  }

  checkAllSystems(): boolean {
    return this.isWorking && this.amountFuelInTank > 0;
  }

  accelerate() {
    this.useTurboBoost();
    return `${this.maker} ${this.model} is accelerating to ${this.maxSpeed} kmh`;
  }

  refuel(fuel: number): void {
    if (fuel >= this.fuelTankMaxCapacity) {
      fuel = this.fuelTankMaxCapacity;
    }
    if (fuel < 0) {
      fuel = 0;
    }
    this._amountFuelInTank = fuel;
    console.log(
      "The sport car tank is refueled: " + this._amountFuelInTank + "L",
    );
  }

  protected useTurboBoost() {
    console.log(`Turbo Boost is used`);
  }
}

class ElectricCar extends Car implements ChargeStation {
  constructor(
    maker: string,
    model: string,
    year: number,
    private electricBatteryCapacity: number,
  ) {
    super(maker, model, year);
    this.electricBatteryCapacity = electricBatteryCapacity;
  }

  private _batteryLevel: number = 50;

  get batteryLevel(): number {
    return this._batteryLevel;
  }

  set batteryLevel(value: number) {
    this._batteryLevel = value;
  }

  checkAllSystems(): boolean {
    return this.isWorking && this.checkBatteryChargeVolume();
  }

  drive(): string {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not drive now. Please check battery charge or if the engine is turned on.`;
    }
    return `${this.maker} ${this.model} is driving now`;
  }

  park(): string {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not park now. Please check battery charge or if the engine is turned on.`;
    }

    return `${this.maker} ${this.model} is parked now`;
  }

  batteryCharge(power: number): void {
    if (!power || !this._batteryLevel) {
      console.log(
        `There is no power. The battery level remains: ${this._batteryLevel}%`,
      );
      return;
    }
    if (power >= 100 || power > this._batteryLevel) {
      this._batteryLevel = 100;
      console.log(
        `The battery is charged and the level is ${this._batteryLevel}%. There is no need to charge.`,
      );
      return;
    }
    this._batteryLevel = power;
    console.log(
      `The electric battery is charged, and the capacity now is ${this._batteryLevel}%`,
    );
  }

  private checkBatteryChargeVolume(): boolean {
    if (!this._batteryLevel) {
      console.error("You should charge the battery");
      return false;
    }
    if (this._batteryLevel <= 5) {
      console.warn("Low battery please charge");
      return false;
    }
    return true;
  }
}

const ford = new RegularCar("Ford", "Focus", 2014, 45);
const daf = new Truck("Daf", "M1", 2022, 12000);
const volvo = new Truck("Volvo", "F-10", 2012, 10000);
const porsche = new SportCar("Porsche", "911", 2021, 50, 350);
const nissan = new ElectricCar("Nissan", "leaf", 2020, 45);
const volkswagen = new ElectricCar("Volkswagen", "e-Golf", 2020, 50);

const vehiclesArray = [ford, daf, volvo, porsche, nissan];
const electricVehiclesArray = [nissan, volkswagen];

function startAllEngines(vehicles: Car[]) {
  for (const vehicle of vehicles) {
    console.log("---");
    console.log(vehicle.engineStatus());
    console.log("---");
    if (!!vehicle.stopEngine()) {
      console.log(vehicle.startEngine());
    }
  }
}

function stopAllEngines(vehicles: Car[]) {
  for (const vehicle of vehicles) {
    console.log("---");
    console.log(vehicle.engineStatus());
    console.log("---");
    if (!!vehicle.startEngine()) {
      console.log(vehicle.stopEngine());
    }
  }
}

startAllEngines(vehiclesArray);
stopAllEngines(vehiclesArray);

function electricCar(cars: ElectricCar[]) {
  for (const car of cars) {
    console.log(car.batteryLevel);
    if (car.batteryLevel <= 50) {
      car.batteryCharge(100);
    }
  }
}

electricCar(electricVehiclesArray);
