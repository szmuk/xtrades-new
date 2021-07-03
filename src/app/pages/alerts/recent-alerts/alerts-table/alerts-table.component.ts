import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Alert } from 'src/app/core/models/alert';
import { AlertsService } from 'src/app/core/state/alerts/alerts.service';
import { AlertModalComponent, AlertModalInput } from 'src/app/shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsTableComponent implements OnInit {

  @Input() alerts: Alert[];
  @Input() loading: boolean;

  constructor(private alertsService: AlertsService, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  getDate(date: Date) {
    const momentDate = moment(date);
    if (momentDate.isAfter(moment().subtract(moment().hour(), 'hours'))) {
      return momentDate.format('h:mm A');
    } else if (momentDate.isAfter(moment().subtract(2, 'days'))) {
      return 'yesterday';
    } else if (momentDate.isAfter(moment().subtract(3, 'days'))) {
      return '2 days ago';
    } else {
      return momentDate.format('DD/MM');
    }
  }

  trackByFn(index, item) {
    return item.id;
  }

  like(event, alert: Alert) {
    event.preventDefault();
    this.alertsService.like(alert);
  }

  save(event, alert: Alert) {
    event.preventDefault();
    this.alertsService.save(alert);
  }
  comment(event, alert: Alert) {
    event.preventDefault();
  }

  async openAlert(alert: Alert) {

    const data: AlertModalInput = {
      alert
    };

    const previewModal = await this.modalCtrl.create({
      component: AlertModalComponent,
      cssClass: 'modal-very-big',
      componentProps: data,
      backdropDismiss: true,
    });

    await previewModal.present();
  }
}
