export default class Loader {
  protected countCars: number | undefined;

  protected countWinners: number | undefined;

  protected async RequestServer<T>(url: URL, options?: RequestInit): Promise<T> {
    const response: Response = await fetch(url, options!);
    if (!response.ok) return <T> {};
    const data = await response.json();
    if (data.length && data.length !== 0) {
      if (this.checkTypeCarsData(data)) {
        const count = response.headers.get('X-Total-Count');
        if (count) this.countCars = Number(count);
      }
      if (this.checkTypeAllWinners(data)) {
        const count = response.headers.get('X-Total-Count');
        if (count) this.countWinners = Number(count);
      }
    }
    return data;
  }

  private checkTypeAllWinners(data: AllWinners): data is AllWinners {
    return !!(Array.isArray(data) && data[0].time);
  }

  private checkTypeCarsData(data: CarsData): data is CarsData {
    return !!(Array.isArray(data) && data[0].color);
  }
}
