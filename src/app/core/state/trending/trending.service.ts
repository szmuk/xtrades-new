import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { ApiTarget, HttpService } from '../../services/http/http.service';
import { TrendingQuery } from './trending.query';
import { TrendingStore } from './trending.store';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(
    private httpService: HttpService,
    private trendingStore: TrendingStore,
    private trendingQuery: TrendingQuery) {
  }

  getTrending(): any {
    return this.httpService.get(ApiTarget.api, ('/api/v1/alerts/trending')).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.trendingStore.set(data);
        this.trendingStore.update({ initialized: true });
      })
    ).subscribe();
  }

}

