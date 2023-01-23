import './garage-menu.scss';
import ButtonElement from '../button/button';
import State from '../../utils/state';
import GarageController from '../../controllers/garage-controller';

export default class GarageMenu {
  public btnCreateUpdate: ButtonElement | undefined;

  public btnRace: ButtonElement | undefined;

  public btnReset: ButtonElement | undefined;

  public btnGenerateCars: ButtonElement | undefined;

  public MenuGarage: HTMLElement;

  private controller: GarageController;

  constructor() {
    this.MenuGarage = this.createGarageMenu();
    this.controller = new GarageController();
    this.controller.addMenuElems(this.MenuGarage);
    this.controller.addMenuListeners();
  }

  private createGarageMenu(): HTMLElement {
    const wrapper: HTMLElement = document.createElement('div');
    wrapper.className = 'main__garage-menu';

    let block: HTMLElement = document.createElement('div');
    block.className = 'main__block-manipulate';

    const state: State = new State();

    let input: HTMLInputElement = document.createElement('input');
    input.className = 'main__car-name';
    input.type = 'text';
    input.placeholder = 'Enter car name';
    input.value = state.getName() || '';

    block.append(input);

    input = document.createElement('input');
    input.className = 'main__car-palette';
    input.type = 'color';
    input.value = state.getColor() || '#ffffff';

    block.append(input);

    this.btnCreateUpdate = new ButtonElement('main__update-create', 'Create car');
    this.btnCreateUpdate.button.dataset.mode = 'create';

    block.append(this.btnCreateUpdate.button);

    wrapper.append(block);

    block = document.createElement('div');
    block.className = 'main__block-buttons';

    this.btnRace = new ButtonElement('main__button-race', 'Race');

    block.append(this.btnRace.button);

    this.btnReset = new ButtonElement('main__button-reset', 'Reset');

    block.append(this.btnReset.button);

    this.btnGenerateCars = new ButtonElement('main__button-generate', 'Generate 100 cars!');

    block.append(this.btnGenerateCars.button);

    wrapper.append(block);

    return wrapper;
  }
}
