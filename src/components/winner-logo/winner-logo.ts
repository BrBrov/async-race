import './winner-logo.scss';

export default class WinLogo {
  private logo: HTMLElement | undefined;

  constructor(car: CarData, win: Winner) {
    this.init(car, win);
  }

  public show(): void {
    const page = document.querySelector('.container') as HTMLElement;
    page.append(this.logo!);

    setTimeout(() => this.logo!.remove(), 5000);
  }

  private init(car: CarData, win: Winner): void {
    const block: HTMLElement = document.createElement('div');
    block.className = 'container__block-logo';

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'container__congratulation';
    text.textContent = 'Winner!';

    block.append(text);

    text = document.createElement('span');
    text.className = 'container__name';
    text.textContent = `It was ${car.name}!`;

    block.append(text);

    text = document.createElement('span');
    text.className = 'container__time';
    text.textContent = `Best time: ${win.time}`;

    block.append(text);

    this.logo = block;

    setTimeout(() => block.remove(), 3000);
  }
}
