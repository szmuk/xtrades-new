import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient: HttpClient) {
  }

  get(target: ApiTarget, url: string) {
    return this.httpClient.get('/api/v1/alerts?page=1&selectedFilter=0&timeframe=0', { headers: this.getHeaders(target)});
  }

  post(target: ApiTarget, url: string, body: any) {
    return this.httpClient.post(url, body, { headers: this.getHeaders(target) });
  }

  private getHeaders(target: ApiTarget): any {
    if (target === ApiTarget.functions) {
      return { 'x-functions-key': '9cAee/4ekOMeUzMDiF1skPZi1QmjhsrvX9l9FY2rgyGT/bIGEqgxBQ==' };
    }
  }
}

export enum ApiTarget {
  functions,
  api
}
