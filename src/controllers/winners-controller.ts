import State from '../utils/state';
import GarageUtils from '../utils/garage-utils';

export default class WinnersController {
  private winTable: HTMLElement | undefined;

  constructor(winnersBlock: HTMLElement) {
    this.winTable = winnersBlock;
    this.init();
  }

  private init(): void {
    const table: HTMLElement = this.winTable!.querySelector('.main__winners-table') as HTMLElement;
    table.addEventListener('click', this.onTable.bind(this));
  }

  private onTable(ev: Event): void {
    ev.stopPropagation();
    const target: HTMLElement = ev.target as HTMLElement;

    // ↓ ↑;

    switch (target.className) {
      case 'main__table-number':
        this.idSort(target);
        break;
      case 'main__table-wins':
        this.winsSort(target);
        break;
      case 'main__table-time':
        this.timeSort(target);
        break;
      default:
        break;
    }
  }

  private idSort(target: HTMLElement): void {
    const text: string = <string> target.textContent;
    const utils: GarageUtils = new GarageUtils();
    const state: State = new State();

    if (text.endsWith('↓')) {
      state.setOrder('ASC');
      state.setSort('id');
    }

    if (text.endsWith('↑')) {
      state.setOrder('DESC');
      state.setSort('id');
    }

    if (!text.endsWith('↓') && !text.endsWith('↑')) {
      state.setOrder('ASC');
      state.setSort('id');
    }

    utils.updateWinTables();
  }

  private winsSort(target: HTMLElement): void {
    const text: string = <string> target.textContent;
    const utils: GarageUtils = new GarageUtils();
    const state: State = new State();

    if (text.endsWith('↓')) {
      state.setOrder('ASC');
      state.setSort('wins');
    }

    if (text.endsWith('↑')) {
      state.setOrder('DESC');
      state.setSort('wins');
    }

    if (!text.endsWith('↓') && !text.endsWith('↑')) {
      state.setOrder('ASC');
      state.setSort('wins');
    }

    utils.updateWinTables();
  }

  private timeSort(target: HTMLElement): void {
    const text: string = <string> target.textContent;
    const utils: GarageUtils = new GarageUtils();
    const state: State = new State();

    if (text.endsWith('↓')) {
      state.setOrder('ASC');
      state.setSort('time');
    }

    if (text.endsWith('↑')) {
      state.setOrder('DESC');
      state.setSort('time');
    }

    if (!text.endsWith('↓') && !text.endsWith('↑')) {
      state.setOrder('ASC');
      state.setSort('time');
    }

    utils.updateWinTables();
  }
}
