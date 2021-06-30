import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { of } from 'rxjs';
import { PersonDetailed } from '../../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  detailedTrader: PersonDetailed = {
    id: 2,
    name: 'Adam',
    login: 'szmuk',
    imageUrl: 'p2.jpg',
    alertsCount: 38,
    following: false,
    stats: {
      rank: 23,
      winRatePercent: 88,
      avgGainPercent: 12,
      avgTradeTime: 18
    },
    style: ['Lotto', 'Risky', 'Aggresive', 'Day trades', 'Penny stocks'],
    alerts: [
      {
        id: 2,
        company: {
          id: 3,
          code: 'SPY',
          name: 'S&P 500 Index',
          imageUrl: 'spy.png'
        },
        user: {
          id: 2,
          name: 'Adam',
          login: 'szmuk',
          imageUrl: 'p2.jpg',
          alertsCount: 38,
          following: false
        },
        closed: null,
        opened: moment().subtract(1, 'days').toDate(),
        type: 'Day',
        gainLoss: 6,
        likesCount: 14,
        savedCount: 2,
        commentsCount: 7,
        top: false,
        liked: false,
        saved: false,
        commented: false,
        price: 110.22,
        currency: '$'
      },
      {
        id: 3,
        company: {
          id: 2,
          code: 'TSLA',
          name: 'Tesla Inc',
          imageUrl: 'tesla.png'
        },
        user: {
          id: 2,
          name: 'Adam',
          login: 'szmuk',
          imageUrl: 'p2.jpg',
          alertsCount: 38,
          following: false
        },
        closed: moment().subtract(1, 'days').toDate(),
        opened: moment().subtract(2, 'days').toDate(),
        type: 'Day',
        gainLoss: -12,
        likesCount: 14,
        savedCount: 2,
        commentsCount: 7,
        top: false,
        liked: false,
        saved: true,
        commented: false,
        price: 110.36,
        currency: '$'
      }
    ]
  };

  constructor() {
  }

  getPersonDetails(personId: number): Promise<PersonDetailed> {
    return of(this.detailedTrader).toPromise();
  }

}

