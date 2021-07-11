import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiTarget, HttpService } from '../../services/http/http.service';
import { TrendingQuery } from './trending.query';
import { TrendingStore } from './trending.store';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(
    private httpService: HttpService,
    private trendingStore: TrendingStore,
    private trendingQuery: TrendingQuery) {

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl('https://functions.alpha.xtrades.net/api/v1')
      .build();

    connection.start().then(() => {
      console.log('connected to signal-r');
    }).catch((err) => console.error(err));

    connection.on('newAlert', (message: string) => {
      console.log(message);
    });

    connection.onclose(() => console.log('disconnected from signal-r'));
  }

  getTrending(): any {
    this.trendingStore.setLoading(true);

    return this.httpService.get(ApiTarget.api, ('/api/v1/alerts/trending')).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.trendingStore.setLoading(false);
        this.trendingStore.set(data);
        this.trendingStore.update({ initialized: true });
      }),
      catchError(err => {
        this.trendingStore.setLoading(false);
        this.trendingStore.set([]);
        return of(null);
      })
    ).subscribe();
  }

}

