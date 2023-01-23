import GarageLabel from './garage-label';
import CarRace from '../car-race/car-race';
import Pagination from '../pagination-block/pagination';
import GarageController from '../../controllers/garage-controller';
import './garage.scss';

export default class Garage {
  private label: GarageLabel | undefined;

  private carsArray: CarRace[] | undefined;

  private pagination: Pagination | undefined;

  public garage: HTMLElement | undefined;

  private controller: GarageController;

  constructor(data: CarsData, count: number) {
    this.garage = this.createGarage(data, count);
    this.controller = new GarageController();
    this.controller.addGarageElems(this.garage);
  }

  private createGarage(data: CarsData, count: number): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__garage-block';
    wrapper.dataset.note = 'garage';
    this.label = new GarageLabel(count);

    wrapper.append(this.label.label);

    const raceBlock: HTMLElement = document.createElement('div');
    raceBlock.className = 'main__race-block';

    this.generateCarsRace(data);

    this.carsArray?.forEach((race: CarRace) => {
      raceBlock.append(race.carRace);
    });

    wrapper.append(raceBlock);

    this.pagination = new Pagination('garage');

    wrapper.append(this.pagination.pagination);

    return wrapper;
  }

  private generateCarsRace(data: CarsData): void {
    this.carsArray = [];
    this.carsArray = data.map((carData: CarData) => new CarRace(carData));
  }

  // public updateGarage(data: CarsData): void {
  //   this.generateCarsRace(data);
  // }

  // private onPagination(data: CarsData): void {
  //   this.generateCarsRace(data);
  // }

  // public setCarCount(count: number): void {
  //   this.label?.setCount(count);
  // }
}
