import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as moment from 'moment';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Alert } from '../../models/alert';
import { ApiTarget, HttpService } from '../../services/http/http.service';
import { AlertsQuery } from './alerts.query';
import { AlertsStore } from './alerts.store';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private httpService: HttpService,
    private alertsStore: AlertsStore,
    private alertsQuery: AlertsQuery) {
  }

  getAlerts(filter: string): any {
    this.alertsStore.setLoading(true);
    return this.httpService.get(ApiTarget.api, `/api/v1/alerts?page=1&selectedFilter=${filter}&timeframe=0`).pipe(
      map((res: any) => res.data),
      tap(data => {
        this.alertsStore.set(data);
        this.alertsStore.update({ initialized: true });
        this.alertsStore.setLoading(false);
      }),
      catchError(err => {
        console.log('adam err', err);
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

