import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Alert } from '../../models/alert';
import { ApiTarget, HttpService } from '../../services/http/http.service';
import { AlertsQuery } from './alerts.query';
import { AlertsStore } from './alerts.store';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private httpService: HttpService,
    private alertsStore: AlertsStore,
    private alertsQuery: AlertsQuery) {

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

  getAlerts(filter: string, page: number): any {
    if (page === 1) {
      this.alertsStore.setLoading(true);
    }
    return this.httpService.get(ApiTarget.api, `/api/v1/alerts?page=${page}&selectedFilter=${filter}&timeframe=0`).pipe(
      map((res: any) => res.data),
      tap(data => {
        if (page !== 1 && data?.length < 1) {
          this.alertsStore.update({ noMoreToLoad: true });
        } else {
          this.alertsStore.update({ noMoreToLoad: false });
        }

        this.alertsStore.upsertMany(data);
        this.alertsStore.update({ initialized: true });
        this.alertsStore.setLoading(false);
      }),
      catchError(err => {
        this.alertsStore.setLoading(false);
        this.alertsStore.set([]);
        return of(null);
      })
    ).subscribe();
  }

  save(alert: Alert) {
  }

  like(alert: Alert) {
  }

}

