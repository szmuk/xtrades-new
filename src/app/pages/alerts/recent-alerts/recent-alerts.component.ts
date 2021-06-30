import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert } from 'src/app/core/models/alert';
import { AlertsQuery } from 'src/app/core/state/alerts/alerts.query';
import { AlertsService } from 'src/app/core/state/alerts/alerts.service';
import { SortFilterComponentOption } from 'src/app/shared/components/sort-filter/sort-filter.component';

@Component({
  selector: 'app-recent-alerts',
  templateUrl: './recent-alerts.component.html',
  styleUrls: ['./recent-alerts.component.scss'],
})
export class RecentAlertsComponent implements OnInit, OnDestroy {

  sortedFilteredAlertsList: Alert[];
  alertsList: Alert[];

  subscription = new Subscription();

  selectedSortOption: SortFilterComponentOption;

  sortOptions: SortFilterComponentOption[] = [
    {
      key: 'opened',
      value: 'Opened'
    },
    {
      key: 'closed',
      value: 'Closed'
    },
    {
      key: 'price',
      value: 'Price'
    },
    {
      key: 'gain',
      value: 'Gain'
    },
  ];

  selectedFilterOption: SortFilterComponentOption;

  filterOptions: SortFilterComponentOption[] = [
    {
      key: 'all',
      value: 'All'
    },
    {
      key: 'top',
      value: 'Top Alerts'
    },
    {
      key: 'following',
      value: 'Following'
    },
  ];

  constructor(private alertsService: AlertsService, private alertsQuery: AlertsQuery) { }

  ngOnInit() {
    this.selectedFilterOption = this.filterOptions.find(x => x.key === 'all');

    this.subscription.add(
      this.alertsQuery.selectAll().pipe(filter(x => !!x && x.length > 0)).subscribe(alerts => {
        this.alertsList = alerts;
        this.filterChanged();
      }));

    this.alertsService.getAlerts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterChanged() {
    switch (this.selectedFilterOption.key) {
      case 'top':
        this.sortedFilteredAlertsList = this.alertsList.filter(x => x.top);
        break;
      case 'following':
        this.sortedFilteredAlertsList = this.alertsList.filter(x => x.user.following);
        break;
      case 'all':
      default:
        this.sortedFilteredAlertsList = this.alertsList;
        break;
    }
    this.sortChanged();
  }

  sortChanged() {
    switch (this.selectedSortOption?.key) {
      case 'opened':
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList.sort((a, b) => a.opened < b.opened ? 1 : -1);
        break;
      case 'closed':
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList.sort((a, b) => a.closed < b.closed ? 1 : -1);
        break;
      case 'price':
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList.sort((a, b) => a.price < b.price ? 1 : -1);
        break;
      case 'gain':
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList.sort((a, b) => a.gainLoss < b.gainLoss ? 1 : -1);
        break;
      default:
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList;
        break;
    }
  }

}
