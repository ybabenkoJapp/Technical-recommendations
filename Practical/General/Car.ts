class Car {
  readonly maker: string;
  readonly model: string;
  readonly year: number;
  private _isWorking: boolean = false;
  private _amountFuelInTank?: number;
  private _fuelTankMaxCapacity: number = 45;

  constructor(maker: string, model: string, year: number) {
    this.maker = maker;
    this.model = model;
    this.year = year;
  }

  get amountFuelInTank(): number {
    return this._amountFuelInTank || 0;
  }

  set amountFuelInTank(value: number) {
    this._amountFuelInTank = value;
  }

  set fuelTankMaxCapacity(value: number) {
    this._fuelTankMaxCapacity = value;
  }

  get fuelTankMaxCapacity() {
    return this._fuelTankMaxCapacity;
  }

  get isWorking(): boolean {
    return this._isWorking;
  }

  set isWorking(value: boolean) {
    this._isWorking = value;
  }

  engineTurnOn() {
    this.isWorking = true;
  }
  engineTurnOff() {
    this.isWorking = false;
  }

  private checkEngineWork() {
    if (!this.isWorking) {
      console.error("the engine is turned off");
      return false;
    }
    return this.isWorking;
  }

  private checkLevelOfFuel() {
    if (this.amountFuelInTank === 0) {
      console.error("The lack of fuel in the tank please fill up fuel");
      return false;
    }
    if (this.amountFuelInTank && this.amountFuelInTank <= 5) {
      console.warn(
        "Low level of the fuel in the tank, please drive to the nearest petrol station",
      );
      return false;
    }
    return true;
  }

  protected checkAllSystems() {
    return this.checkEngineWork() && this.checkLevelOfFuel();
  }

  drive() {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not drive now please check if there fuel in trunk or the engine is turned on`;
    }
    return `${this.maker} ${this.model} is driving now`;
  }

  park() {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not park now please check if there fuel in trunk or the engine is turned on`;
    }

    return `${this.maker} ${this.model} is parked now`;
  }

  fuelInTank() {
    return `${this.amountFuelInTank || 0} l`;
  }

  refuelTheVehicle(fuel: number) {
    if (fuel >= this.fuelTankMaxCapacity) {
      fuel = this.fuelTankMaxCapacity;
    }
    if (fuel < 0) {
      fuel = 0;
    }
    this.amountFuelInTank = fuel;
    console.log("the car tank is refueled: " + this.amountFuelInTank + "l");
    return `${this.amountFuelInTank || 0}L`;
  }
}

class SerialCar extends Car {
  private readonly _numberOfPassengers: number;
  private _luggageVolume?: number;
  constructor(
    maker: string,
    model: string,
    year: number,
    fuelTankMaxCapacity: number,
    numberOfPassengers: number,
  ) {
    super(maker, model, year);
    this.fuelTankMaxCapacity = fuelTankMaxCapacity;
    this._numberOfPassengers = numberOfPassengers;
  }

  carLuggageVolume(): number | string {
    return `${this.maker} ${this.model} can transport of the ${this._luggageVolume} sm3 of luggage`;
  }
  set luggageVolume(value: number) {
    this._luggageVolume = value;
  }

  get numberOfPassengers() {
    return `${this.maker} ${this.model} can transport ${this._numberOfPassengers} passengers`;
  }
}

class Truck extends Car {
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

  pullCargo() {
    console.log(`Pulling cargo ${this.payloadCapacity} kg`);
  }
}

class SportCar extends Car {
  readonly maxSpeed: number = 400;

  constructor(maker: string, model: string, year: number, maxSpeed: number) {
    super(maker, model, year);
    this.maxSpeed = maxSpeed;
  }
  accelerate() {
    this.useTurboBoost();
    return `${this.maker} ${this.model} is accelerating to ${this.maxSpeed} kmh`;
  }
  protected useTurboBoost() {
    console.log(`Turbo Boost is used`);
  }
}

class ElectricCar extends Car {
  private readonly electricBatteryCapacity: number;
  private _batteryLevel?: number = 50;

  constructor(
    maker: string,
    model: string,
    year: number,
    batteryCapacity: number,
  ) {
    super(maker, model, year);
    this.electricBatteryCapacity = batteryCapacity;
  }

  get batteryLevel() {
    // console.log("electric car battery level is: ", this._batteryLevel + "%");
    return this._batteryLevel;
  }

  set batteryLevel(per) {
    this._batteryLevel = per;
  }

  private checkBatteryChargeVolume() {
    if (!this._batteryLevel) {
      console.error("You should battery charge");
      return false;
    }
    if (this._batteryLevel <= 5) {
      console.warn("Low battery please charge");
      return false;
    }
    return true;
  }

  protected checkAllSystems() {
    if (!this.isWorking) {
      return false;
    }
    return this.isWorking && this.checkBatteryChargeVolume();
  }
  drive() {
    if (!this.checkAllSystems()) {
      return `${this.maker} ${this.model} can not drive now please check battery charge or the engine is turned on`;
    }
    return `${this.maker} ${this.model} is driving now`;
  }
  refuelTheVehicle(power?: number) {
    if (!power || !this.batteryLevel) {
      return `There is not power the battery level remains: ${this.batteryLevel}%`;
    }
    if (power >= 100 || power > this.batteryLevel) {
      this.batteryLevel = 100;
      return `The battery is charged and level is ${this.batteryLevel}% there no need to charge`;
    }
    this.batteryLevel = power;
    return `this electric battery charged and the capacity now is ${this.batteryLevel}%`;
  }
}

const ford = new SerialCar("Ford", "Focus", 2014, 45, 4);
// ford.engineTurnOn();
// console.log(ford.drive());
const daf = new Truck("Daf", "M1", 2022, 2000);
const volvo = new Truck("Volvo", "V1", 2012, 1500);
const porsche = new SportCar("Porsche", "911", 2021, 350);
const tesla = new ElectricCar("Tesla", "Model 3", 2020, 45);
console.log(ford.refuelTheVehicle(40));
console.log(tesla.refuelTheVehicle(90));

// porsche.accelerate();
// console.log(tesla.drive());

// daf.engineTurnOn();
// volvo.engineTurnOn();
// tesla.engineTurnOn();

// let dafStatus = daf.checkEngine();
// let volvoStatus = volvo.checkEngine();
// let teslaStatus = tesla.checkEngine();
// console.log(daf.drive());
// console.log(
//   "dafStatus",
//   dafStatus,
//   "volvoStatus",
//   volvoStatus,
//   "teslaStatus",
//   teslaStatus,
// );

// daf.pullCargo();
// volvo.pullCargo();
// tesla.accelerate();
//
// daf.engineTurnOff();
// volvo.engineTurnOff();
// tesla.engineTurnOff();
//
// dafStatus = daf.checkEngine();
// volvoStatus = volvo.checkEngine();
// teslaStatus = tesla.checkEngine();

// console.log(
//   "dafStatus",
//   dafStatus,
//   "volvoStatus",
//   volvoStatus,
//   "teslaStatus",
//   teslaStatus,
// );
