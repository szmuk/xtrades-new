import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AlertsState, AlertsStore } from './alerts.store';

@Injectable({
  providedIn: 'root'
})
export class AlertsQuery extends QueryEntity<AlertsState, any> {
  constructor(protected store: AlertsStore) {
    super(store);
  }
}
