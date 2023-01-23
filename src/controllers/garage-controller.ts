import GarageUtils from '../utils/garage-utils';
import LoaderCar from '../utils/loaders-cars';
import CarsGen from '../components/cars-data/cars-data';
import State from '../utils/state';
import RaceElems from '../utils/race-elems';
import Animate from '../utils/animation';
import DriveLoader from '../utils/loader-drive';
import WinnersLoader from '../utils/loaders-winners';
import WinLogo from '../components/winner-logo/winner-logo';

export default class GarageController {
  private garage: HTMLElement | undefined;

  private menu: HTMLElement | undefined;

  private nameCar: HTMLInputElement | undefined;

  private colorCar: HTMLInputElement | undefined;

  private btnCreateUpdate: HTMLButtonElement | undefined;

  private btnRace: HTMLButtonElement | undefined;

  private btnReset: HTMLButtonElement | undefined;

  private btnCreateCars: HTMLButtonElement | undefined;

  private pgLeft: HTMLButtonElement | undefined;

  private pgRight: HTMLButtonElement | undefined;

  private pgInput: HTMLInputElement | undefined;

  private clickCTRL: boolean = false;

  public addMenuElems(block: HTMLElement): void {
    this.menu = block;
    this.btnCreateUpdate = block.querySelector('.main__update-create') as HTMLButtonElement;
    this.btnRace = block.querySelector('.main__button-race') as HTMLButtonElement;
    this.btnReset = block.querySelector('.main__button-reset') as HTMLButtonElement;
    this.btnCreateCars = block.querySelector('.main__button-generate') as HTMLButtonElement;
    this.nameCar = block.querySelector('.main__car-name') as HTMLInputElement;
    this.colorCar = block.querySelector('.main__car-palette') as HTMLInputElement;
  }

  public addGarageElems(block: HTMLElement): void {
    this.garage = block;
  }

  public addPageElems(block: HTMLElement): void {
    this.pgLeft = block.querySelector('.main__page-left') as HTMLButtonElement;
    this.pgRight = block.querySelector('.main__page-right') as HTMLButtonElement;
    this.pgInput = block.querySelector('.main__page-input') as HTMLInputElement;
  }

  public addMenuListeners(): void {
    this.btnCreateUpdate?.addEventListener('click', this.onBtnCreateUpdate.bind(this));
    this.btnRace?.addEventListener('click', this.onRace.bind(this));
    this.btnReset?.addEventListener('click', this.onReset.bind(this));
    this.btnCreateCars?.addEventListener('click', this.onCreateCars.bind(this));
    this.nameCar?.addEventListener('blur', this.onInputName.bind(this));
  }

  public addPaginationListeners(): void {
    this.pgLeft?.addEventListener('click', this.onPgLeft.bind(this));
    this.pgRight?.addEventListener('click', this.onPgRight.bind(this));
    this.pgInput?.addEventListener('blur', this.onPgInput.bind(this));
  }
  // Menu controllers;

  private async onBtnCreateUpdate(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.clickCTRL) return;
    this.clickCTRL = true;
    const target: HTMLElement = ev.target as HTMLElement;
    const carsLoader = new LoaderCar();
    if (!this.nameCar!.value) {
      this.nameCar!.placeholder = 'You don\'t enter car!';
      setTimeout(() => { this.nameCar!.placeholder = 'Enter car name!'; }, 1000);
      target.textContent = 'Create';
      target.dataset.id = 'create';
      this.clickCTRL = false;
      return;
    }
    const text: string = this.nameCar!.value;
    const color: string = this.colorCar!.value;
    let resp: CarData;
    if (target.dataset.mode === 'create') {
      resp = await carsLoader.createCar(text, color);
    } else {
      const id = Number(target.dataset.mode);
      resp = await carsLoader.updateCar(id, text, color);
      target.dataset.mode = 'create';
      this.nameCar!.value = '';
      this.btnCreateUpdate!.textContent = 'Create';
    }

    if (!resp.name) throw new Error('Car wasn\'t create!');
    const utils = new GarageUtils();
    await utils.updateRaceList();
    // this.nameCar!.value = '';
    // target.dataset.mode = 'create';
    this.clickCTRL = false;
  }

  private async onRace(ev: Event): Promise<void> {
    ev.stopPropagation();

    let winner: boolean = false;

    this.garage = document.querySelector('.main__race-block') as HTMLElement;

    const raceElems: NodeListOf<HTMLElement> = this.garage!.querySelectorAll('.main__car-block');

    const raceBlocks: RaceElems[] = [...raceElems].map((elem: HTMLElement): RaceElems => {
      const race: RaceElems = new RaceElems(elem);
      return race;
    });

    const animArr: Promise<EngineCarParams>[] = [];
    const driveLoader: DriveLoader = new DriveLoader();
    const carsLoader: LoaderCar = new LoaderCar();
    const winLoader: WinnersLoader = new WinnersLoader();

    raceBlocks.forEach(async (race: RaceElems): Promise<void> => {
      race.offBtnOnStart();
      const params = await driveLoader.startEngine(race.id!);
      const duration = params.distance / params.velocity;
      const anim = new Animate(race.car!, duration);
      anim.animate!.onfinish = (e: AnimationPlaybackEvent) => {
        if (winner) {
          return;
        }
        winner = true;
        const t = e.target as Animation;
        let carData: CarData | null = null;
        carsLoader.getCar(Number(t.id))
          .then((car: CarData) => {
            carData = car;
            return winLoader.getWinner(Number(t.id));
          })
          .then((win: Winner | EmptyObject) => {
            if (!('wins' in win)) {
              let newTime = Math.ceil(Number(duration)) / 10;
              newTime = Math.round(newTime) / 100;
              return winLoader.createWinner(Number(t.id), 1, newTime);
            }
            const wins = win.wins + 1;
            let durationMath = Math.ceil(Number(duration)) / 10;
            durationMath = Math.round(durationMath) / 100;
            const time = durationMath < win.time ? durationMath : win.time;
            return winLoader.updateWinner(win.id, wins, time);
          })
          .then((win: Winner | EmptyObject) => {
            if (!('wins' in win)) throw new Error('Winner wasn\'t created!');
            const showLogo = new WinLogo(carData!, win);
            showLogo.show();
          });
      };
      const prom: Promise<EngineCarParams> = new Promise((resolve, reject) => {
        let id: string = '';
        anim.start()
          .then((ident: string) => {
            id = ident;
            return driveLoader.checkDriverMode(Number(id));
          })
          .then((succes: SuccessRace) => {
            if (!succes.success) {
              anim.stop();
              reject(driveLoader.stopEngine(Number(id)));
            }
            resolve(driveLoader.stopEngine(Number(id)));
          });
      });
      animArr.push(prom);
    });
    Promise.all(animArr);
  }

  private async onReset(ev: Event): Promise<void> {
    ev.stopPropagation();
    const raceArr: NodeListOf<HTMLElement> = document.querySelectorAll('.main__car-block');
    raceArr.forEach((item: HTMLElement) => {
      const car: HTMLElement = item.querySelector('.main__car-wrapper') as HTMLElement;
      const anim = car.getAnimations();

      if (anim.length !== 0) {
        anim[0].finish();
      }

      const keyFrame: KeyframeEffect = new KeyframeEffect(
        car,
        [
          { left: '0%' },
        ],
        { duration: 50, fill: 'forwards' },
      );

      const animate: Animation = new Animation(keyFrame);
      animate.onfinish = () => animate.finish();
      animate.play();
      const race = new RaceElems(item);
      race.resetBtn();
    });
  }

  private async onCreateCars(ev: Event): Promise<void> {
    ev.stopPropagation();
    if (this.clickCTRL) return;
    this.clickCTRL = true;
    const carsData: CarParams[] = new CarsGen().getNewCars();
    const loader = new LoaderCar();
    const utils = new GarageUtils();
    carsData.forEach(async (car: CarParams) => {
      await loader.createCar(car.name, car.color);
      await utils.updateRaceList();
    });
    this.clickCTRL = false;
  }

  private onInputName(ev: Event): void {
    const target: HTMLInputElement = ev.target as HTMLInputElement;
    if (!target.value) {
      target.placeholder = 'You don\'t enter car!';
      setTimeout(() => { target.placeholder = 'Enter car name!'; }, 1000);
      this.btnCreateUpdate!.textContent = 'Create';
      this.btnCreateUpdate!.dataset.id = 'create';
    }
  }

  // Pagination controllers;

  private async onPgLeft(ev:Event): Promise<void> {
    ev.stopPropagation();

    if (this.clickCTRL) return;
    this.clickCTRL = true;

    const btn: HTMLButtonElement = ev.target as HTMLButtonElement;

    const { view } = (btn.parentElement as HTMLElement).dataset;
    const state = new State();
    const util: GarageUtils = new GarageUtils();

    if (view === 'garage') {
      let page: number = state.getGaragePage();
      if (page === 1) {
        this.clickCTRL = false;
        return;
      }
      page = page > 1 ? (page - 1) : 1;
      state.setGaragePage(page);
      await util.updateRaceList();
    } else {
      let page: number = state.getWinnersPage();
      if (page === 1) {
        this.clickCTRL = false;
        return;
      }
      page = page > 1 ? (page - 1) : 1;
      state.setWinnersPage(page);
      await util.updateWinTables();
    }
    this.clickCTRL = false;
  }

  private async onPgRight(ev:Event): Promise<void> {
    ev.stopPropagation();

    if (this.clickCTRL) return;
    this.clickCTRL = true;

    const btn: HTMLButtonElement = ev.target as HTMLButtonElement;

    const { view } = (btn.parentElement as HTMLElement).dataset;
    const state = new State();
    const util: GarageUtils = new GarageUtils();

    if (view === 'garage') {
      let page: number = state.getGaragePage();
      page += 1;
      state.setGaragePage(page);
      await util.updateRaceList();
    } else {
      let page = state.getWinnersPage();
      page += 1;
      state.setWinnersPage(page);
      await util.updateWinTables();
    }
    this.clickCTRL = false;
  }

  private async onPgInput(ev: Event): Promise<void> {
    const input: HTMLInputElement = ev.target as HTMLInputElement;

    const { view } = (input.parentElement as HTMLElement).dataset;
    const state = new State();
    const util: GarageUtils = new GarageUtils();
    let page: number = Number(input.value);
    if (page < 1) page = 1;

    if (view === 'garage') {
      state.setGaragePage(page);
      await util.updateRaceList();
    } else {
      state.setWinnersPage(page);
      await util.updateWinTables();
    }
  }
}
