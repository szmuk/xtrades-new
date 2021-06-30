import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState extends Store<AppState> {
  sideMenuCollapsed: boolean;
}

const initialState = {
  sideMenuCollapsed: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(initialState);
  }
}
