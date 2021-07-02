import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentAlertsComponent implements OnInit, OnDestroy {

  sortedFilteredAlertsList: Alert[];
  alertsList: Alert[];

  subscription = new Subscription();

  selectedSortOption: SortFilterComponentOption;

  sortOptions: SortFilterComponentOption[] = [
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

  constructor(
    private alertsService: AlertsService,
    private changeDetector: ChangeDetectorRef,
    private alertsQuery: AlertsQuery) { }

  ngOnInit() {
    this.selectedFilterOption = this.filterOptions.find(x => x.key === 'all');

    this.subscription.add(
      this.alertsQuery.selectAll().pipe(filter(x => x?.length > 0)).subscribe((alerts: Alert[]) => {
        this.alertsList = alerts;
        this.filterChanged();
      }));

      if (!this.alertsQuery.getValue().initialized) {
        this.alertsService.getAlerts();
      }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // TODO: set actual filters
  filterChanged() {
    switch (this.selectedFilterOption.key) {
      case 'top':
        this.sortedFilteredAlertsList = this.alertsList.filter(x => x.xscore > 60);
        break;
      case 'following':
        this.sortedFilteredAlertsList = [];
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
      case 'price':
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList.sort((a, b) => a.pricePaid < b.pricePaid ? 1 : -1);
        break;
      case 'gain':
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList.sort((a, b) => a.diffCalc < b.diffCalc ? 1 : -1);
        break;
      default:
        this.sortedFilteredAlertsList = this.sortedFilteredAlertsList;
        break;
    }
    this.changeDetector.markForCheck();
  }

}
