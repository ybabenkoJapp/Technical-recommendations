// class Car {
//     engine: string; // hybrid, electric, ICEngine
//     fuel: string; // diesel, petrol, electricity, gas,
//     // hybrid car uses more than one means of energy, combining a petrol or diesel engine with an electric motor
//     manufacturer: string;
//     model: string;
//     type: string; // sedan, hatchback, coupe, convertible, sports car, station wagon, SUV, minivan, crossover, Muscle car, Microcar, Sports sedan,
//     win: string;
//     year: string;
//     modification: string;
//     wheels: number;
//     transmission: string; // manual, automatic, variator
//     drivingWheelSide: string // right, left
//
//     constructor(engine: string, fuel: string, manufacturer: string, model: string, type: string, win: string, year: string, modification: string, wheels: number, transmission: string, drivingWheelSide:string) {
//         this.engine = engine;
//         this.fuel = fuel;
//         this.manufacturer = manufacturer;
//         this.model = model;
//         this.type = type;
//         this.win = win;
//         this.year = year;
//         this.modification = modification;
//         this.wheels = wheels;
//         this.transmission = transmission;
//         this.drivingWheelSide = drivingWheelSide;
//     }
//
//     engineTurnOn() {return `${this.engine} started work`}
//     engineTurnOff() {return `${this.engine} stopped work`}
//     drive() {
//         return `${this.wheels} wheels are turning`
//     }
//     stop() {
//         return `${this.wheels} wheels stopped turn`
//     }
// }

class Car {
  readonly maker: string;
  readonly model: string;
  readonly year: number;
  protected isWorking?: boolean = false;
  private amountFuelInTank?: number;
  protected fuelTankMaxCapacity: number = 45;

  constructor(maker: string, model: string, year: number) {
    this.maker = maker;
    this.model = model;
    this.year = year;
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

  get fuelTankCapacity() {
    return this.fuelTankMaxCapacity;
  }

  fuelInTank() {
    return `${this.amountFuelInTank || 0} l`;
  }

  fillUpTheFuel(fuel: number) {
    if (fuel >= this.fuelTankMaxCapacity) {
      fuel = this.fuelTankMaxCapacity;
    }
    if (fuel < 0) {
      fuel = 0;
    }
    this.amountFuelInTank = fuel;
  }
}

class SerialCar extends Car {
  private readonly _numberOfPassengers: number;
  private luggageVolume?: number;
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
  get _luggageVolume() {
    // @ts-ignore
    return `${this.maker} ${this.model} can transport of the ${this.luggageVolume} sm3 of luggage`;
  }

  set _luggageVolume(luggage: number) {
    this.luggageVolume = luggage;
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
  protected readonly electricBatteryCapacity: number;
  protected _batteryLevel?: number;

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
    console.log(this._batteryLevel + "%");
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
}

const ford = new SerialCar("Ford", "Focus", 2014, 45, 4);
const daf = new Truck("Daf", "M1", 2022, 2000);
const volvo = new Truck("Volvo", "V1", 2012, 1500);
const porsche = new SportCar("Porsche", "911", 2021, 350);
const tesla = new ElectricCar("Tesla", "Model 3", 2020, 45);

// porsche.accelerate();
console.log(tesla.drive());

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
