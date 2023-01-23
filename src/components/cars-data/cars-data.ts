import carsDB from './cars.json';

export default class CarsGen {
  private readonly dataRef: CarsDB;

  constructor() {
    this.dataRef = carsDB;
  }

  public getNewCars(): Array<CarParams> {
    const carsData: CarParams[] = [];
    while (carsData.length < 100) {
      const carParam: CarParams = {
        name: this.getNameCar(),
        color: this.getNewColor(),
      };
      carsData.push(carParam);
    }
    return carsData;
  }

  private random(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }

  private getNameCar(): string {
    let names: string[] = Object.keys(this.dataRef);

    let rand: number = this.random(names.length - 1);
    const name: string = names[rand];

    names = this.dataRef[name];

    rand = this.random(names.length - 1);

    return `${name} ${names[rand]}`;
  }

  private getNewColor(): string {
    const rgb: string [] = [];
    while (rgb.length < 3) {
      const partColor: number = this.random(255);
      const partColorToHex: string = partColor.toString(16);
      rgb.push(partColorToHex);
    }
    return `#${rgb.join('')}`;
  }
}
