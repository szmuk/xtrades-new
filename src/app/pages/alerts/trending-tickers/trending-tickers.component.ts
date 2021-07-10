import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Trending } from 'src/app/core/models/trending';
import { TrendingQuery } from 'src/app/core/state/trending/trending.query';
import { TrendingService } from 'src/app/core/state/trending/trending.service';
import { SortFilterComponentOption } from 'src/app/shared/components/sort-filter/sort-filter.component';

@Component({
  selector: 'app-trending-tickers',
  templateUrl: './trending-tickers.component.html',
  styleUrls: ['./trending-tickers.component.scss'],
})
export class TrendingTickersComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  trendingList: Trending[];
  filteredTrendingList: Trending[];

  selectedSortOption: SortFilterComponentOption;

  sortOptions: SortFilterComponentOption[] = [
    {
      key: 'today',
      value: 'Today'
    },
    {
      key: 'week',
      value: 'This week'
    },
    {
      key: 'month',
      value: 'This month'
    },
  ];

  constructor(private trendingQuery: TrendingQuery, private trendingService: TrendingService) { }

  ngOnInit() {
    this.selectedSortOption = this.sortOptions.find(x => x.key === 'month');

    this.subscription.add(
      this.trendingQuery.selectAll().subscribe((trending: Trending[]) => {
        this.trendingList = trending;
        this.sortChanged();
        console.log(this.trendingList);
      })
    );

    if (!this.trendingQuery.getValue().initialized) {
      this.trendingService.getTrending();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sortChanged() {
    this.filteredTrendingList = this.trendingList;

    // let daysToSubstract: number;

    // switch (this.selectedSortOption.key) {
    //   case 'today':
    //     daysToSubstract = 1;
    //     break;
    //   case 'week':
    //     daysToSubstract = 7;
    //     break;
    //   case 'month':
    //     daysToSubstract = 30;
    //     break;
    // }

    // this.filteredTrendingList = this.trendingList.filter(x => moment(x.date).isAfter(moment().subtract(daysToSubstract, 'days')));
  }

}
