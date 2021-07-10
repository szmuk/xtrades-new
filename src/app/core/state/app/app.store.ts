import { Injectable } from '@angular/core';
import { TemporaryXtradesAuthObject } from '@core/services/authentication/authentication.service';
import { Store, StoreConfig } from '@datorama/akita';
import { AppScreenMode } from './app.service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState extends Store<AppState> {
  sideMenuCollapsed: boolean;
  auth: TemporaryXtradesAuthObject;
  initialScreenMode: AppScreenMode;
}

const initialState = {
  sideMenuCollapsed: false,
  auth: null,
  initialScreenMode: null
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(initialState);
  }
}
