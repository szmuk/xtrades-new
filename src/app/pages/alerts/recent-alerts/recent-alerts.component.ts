import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
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
export class RecentAlertsComponent implements AfterViewInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  sortedFilteredAlertsList: Alert[] = [];
  alertsList: Alert[] = [];
  loading = false;
  noMoreToLoad = false;

  page = 1;

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
      key: '0',
      value: 'All'
    },
    {
      key: '1',
      value: 'Top Alerts'
    },
    {
      key: '2',
      value: 'Following'
    },
  ];

  constructor(
    private alertsService: AlertsService,
    private changeDetector: ChangeDetectorRef,
    private alertsQuery: AlertsQuery) { }

  ngAfterViewInit() {
    this.selectedFilterOption = this.filterOptions.find(x => x.key === '0');
    this.infiniteScroll.disabled = true;

    this.subscription.add(
      this.alertsQuery.selectAll().subscribe((alerts: Alert[]) => {
        this.alertsList = alerts;
        this.sortedFilteredAlertsList = alerts;
        // this.sortChanged();
        this.infiniteScroll.complete();
        this.infiniteScroll.disabled = false;
        this.changeDetector.markForCheck();
      }));

    this.subscription.add(
      this.alertsQuery.selectLoading().subscribe((loading: boolean) => {
        this.loading = loading;
        this.changeDetector.markForCheck();
      }));

    this.subscription.add(
      this.alertsQuery.select(x => x.noMoreToLoad).subscribe(noMore => {
        this.noMoreToLoad = noMore;
      })
    );

    // TODO: if signal-r used, probably no need to load on every page load
    this.alertsService.getAlerts('0', this.page);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // TODO: would be good to use 'all', 'following' etc instead of 1, 2, 3
  filterChanged(option) {
    if(option.key === this.selectedFilterOption.key) {
      return;
    }
    this.selectedFilterOption = option;
    this.page = 1;
    this.alertsService.getAlerts(this.selectedFilterOption.key, this.page);
    // this.sortChanged();
  }

  sortChanged() {
    switch (this.selectedSortOption?.key) {
    case 'price':
      this.sortedFilteredAlertsList = [...this.sortedFilteredAlertsList.sort((a, b) => a.pricePaid < b.pricePaid ? 1 : -1)];
      break;
    case 'gain':
      this.sortedFilteredAlertsList = [...this.sortedFilteredAlertsList.sort((a, b) => a.diffCalc < b.diffCalc ? 1 : -1)];
      break;
    default:
      this.sortedFilteredAlertsList = this.sortedFilteredAlertsList;
      break;
    }
    this.changeDetector.markForCheck();
  }

  loadData(event) {
    console.log('load more');
    this.page++;
    this.alertsService.getAlerts(this.selectedFilterOption.key, this.page);
  }
}
