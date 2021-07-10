import { Injectable } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
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

    this.checkInitialScreenMode();
  }

  toggleSideMenu() {
    const collapsed = this.appQuery.getValue().sideMenuCollapsed;
    this.appStore.update({ sideMenuCollapsed: !collapsed });
  }

  resetSideMenu() {
    this.appStore.update({ sideMenuCollapsed: false });
  }

  private checkInitialScreenMode() {
    const w = window.innerWidth;
    let screenMode = AppScreenMode.desktop;

    if (w < 768) {
      screenMode = AppScreenMode.mobile;
    } else if (w < 992) {
      screenMode = AppScreenMode.tablet;
    }

    this.appStore.update({ initialScreenMode: screenMode });
  }
}

export enum AppScreenMode {
  mobile = 1,
  tablet,
  desktop
}
