import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Trending } from '../../models/trending';
import { TrendingQuery } from './trending.query';
import { TrendingStore } from './trending.store';
import * as moment from 'moment';



@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  data: Trending[] = [
    {
      id: 1,
      company: {
        id: 1,
        code: 'AAPL',
        name: 'Apple Inc',
        imageUrl: 'apple.png'
      },
      alertsCount: 15,
      bullishPercent: 64,
      bearishPercent: 36,
      date: new Date()
    },
    {
      id: 2,
      company: {
        id: 2,
        code: 'TSLA',
        name: 'Tesla Inc',
        imageUrl: 'tesla.png'
      },
      alertsCount: 12,
      bullishPercent: 55,
      bearishPercent: 45,
      date: new Date()
    },
    {
      id: 3,
      company: {
        id: 3,
        code: 'SPY',
        name: 'S&P 500 Index',
        imageUrl: 'spy.png'
      },
      alertsCount: 7,
      bullishPercent: 36,
      bearishPercent: 64,
      date: moment().subtract(1, 'days').toDate()
    },
    {
      id: 4,
      company: {
        id: 4,
        code: 'AMZN',
        name: 'Amazon.com',
        imageUrl: 'amazon.png'
      },
      alertsCount: 17,
      bullishPercent: 55,
      bearishPercent: 45,
      date: moment().subtract(1, 'days').toDate()
    },
    {
      id: 5,
      company: {
        id: 1,
        code: 'AAPL',
        name: 'Apple Inc',
        imageUrl: 'apple.png'
      },
      alertsCount: 15,
      bullishPercent: 55,
      bearishPercent: 45,
      date: moment().subtract(8, 'days').toDate()
    },
    {
      id: 6,
      company: {
        id: 4,
        code: 'AMZN',
        name: 'Amazon.com',
        imageUrl: 'amazon.png'
      },
      alertsCount: 17,
      bullishPercent: 55,
      bearishPercent: 45,
      date: moment().subtract(8, 'days').toDate()
    },
    {
      id: 7,
      company: {
        id: 1,
        code: 'AAPL',
        name: 'Apple Inc',
        imageUrl: 'apple.png'
      },
      alertsCount: 15,
      bullishPercent: 55,
      bearishPercent: 45,
      date: moment().subtract(15, 'days').toDate()
    },
  ];

  constructor(
    private trendinStore: TrendingStore,
    private trendingQuery: TrendingQuery) {
  }

  getTrending(): any {
    return of(this.data).pipe(tap(data => this.trendinStore.set(data))).subscribe();
  }

}

