import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Alert } from '@core/models/alert';

@Component({
  selector: 'app-alert-result',
  templateUrl: './alert-result.component.html',
  styleUrls: ['./alert-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertResultComponent implements OnInit {

  @Input() alert: Alert;

  constructor() { }

  ngOnInit() {}

}
