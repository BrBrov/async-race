export default class Animate {
  public animate: Animation | undefined;

  constructor(element: HTMLElement, duration: number) {
    this.init(element, duration);
  }

  private init(element: HTMLElement, duration: number): void {
    const svg: SVGElement = element.querySelector('.main__car-svg') as SVGElement;
    const id: string = <string> svg.dataset.id;
    const keyFrame: KeyframeEffect = new KeyframeEffect(
      element,
      [
        { left: '0%' },
        { left: 'calc(100% - 67px)' },
      ],
      { duration, fill: 'forwards' },
    );

    this.animate = new Animation(keyFrame);
    this.animate.id = id;
  }

  public async start(): Promise<string> {
    await this.animate?.play();
    return this.animate!.id;
  }

  public async stop(): Promise<string> {
    await this.animate?.pause();
    return this.animate!.id;
  }

  public async revert(): Promise<void> {
    await this.animate?.reverse();
  }
}
