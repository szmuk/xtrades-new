import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Alert } from '@core/models/alert';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentimentComponent implements OnInit {

  @Input() alert: Alert;

  constructor() { }

  ngOnInit() {}

  like(event, alert: Alert) {
    event.preventDefault();
  }

  save(event, alert: Alert) {
    event.preventDefault();
  }
  comment(event, alert: Alert) {
    event.preventDefault();
  }
}
