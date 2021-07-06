import { Injectable } from '@angular/core';
import { TemporaryXtradesAuthObject } from '@core/services/authentication/authentication.service';
import { Store, StoreConfig } from '@datorama/akita';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState extends Store<AppState> {
  sideMenuCollapsed: boolean;
  auth: TemporaryXtradesAuthObject;
}

const initialState = {
  sideMenuCollapsed: false,
  auth: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(initialState);
  }
}
