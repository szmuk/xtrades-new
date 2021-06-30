import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppQuery } from './app.query';
import { AppStore } from './app.store';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  subscription = new Subscription();

  constructor(
    private appStore: AppStore,
    private appQuery: AppQuery) {
  }

  toggleSideMenu() {
    const collapsed = this.appQuery.getValue().sideMenuCollapsed;
    this.appStore.update({ sideMenuCollapsed: !collapsed });
  }

  resetSideMenu() {
    this.appStore.update({ sideMenuCollapsed: false });
  }
}

