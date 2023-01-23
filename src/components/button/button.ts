export default class Button {
  public button: HTMLButtonElement;

  constructor(className: string, text: string) {
    this.button = this.createButton(className, text);
  }

  private createButton(className: string, text: string): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement('button');
    btn.className = className;
    btn.textContent = text;

    return btn;
  }

  public changeText(text: string): void {
    this.button.textContent = text;
  }

  public disable(): void {
    this.button.disabled = true;
  }

  public enable(): void {
    this.button.disabled = false;
  }

  public checkDisable(): boolean {
    return this.button.disabled;
  }
}
