import State from '../utils/state';
import CarsLoader from '../utils/loaders-cars';
import WinnersLoader from '../utils/loaders-winners';
import Main from '../page/main/main';
import ButtonElement from '../components/button/button';

export default class ViewChange {
  private main: Main;

  private state: State;

  private clickCTRL: boolean = false;

  private btnGarage: ButtonElement | undefined;

  private btnWinners: ButtonElement | undefined;

  constructor(main: Main) {
    this.main = main;
    this.btnGarage = this.main.btnGarage;
    this.btnWinners = this.main.btnWinners;
    this.state = new State();
    this.addListeners();
  }

  private addListeners(): void {
    this.setBtnView();

    this.btnGarage?.button.addEventListener('click', this.toGarage.bind(this));
    this.btnWinners?.button.addEventListener('click', this.toWinners.bind(this));
  }
  // main__block-view for garage;

  private async toWinners(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.clickCTRL) return;
    if (this.state.getView() === 'garage') {
      this.clickCTRL = true;
      const winLoader = new WinnersLoader();
      const carsLoader = new CarsLoader();
      // sort = 'id'|'wins'|'time', order = 'none' | ASC'|'DESC'
      const winsData: AllWinners = await winLoader.getWinners(
        this.state.getWinnersPage(),
        10,
        this.state.getSort(),
        this.state.getOrder(),
      );
      const carsData: CarsData = await carsLoader.getCars();
      const count: number = winLoader.getCountWinners() || 0;
      this.main.createWinners(winsData, carsData, count);
      this.main.addWinners();
      this.state.setView('winners');
      this.setBtnView();
      this.clickCTRL = false;
    }
  }

  private async toGarage(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.clickCTRL) return;
    if (this.state.getView() === 'winners') {
      this.clickCTRL = true;
      const carLoader = new CarsLoader();
      const carsData: CarsData = await carLoader.getCars(7, this.state.getGaragePage());
      const count: number = carLoader.getCountCars();
      this.main.createGarage(carsData, count);
      this.main.addGarage();
      this.state.setView('garage');
      this.setBtnView();
      this.clickCTRL = false;
    }
  }

  private setBtnView(): void {
    if (this.state.getView() === 'garage') {
      this.btnGarage?.disable();
      this.btnWinners?.enable();
    } else {
      this.btnGarage?.enable();
      this.btnWinners?.disable();
    }
  }
}
