import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppQuery } from 'src/app/core/state/app/app.query';
import { AppService } from 'src/app/core/state/app/app.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  collapsed: boolean;

  appPages = [
    { title: 'Alerts', url: '/alerts', icon: 'pulse-outline', notifications: 32 },
    { title: 'Leaderboard', url: '/leaderboard', icon: 'ribbon-outline' },
    { title: 'Xhub', url: '/xhub', icon: 'school-outline' },
  ];

  constructor(private appService: AppService, private appQuery: AppQuery) {
  }

  ngOnInit() {
    this.subscription.add(
      this.appQuery.select(x => x.sideMenuCollapsed).subscribe(collapsed => {
        this.collapsed = collapsed;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  toggle() {
    this.appService.toggleSideMenu();
  }
}
