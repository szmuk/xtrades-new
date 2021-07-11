import { Component, Input, OnInit } from '@angular/core';
import { Trending } from 'src/app/core/models/trending';

@Component({
  selector: 'app-trending-tile',
  templateUrl: './trending-tile.component.html',
  styleUrls: ['./trending-tile.component.scss'],
})
export class TrendingTileComponent implements OnInit {

  @Input() trending: Trending;
  @Input() loading: boolean;

  chartUrl: string;

  percent: number;
  label: string;

  constructor() { }

  ngOnInit() {
    this.percent = this.trending?.percent;

    if (this.trending?.isBullish) {
      this.chartUrl = 'bullish.png';
      this.label = 'bullish';
    } else {
      this.chartUrl = 'bearish.png';
      this.label = 'bearish';
    }
  }

}
