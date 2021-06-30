import { Component, Input, OnInit } from '@angular/core';
import { Trending } from 'src/app/core/models/trending';

@Component({
  selector: 'app-trending-tile',
  templateUrl: './trending-tile.component.html',
  styleUrls: ['./trending-tile.component.scss'],
})
export class TrendingTileComponent implements OnInit {

  @Input() trending: Trending;

  chartUrl: string;

  percent: number;
  label: string;

  constructor() { }

  ngOnInit() {
    if (this.trending.bullishPercent >= 50) {
      this.chartUrl = 'bullish.png';
      this.percent = this.trending.bullishPercent;
      this.label = 'bullish';
    } else {
      this.chartUrl = 'bearish.png';
      this.percent = this.trending.bearishPercent;
      this.label = 'bearish';
    }
  }

}
