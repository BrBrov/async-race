export default class RaceElems {
  public id: number | undefined;

  public btnRemove: HTMLButtonElement | undefined;

  public btnSelect: HTMLButtonElement | undefined;

  public btnStart: HTMLButtonElement | undefined;

  public btnStop: HTMLButtonElement | undefined;

  public car: HTMLElement | undefined;

  constructor(element: HTMLElement) {
    this.init(element);
  }

  private init(element: HTMLElement): void {
    const raceBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('.main__car-block');
    let raceBlock: HTMLElement | null = null;
    this.id = Number(element.dataset.id);

    raceBlocks.forEach((item: HTMLElement) => {
      const idItem: number = Number(item.dataset.id);
      if (idItem === this.id) {
        raceBlock = item;
      }
    });

    this.btnSelect = raceBlock!.querySelector('.main__button-select') as HTMLButtonElement;
    this.btnRemove = raceBlock!.querySelector('.main__button-remove') as HTMLButtonElement;
    this.btnStart = raceBlock!.querySelector('.main__button-start') as HTMLButtonElement;
    this.btnStop = raceBlock!.querySelector('.main__button-stop') as HTMLButtonElement;
    this.car = raceBlock!.querySelector('.main__car-wrapper') as HTMLElement;
  }

  public offBtnOnStart(): void {
    this.btnStart!.disabled = true;
    this.btnSelect!.disabled = true;
    this.btnRemove!.disabled = true;
    this.btnStop!.disabled = false;
  }

  public onBtnOnStop(): void {
    this.btnStart!.disabled = true;
    this.btnSelect!.disabled = true;
    this.btnRemove!.disabled = true;
    this.btnStop!.disabled = false;
  }

  public resetBtn(): void {
    this.btnStart!.disabled = false;
    this.btnSelect!.disabled = false;
    this.btnRemove!.disabled = false;
    this.btnStop!.disabled = true;
  }
}
