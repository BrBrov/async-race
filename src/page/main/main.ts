import './main.scss';
import ButtonElement from '../../components/button/button';
import GarageMenu from '../../components/garage/garage-menu';
import Garage from '../../components/garage/garage';
import Winners from '../../components/winners/winners';
import State from '../../utils/state';
import RaceController from '../../controllers/race-controller';
import WinnersController from '../../controllers/winners-controller';

export default class Main {
  public main: HTMLElement;

  public garage: Garage | undefined;

  public winners: Winners | undefined;

  public garageMenu: GarageMenu;

  public btnGarage: ButtonElement | undefined;

  public btnWinners: ButtonElement | undefined;

  public state: State;

  private RaceController: RaceController | undefined;

  private WinnersController: WinnersController | undefined;

  constructor() {
    this.state = new State();
    this.garageMenu = new GarageMenu();
    this.main = this.createMain();
  }

  private createMain(): HTMLElement {
    const main: HTMLElement = document.createElement('main');
    main.className = 'main';

    const menu: HTMLElement = document.createElement('div');
    menu.className = 'main__menu-wrapper';

    this.btnGarage = new ButtonElement('main__button-garage', 'Garage');

    menu.append(this.btnGarage.button);

    this.btnWinners = new ButtonElement('main__button-winners', 'Winners');

    menu.append(this.btnWinners.button);

    main.append(menu);

    const block: HTMLElement = document.createElement('div');
    block.className = 'main__block-view';

    main.append(block);

    return main;
  }

  public createGarage(data: CarsData, count: number): HTMLElement {
    this.garage = new Garage(data, count);
    this.RaceController = new RaceController(this.garage!.garage as HTMLElement);
    return <HTMLElement> this.garage.garage;
  }

  public createWinners(winners: AllWinners, data: CarsData, count: number): HTMLElement {
    this.winners = new Winners(winners, data, count);
    this.WinnersController = new WinnersController(this.winners.winners);
    return <HTMLElement> this.winners.winners;
  }

  public addGarage(): void {
    const block: HTMLElement = this.removeBlock();
    if (!block) throw new Error('Cannot find .main__block-view');
    if (!this.garageMenu.MenuGarage) throw new Error('Not found garage menu into main!');
    if (!this.garage?.garage) throw new Error('Cannot find garage!');
    block.append(this.garageMenu.MenuGarage);
    block.append(this.garage.garage);
    this.main.append(block);
  }

  public addWinners(): void {
    const block: HTMLElement = this.removeBlock();
    if (!block) throw new Error('Cannot find .main__block-view');
    if (!this.winners) throw new Error('Winners block was not created!');
    block.append(this.winners.winners);
    this.main.append(block);
  }

  public removeBlock(): HTMLElement {
    let block: HTMLElement = this.main.querySelector('.main__block-view') as HTMLElement;
    // main__winners-block or main__garage-block
    if (block.querySelector('.main__garage-menu')) {
      const inputName: string = (<HTMLInputElement>block.querySelector('.main__car-name')).value;
      const inputColor: string = (<HTMLInputElement>block.querySelector('.main__car-palette')).value;
      this.state.setName(inputName);
      this.state.setColor(inputColor);
    }
    block.remove();
    block = document.createElement('div');
    block.className = 'main__block-view';
    return block;
  }
}
