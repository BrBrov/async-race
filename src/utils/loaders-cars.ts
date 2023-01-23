import Loader from './loader';

export default class LoadersCars extends Loader {
  private readonly host: string = 'http://127.0.0.1:3000';

  private readonly garage: string = '/garage';

  public async getCars(limit?: number, page?: number): Promise<CarsData> {
    let path = '';
    if (page) {
      path += `?_page=${page}`;
    }
    if (limit) {
      path += !page ? `?_limit=${limit}` : `&_limit=${limit}`;
    }

    const url: URL = new URL(this.garage + path, this.host);
    return this.RequestServer<CarsData>(url, { method: 'GET' });
  }

  // Operation for cars
  public async getCar(id: number): Promise<CarData> {
    const url = new URL(`${this.garage}/${id}`, this.host);
    return this.RequestServer<CarData>(url, { method: 'GET' });
  }

  public async createCar(name: string, color: string): Promise<CarData> {
    const url: URL = new URL(this.garage, this.host);
    const car: CarParams = {
      name,
      color,
    };
    const requestInit: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    };
    return this.RequestServer<CarData>(url, requestInit);
  }

  public async deleteCar(id: number): Promise<EmptyObject> {
    const url: URL = new URL(`${this.garage}/${id}`, this.host);
    return this.RequestServer<EmptyObject>(url, { method: 'DELETE' });
  }

  public async updateCar(id: number, name: string, color: string): Promise<CarData> {
    const url: URL = new URL(`${this.garage}/${id}`, this.host);
    const car: CarParams = {
      name,
      color,
    };
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    };
    return this.RequestServer(url, requestInit);
  }

  public getCountCars(): number {
    if (!this.countCars) {
      return 0;
    }
    return this.countCars;
  }
}
