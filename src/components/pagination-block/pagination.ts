import State from '../../utils/state';
import ButtonElement from '../button/button';
import './pagination.scss';
import GarageController from '../../controllers/garage-controller';

export default class Pagination {
  public pagination: HTMLElement;

  private state: State;

  private controller: GarageController;

  constructor(view: string) {
    this.state = new State();
    this.pagination = this.createPagination(view);
    this.controller = new GarageController();
    this.controller.addPageElems(this.pagination);
    this.controller.addPaginationListeners();
  }

  private createPagination(view: string): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__garage-pagination';
    wrapper.dataset.view = view;
    let btn: HTMLButtonElement = new ButtonElement('main__page-left', '<<').button;

    wrapper.append(btn);

    const input: HTMLInputElement = document.createElement('input');
    input.className = 'main__page-input';
    input.type = 'number';

    input.value = view === 'garage' ? String(this.state.getGaragePage()) : String(this.state.getWinnersPage());

    wrapper.append(input);

    btn = new ButtonElement('main__page-right', '>>').button;

    wrapper.append(btn);

    return wrapper;
  }
}
