import './garage-label.scss';

export default class GarageLabel {
  label: HTMLElement;

  constructor(count?: number) {
    this.label = this.createLabel(count);
  }

  private createLabel(count?: number): HTMLElement {
    const elem: HTMLElement = document.createElement('div');
    elem.className = 'main__garage-label';

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'main__garage-title';
    text.textContent = 'GARAGE: ';

    elem.append(text);

    text = document.createElement('span');
    text.className = 'main__garage-count';
    text.textContent = `${count}`;

    elem.append(text);

    return elem;
  }

  public setCount(count: number): void {
    (this.label.querySelector('.main__garage-count') as HTMLElement).textContent = `${count}`;
  }
}
