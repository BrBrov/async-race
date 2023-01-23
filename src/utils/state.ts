export default class State {
  private state: StateData | undefined;

  constructor() {
    this.getState();
  }

  public getView(): string {
    if (!this.state) {
      this.getState();
    }
    return this.state!.view;
  }

  public setView(view: string): void {
    if (!this.state) {
      this.getState();
    }
    this.state!.view = view;
    this.setState();
  }

  public getGaragePage(): number {
    if (!this.state) {
      this.getState();
    }
    return this.state!.garagePage;
  }

  public setGaragePage(page: number): void {
    if (!this.state) {
      this.getState();
    }
    this.state!.garagePage = page;
    this.setState();
  }

  public getWinnersPage(): number {
    if (!this.state) {
      this.getState();
    }
    return this.state!.winnersPage;
  }

  public setWinnersPage(page: number): void {
    if (!this.state) {
      this.getState();
    }
    this.state!.winnersPage = page;
    this.setState();
  }

  public getSort(): string {
    return <string> this.state!.sort;
  }

  public setSort(sort: string): void {
    if (!this.state) {
      this.getState();
    }
    this.state!.sort = sort;
    this.setState();
  }

  public getOrder(): string {
    if (this.state) {
      this.getState();
    }
    return <string> this.state!.order;
  }

  public setOrder(order: string): void {
    if (this.state) {
      this.getState();
    }
    this.state!.order = order;
    this.setState();
  }

  public getName(): string {
    return this.state!.name;
  }

  public setName(name: string): void {
    if (this.state) {
      this.getState();
    }
    this.state!.name = name;
    this.setState();
  }

  public getColor(): string {
    return this.state!.color;
  }

  public setColor(color: string): void {
    if (this.state) {
      this.getState();
    }
    this.state!.color = color;
    this.setState();
  }

  private getState(): void {
    const data = localStorage.getItem('state');
    if (!data) {
      this.state = {
        view: 'garage',
        garagePage: 1,
        winnersPage: 1,
        sort: 'id',
        order: 'DESC',
        name: '',
        color: '',
      };
      this.setState();
      return;
    }
    this.state = JSON.parse(data);
  }

  private setState(): void {
    localStorage.setItem('state', JSON.stringify(this.state));
  }
}
