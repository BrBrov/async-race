import './header.scss';

export default class Header {
  public readonly header: HTMLElement;

  constructor() {
    this.header = this.createHeader();
  }

  private createHeader(): HTMLElement {
    const header: HTMLElement = document.createElement('header');
    header.className = 'header';

    const span: HTMLSpanElement = document.createElement('span');
    span.className = 'header__title';
    span.textContent = 'Async Race';

    header.append(span);

    return header;
  }
}
