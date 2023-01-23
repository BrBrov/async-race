import './winner-record.scss';
import CarSVG from '../car-svg/car-svg';

export default class WinnerRecord {
  public record: HTMLElement;

  private car: CarSVG | undefined;

  constructor(data: Winner, carData: CarData) {
    this.record = this.createRecord(data, carData);
  }

  private createRecord(data: Winner, carData: CarData): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__winner-record';
    wrapper.dataset.id = `${data.id}`;

    const number: HTMLSpanElement = document.createElement('span');
    number.className = 'main__winner-number';
    number.textContent = `${data.id}`;

    wrapper.append(number);

    const carWrapper: HTMLElement = document.createElement('div');
    carWrapper.className = 'main__winner-car';

    this.car = new CarSVG(carData.color, 'main__winner-svg', data.id);

    carWrapper.append(this.car.svg);

    wrapper.append(carWrapper);

    const otherDataArray: Array<string | number> = [];
    otherDataArray.push(carData.name);
    otherDataArray.push(data.wins);
    otherDataArray.push(data.time);

    const classNamesArray: Array<string> = ['main__winner-name', 'main__winner-wins', 'main__winner-time'];

    otherDataArray.forEach((info: string | number, index: number) => {
      const elem: HTMLElement = this.createTextField(info, classNamesArray[index]);
      wrapper.append(elem);
    });

    return wrapper;
  }

  private createTextField(data: string | number, nameClass: string): HTMLElement {
    const text: HTMLSpanElement = document.createElement('span');
    text.className = nameClass;
    text.textContent = `${data}`;

    return text;
  }
}
