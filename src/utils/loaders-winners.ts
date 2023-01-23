import Loafer from './loader';

export default class WinnersLoader extends Loafer {
  private readonly host: string = 'http://127.0.0.1:3000';

  private readonly winners: string = '/winners';

  public async getWinners(
    page?: number,
    limit?: number,
    sort?: string,
    order?: string,
  ): Promise<AllWinners> {
    // _page = number
    // _limit = number
    // _sort = 'id'|'wins'|'time'
    // _order= 'ASC'|'DESC'
    // If _limit param is passed api returns a header X-Total-Count that
    // contains total number of records.
    let path = '';
    if (page) {
      path += `?_page=${page}`;
    }
    if (limit) {
      path += !page ? `?_limit=${limit}` : `&_limit=${limit}`;
    }
    if (sort) {
      path += !page || !limit ? '?' : '&';
      path += `_sort=${sort}`;
    }
    if (order) {
      path += (!page || !limit || !sort) ? '?' : '&';
      path += `_order=${order}`;
    }
    const url: URL = new URL(this.winners + path, this.host);
    return this.RequestServer(url, { method: 'GET' });
  }

  public async getWinner(id: number): Promise<Winner | EmptyObject> {
    const url: URL = new URL(`${this.winners}/${id}`, this.host);
    return this.RequestServer<Winner | EmptyObject>(url, { method: 'GET' });
  }

  public async createWinner(id: number, wins: number, time: number): Promise<Winner> {
    const url: URL = new URL(this.winners, this.host);
    const data: Winner = {
      id,
      wins,
      time,
    };
    const requestInit: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    return this.RequestServer<Winner>(url, requestInit);
  }

  public async deleteWinner(id: number): Promise<EmptyObject> {
    const url: URL = new URL(`${this.winners}/${id}`, this.host);
    return this.RequestServer<EmptyObject>(url, { method: 'DELETE' });
  }

  public async updateWinner(id: number, wins: number, time: number): Promise<Winner | EmptyObject> {
    const url: URL = new URL(`${this.winners}/${id}`, this.host);
    const body: WinnerParam = {
      wins,
      time,
    };
    const requestInit: RequestInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return this.RequestServer<Winner | EmptyObject>(url, requestInit);
  }

  public getCountWinners(): number | null {
    if (!this.countWinners) {
      return null;
    }
    return this.countWinners;
  }
}
