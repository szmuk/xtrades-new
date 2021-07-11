import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Alert } from '../../models/alert';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AlertsState extends EntityState<Alert> {
  initialized: boolean;
  noMoreToLoad: boolean;
  newAlertsCount: number;
}

const initialState = {
  initialized: false,
  noMoreToLoad: false,
  newAlertsCount: 0
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'alerts' })
export class AlertsStore extends EntityStore<AlertsState, Alert> {
  constructor() {
    super(initialState);
  }
}
