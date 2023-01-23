import CarsLoader from './loaders-cars';
import State from './state';
import CarRace from '../components/car-race/car-race';
import WinnersLoader from './loaders-winners';
import WinnerRecord from '../components/winners/winner-record';
import WinnerTableHeader from '../components/winners/winner-theader';

export default class GarageUtils {
  public async updateRaceList(): Promise<void> {
    const block: HTMLElement = <HTMLElement> document.querySelector('.main__garage-block');
    const titleCount: HTMLSpanElement = block.querySelector('.main__garage-count') as HTMLSpanElement;
    let raceBlock: HTMLElement = block.querySelector('.main__race-block') as HTMLSpanElement;
    raceBlock.remove();
    raceBlock = document.createElement('div');
    raceBlock.className = 'main__race-block';
    (block.querySelector('.main__garage-label') as HTMLElement).after(raceBlock);
    const loader = new CarsLoader();
    const state = new State();
    const resp: CarsData = await loader.getCars(7, state.getGaragePage());
    if (resp.length === 0) {
      let page: number = state.getGaragePage();
      if (page <= 1) {
        throw new Error('Page cannot to be less then 1!');
      }
      page -= 1;
      state.setGaragePage(page);
      await this.updateRaceList();
      return;
    }

    resp.forEach((car: CarData) => {
      const race = new CarRace(car);
      raceBlock.append(race.carRace);
    });
    titleCount.textContent = String(loader.getCountCars());
    this.updatePageInput('garage');
  }

  public async updateWinTables(): Promise<void> {
    const winCount: HTMLSpanElement = document.querySelector('.main__winners-count') as HTMLSpanElement;
    const pageCount: HTMLSpanElement = document.querySelector('.main__page-count') as HTMLSpanElement;
    const tableBlock: HTMLElement = document.querySelector('.main__winners-table') as HTMLElement;

    const carsLoader: CarsLoader = new CarsLoader();
    const winnersLoader: WinnersLoader = new WinnersLoader();
    const state: State = new State();

    const winners: AllWinners = await winnersLoader.getWinners(
      state.getWinnersPage(),
      10,
      state.getSort(),
      state.getOrder(),
    );

    if (winners.length === 0) {
      let page = state.getWinnersPage();
      if (page <= 1) {
        throw new Error('Page cannot to be less then 1!');
      }
      page -= 1;
      state.setWinnersPage(page);
      await this.updateWinTables();
      return;
    }

    const recordsArr: NodeListOf<HTMLElement> = document.querySelectorAll('.main__winner-record');
    recordsArr.forEach((rec: HTMLElement) => {
      rec.remove();
    });

    const tableHeader: HTMLElement = document.querySelector('.main__winners-theader') as HTMLElement;
    tableHeader.remove();

    winCount.textContent = `${winnersLoader.getCountWinners()}`;
    pageCount.textContent = `${state.getWinnersPage()}`;
    const tHeader: WinnerTableHeader = new WinnerTableHeader();

    tableBlock.append(tHeader.header);

    winners.forEach(async (winner: Winner) => {
      const car: CarData = await carsLoader.getCar(winner.id);
      if (!('id' in car)) throw new Error('Car not found!');

      const record: WinnerRecord = new WinnerRecord(winner, car);
      tableBlock.append(record.record);
    });
    this.updatePageInput('winners');
  }

  private updatePageInput(view: string): void {
    const inputPage: HTMLInputElement = document.querySelector('.main__page-input') as HTMLInputElement;
    const state = new State();
    if (view === 'garage') {
      inputPage.value = String(state.getGaragePage());
    } else {
      inputPage.value = String(state.getWinnersPage());
    }
  }
}
