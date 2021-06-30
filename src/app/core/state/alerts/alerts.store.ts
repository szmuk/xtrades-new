import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Alert, AlertDetailed } from '../../models/alert';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AlertsState extends EntityState<Alert> {
  detailedAlert: AlertDetailed;
}

const initialState = {
  detailedAlert: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'alerts' })
export class AlertsStore extends EntityStore<AlertsState, Alert> {
  constructor() {
    super(initialState);
  }
}
