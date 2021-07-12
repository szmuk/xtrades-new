import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppQuery } from './core/state/app/app.query';
import { AppScreenMode, AppService } from './core/state/app/app.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  collapsed = false;
  showBottomMenu = false;

  constructor(private appQuery: AppQuery, private appService: AppService) {
  }

  ngOnInit() {
    this.subscription.add(
      this.appQuery.select(x => x.sideMenuCollapsed).subscribe(collapsed => {
        this.collapsed = collapsed;
      })
    );

    this.subscription.add(
      this.appQuery.select(x => x.initialScreenMode).pipe(filter(x => !!x)).subscribe(mode => {
        this.showBottomMenu = mode === AppScreenMode.mobile;
        console.log(this.showBottomMenu);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  splitPaneChanged() {
    this.appService.resetSideMenu();
  }
}
