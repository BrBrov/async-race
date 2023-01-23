import './winners.scss';
import TableHeader from './winner-theader';
import WinRecord from './winner-record';
import PaginationBlock from '../pagination-block/pagination';

export default class Winners {
  public winners: HTMLElement;

  private tableHeader: TableHeader | undefined;

  private pagination: HTMLElement | undefined;

  constructor(data: AllWinners, cars: CarsData, count: number) {
    this.winners = this.createWinners(data, cars, count);
  }

  private createWinners(data: AllWinners, cars: CarsData, count: number): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__winners-block';
    wrapper.dataset.note = 'winners';

    const title: HTMLElement = this.createWinTitle(count);

    wrapper.append(title);

    const pages: HTMLElement = this.createPageCounterBlock(1);

    wrapper.append(pages);

    const tableWrapper: HTMLElement = document.createElement('div');
    tableWrapper.className = 'main__winners-table';

    this.tableHeader = new TableHeader();

    tableWrapper.append(this.tableHeader.header);

    data.forEach((win: Winner) => {
      const car: CarData[] = cars.filter((carData: CarData) => win.id === carData.id);

      const winRecord: HTMLElement = new WinRecord(win, car[0]).record;

      tableWrapper.append(winRecord);
    });

    wrapper.append(tableWrapper);

    this.pagination = new PaginationBlock('winner').pagination;

    wrapper.append(this.pagination);

    return wrapper;
  }

  private createWinTitle(count: number): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__winners-title';

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'main__winners-label';
    text.textContent = 'Winners: ';

    wrapper.append(text);

    text = document.createElement('div');
    text.className = 'main__winners-count';
    text.textContent = `${count || 0}`;

    wrapper.append(text);

    return wrapper;
  }

  private createPageCounterBlock(page?: number): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__page-block';

    let text: HTMLSpanElement = document.createElement('span');
    text.className = 'main__page-title';
    text.textContent = 'Page: #';

    wrapper.append(text);

    text = document.createElement('span');
    text.className = 'main__page-count';
    text.textContent = `${page || 1}`;

    wrapper.append(text);

    return wrapper;
  }
}
