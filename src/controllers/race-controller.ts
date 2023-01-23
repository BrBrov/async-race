import CarsLoader from '../utils/loaders-cars';
import WinnersLoader from '../utils/loaders-winners';
import GarageUtils from '../utils/garage-utils';
import DriveLoader from '../utils/loader-drive';
import Animate from '../utils/animation';
import RaceElems from '../utils/race-elems';

export default class RaceController {
  private block: HTMLElement;

  constructor(block: HTMLElement) {
    this.block = block;
    this.init();
  }

  private init(): void {
    this.addListeners();
  }

  private addListeners(): void {
    this.block.addEventListener('click', this.onClick.bind(this));
  }

  private async onClick(ev: Event): Promise<void> {
    ev.stopPropagation();
    const target = <HTMLElement> ev.target;

    switch (target.className) {
      case 'main__button-select':
        this.onSelect(ev);
        break;
      case 'main__button-remove':
        await this.onRemove(ev);
        break;
      case 'main__button-start':
        await this.onStart(ev);
        break;
      case 'main__button-stop':
        await this.onStop(ev);
        break;
      default:
        break;
    }
  }

  private onSelect(ev: Event): void {
    const target: HTMLButtonElement = ev.target as HTMLButtonElement;
    const id: string = <string>target.dataset.id;

    const btnUpdateCar: HTMLButtonElement = document.querySelector('.main__update-create') as HTMLButtonElement;
    btnUpdateCar.dataset.mode = id;
    btnUpdateCar.textContent = 'Update';

    const input: HTMLInputElement = document.querySelector('.main__car-name') as HTMLInputElement;
    const inputColor: HTMLInputElement = document.querySelector('.main__car-palette') as HTMLInputElement;

    const raceArr: NodeListOf<HTMLElement> = this.block.querySelectorAll('.main__car-block');

    raceArr.forEach((item: HTMLElement) => {
      if (item.dataset.id === id) {
        const carName: HTMLSpanElement = item.querySelector('.main__name-car') as HTMLSpanElement;
        input.value = <string>carName.textContent;

        const carSvg: SVGElement = item.querySelector('.main__car-svg') as SVGElement;
        inputColor.value = <string>carSvg.dataset.color;
      }
    });
  }

  private async onRemove(ev: Event): Promise<void> {
    const target: HTMLButtonElement = ev.target as HTMLButtonElement;
    const id: string = <string>target.dataset.id;

    const loader: CarsLoader = new CarsLoader();
    const winner: WinnersLoader = new WinnersLoader();

    await loader.deleteCar(Number(id));

    const car: EmptyObject | Winner = await winner.getWinner(Number(id));

    if ('wins' in car && car.wins) await winner.deleteWinner(Number(id));

    const utils: GarageUtils = new GarageUtils();
    await utils.updateRaceList();
  }

  private async onStart(ev: Event): Promise<void> {
    const target: HTMLButtonElement = ev.target as HTMLButtonElement;
    const racePanel: RaceElems = new RaceElems(target);
    racePanel.offBtnOnStart();

    const driveLoader: DriveLoader = new DriveLoader();

    const startData: EngineCarParams = await driveLoader.startEngine(racePanel.id!);
    const duration: number = (startData.distance / startData.velocity);

    const animate: Animate = new Animate(racePanel.car!, duration);
    animate.animate!.onfinish = () => racePanel.onBtnOnStop();
    await animate.start();

    const driveMode: SuccessRace = await driveLoader.checkDriverMode(racePanel.id!);
    if (!driveMode.success) {
      await animate.stop();
      racePanel.onBtnOnStop();
    }

    await driveLoader.stopEngine(racePanel.id!);
  }

  private async onStop(ev: Event): Promise<void> {
    const target: HTMLButtonElement = ev.target as HTMLButtonElement;
    const racePanel: RaceElems = new RaceElems(target);

    const anim: Animation[] | undefined = racePanel.car!.getAnimations();

    if (anim.length !== 0) {
      anim[0].finish();
    }

    const keyFrame: KeyframeEffect = new KeyframeEffect(
      racePanel.car!,
      [
        { left: '0%' },
      ],
      { duration: 50, fill: 'forwards' },
    );

    const animate: Animation = new Animation(keyFrame);
    animate.onfinish = () => animate.finish();
    animate.play();
    racePanel.resetBtn();
  }
}
