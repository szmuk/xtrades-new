import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Alert } from '../../models/alert';
import { AlertsQuery } from './alerts.query';
import { AlertsStore } from './alerts.store';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  data: Alert[] = [
    {
      id: 1,
      company: {
        id: 1,
        code: 'AAPL',
        name: 'Apple Inc',
        imageUrl: 'apple.png'
      },
      user: {
        id: 1,
        name: 'CKadera',
        login: 'ckadera',
        imageUrl: 'p1.jpg',
        alertsCount: 88,
        following: true
      },
      closed: moment().subtract(3, 'hours').toDate(),
      opened: moment().subtract(3, 'days').toDate(),
      type: 'Swing',
      gainLoss: 4,
      likesCount: 24,
      savedCount: 7,
      commentsCount: 37,
      top: true,
      liked: true,
      saved: false,
      commented: true,
      price: 210.22,
      currency: '$'
    },
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
      id: 4,
      company: {
        id: 2,
        code: 'TSLA',
        name: 'Tesla Inc',
        imageUrl: 'tesla.png'
      },
      user: {
        id: 1,
        name: 'CKadera',
        login: 'ckadera',
        imageUrl: 'p1.jpg',
        alertsCount: 88,
        following: true
      },
      closed: null,
      opened: moment().subtract(6, 'days').toDate(),
      type: 'Day',
      gainLoss: 11,
      likesCount: 14,
      savedCount: 2,
      commentsCount: 7,
      top: false,
      liked: true,
      saved: false,
      commented: false,
      price: 130.22,
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
    },
    {
      id: 5,
      company: {
        id: 4,
        code: 'AMZN',
        name: 'Amazon.com',
        imageUrl: 'amazon.png'
      },
      user: {
        id: 1,
        name: 'CKadera',
        login: 'ckadera',
        imageUrl: 'p1.jpg',
        alertsCount: 88,
        following: true
      },
      closed: null,
      opened: moment().subtract(7, 'days').toDate(),
      type: 'Day',
      gainLoss: -19,
      likesCount: 1,
      savedCount: 2,
      commentsCount: 2,
      top: false,
      liked: false,
      saved: true,
      commented: false,
      price: 310.36,
      currency: '$'
    }
  ];

  constructor(
    private alertsStore: AlertsStore,
    private alertsQuery: AlertsQuery) {
  }

  getAlerts(): any {
    return of(this.data).pipe(tap(data => this.alertsStore.set(data))).subscribe();
  }

  save(alert: Alert) {
    const entity = cloneDeep(this.alertsQuery.getEntity(alert.id));
    entity.saved = !entity.saved;
    this.alertsStore.update(entity.id, entity);
  }

  like(alert: Alert) {
    const entity = cloneDeep(this.alertsQuery.getEntity(alert.id));
    entity.liked = !entity.liked;
    this.alertsStore.update(entity.id, entity);
  }

  getAlertDetails(alertId: number) {
    const entity = cloneDeep(this.alertsQuery.getEntity(alertId));
    entity.descriptionTitle = 'SPY entry at old support';
    entity.descriptionHtml = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley <br><br> of
    type
    and
    scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
    into
    electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
    release
    of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
    like Aldus PageMaker including versions of Lorem Ipsum.
  </div>`;
    entity.graphUrl = 'graph-big.png';
    entity.comments = [
      {

        id: '1',
        text: 'This is a very good alert',
        date: moment().subtract(1, 'days').toDate(),
        user: {
          id: 1,
          name: 'CKadera',
          login: 'ckadera',
          imageUrl: 'p1.jpg',
          alertsCount: 88,
          following: true
        }
      },
      {
        id: '2',
        // eslint-disable-next-line max-len
        text: 'Thtaining Lorem Ipsum passages, and more recently with de. scrambled it to make a type specimen book. It has survived not only five centuries.',
        date: moment().subtract(2, 'days').toDate(),
        user: {
          id: 2,
          name: 'Adam',
          login: 'szmuk',
          imageUrl: 'p2.jpg',
          alertsCount: 38,
          following: false
        },
      },
      {
        id: '3',
        // eslint-disable-next-line max-len
        text: 'It has survived not only five centuries. Scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap.',
        date: moment().subtract(2, 'hours').toDate(),
        user: {
          id: 2,
          name: 'Adam',
          login: 'szmuk',
          imageUrl: 'p2.jpg',
          alertsCount: 38,
          following: false
        }
      },
      {
        id: '4',
        text: 'It has survived not only five centuries.',
        date: moment().subtract(22, 'days').toDate(),
        user: {
          id: 1,
          name: 'CKadera',
          login: 'ckadera',
          imageUrl: 'p1.jpg',
          alertsCount: 88,
          following: true
        }
      }
    ];

    this.alertsStore.update({ detailedAlert: entity });
  }
}

