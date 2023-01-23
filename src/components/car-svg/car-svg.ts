export default class CarSVG {
  public svg: SVGElement;

  constructor(color: string, className: string, id: number) {
    this.svg = this.createCarSvg(color, className, id);
  }

  private createCarSvg(color: string, className: string, id: number): SVGSVGElement {
    const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add(`${className}`);
    svg.dataset.id = `${id}`;
    svg.dataset.color = color;
    // svg.setAttribute('viewBox', '0 0 60 35');
    // svg.setAttribute('width', '65');
    // svg.setAttribute('height', '46');

    const path: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', 'null');
    path.setAttribute(
      'd',
      'm36.72859,0.11556a2.15021,2.0437 0 0 0 -1.56212,3.39253l8.01631,8.88842l-11.50584,0l-1.55372,-2.95749a2.15021,2.0437 0 0 0 -1.88963,-1.15345a2.15021,2.0437 0 0 0 -1.95684,2.98144l0.59628,1.1295l-8.09608,0l-1.55372,-2.95749a2.15021,2.0437 0 0 0 -1.88963,-1.15345a2.15021,2.0437 0 0 0 -1.95684,2.98144l0.60049,1.14546l-10.08652,1.48873c-2.09625,0.30857 -3.64072,2.02421 -3.64072,4.03909l0,7.60324c0,1.88002 1.35123,3.51964 3.27118,3.97125l3.74151,0.87409c1.12193,2.61784 3.82315,4.48611 6.9623,4.48611c2.97377,0 5.54205,-1.68525 6.76073,-4.08699l25.1785,0c1.21868,2.40174 3.78696,4.08699 6.76073,4.08699c3.19481,0 5.92868,-1.93867 7.01269,-4.62979l1.85186,-0.57874c1.7673,-0.5497 2.96044,-2.11786 2.96044,-3.88344l0,-6.34602c0,-1.78602 -1.2114,-3.36809 -3.00664,-3.8994c-2.97132,-0.87889 -7.75255,-2.11195 -12.55984,-2.7699l-10.74999,-11.91774a2.15021,2.0437 0 0 0 -1.70488,-0.73439l-0.00001,0zm-22.5036,24.54193c1.80658,0 3.225,1.34816 3.225,3.06525c0,1.71709 -1.41842,3.06525 -3.225,3.06525c-1.80658,0 -3.225,-1.34816 -3.225,-3.06525c0,-1.71709 1.41842,-3.06525 3.225,-3.06525zm38.69997,0c1.80658,0 3.225,1.34816 3.225,3.06525c0,1.71709 -1.41842,3.06525 -3.225,3.06525c-1.80658,0 -3.225,-1.34816 -3.225,-3.06525c0,-1.71709 1.41842,-3.06525 3.225,-3.06525z',
    );
    path.setAttribute('fill', `${color}`);

    svg.append(path);

    return svg;
  }

  public colorReDraw(color: string): void {
    const path: SVGElement = this.svg.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'path')[0];
    path.setAttribute('fill', `${color}`);
  }
}
