import CarSVG from '../car-svg/car-svg';

export default class Car {
  public car: HTMLElement;

  private carImg: CarSVG | undefined;

  constructor(color: string, id: number) {
    this.car = this.createCar(color, id);
  }

  private createCar(color: string, id: number): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.className = 'main__car-wrapper';

    this.carImg = new CarSVG(color, 'main__car-svg', id);

    block.append(this.carImg.svg);

    return block;
  }

  public setColor(color: string): void {
    this.carImg?.colorReDraw(color);
  }
}
