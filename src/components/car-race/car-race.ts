import ButtonElement from '../button/button';
import Car from '../car/car';
import './car-race.scss';
import '../../assets/svg/finish.svg';

export default class CarRace {
  public carRace: HTMLElement;

  public btnStart: ButtonElement | undefined;

  public btnStop: ButtonElement | undefined;

  public btnSelect: ButtonElement | undefined;

  public btnRemove: ButtonElement | undefined;

  public name: HTMLSpanElement | undefined;

  public car: Car | undefined;

  public startFlag: boolean = false;

  //     Here must enter car data
  // {
  //     name: string,
  //     color: string,
  //     id: number
  // }

  constructor(data: CarData) {
    this.carRace = this.createCar(data);
  }

  private createCar(data: CarData): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__car-block';
    wrapper.dataset.id = `${data.id}`;

    let block: HTMLElement = document.createElement('div');
    block.className = 'main__cars-panel';

    wrapper.append(block);

    let panel: HTMLElement = document.createElement('div');
    panel.className = 'main__top-panel';

    this.createBtn(data.id);

    panel.append(this.btnSelect!.button);

    panel.append(this.btnRemove!.button);

    block.append(panel);

    panel = document.createElement('div');
    panel.className = 'main__bottom-panel';

    panel.append(this.btnStart!.button);

    panel.append(this.btnStop!.button);

    block.append(panel);

    block = document.createElement('div');
    block.className = 'main__track-block';

    const text: HTMLSpanElement = document.createElement('span');
    text.className = 'main__name-car';
    text.textContent = data.name;

    block.append(text);

    const track: HTMLElement = this.createTrack(data.color, data.id);

    block.append(track);

    wrapper.append(block);

    return wrapper;
  }

  private createBtn(id: number): void {
    this.btnSelect = new ButtonElement('main__button-select', 'Select');
    this.btnSelect.button.dataset.id = `${id}`;
    this.btnRemove = new ButtonElement('main__button-remove', 'Remove');
    this.btnRemove.button.dataset.id = `${id}`;
    this.btnStart = new ButtonElement('main__button-start', 'Start');
    this.btnStart.button.dataset.id = `${id}`;
    this.btnStop = new ButtonElement('main__button-stop', 'Stop');
    this.btnStop.button.dataset.id = `${id}`;
    this.btnStop.disable();
  }

  private createTrack(color: string, id: number): HTMLElement {
    const block: HTMLElement = document.createElement('div');
    block.className = 'main__track';

    const panel: HTMLElement = document.createElement('div');
    panel.className = 'main__car-track';

    this.car = new Car(color, id);

    panel.append(this.car.car);

    const finish: HTMLElement = document.createElement('div');
    finish.className = 'main__finish';

    const flag: HTMLImageElement = document.createElement('img');
    flag.className = 'main__finish-flag';
    flag.alt = 'Finish';
    flag.src = './assets/svg/finish.svg';

    finish.append(flag);

    block.append(panel);

    block.append(finish);

    return block;
  }
}
