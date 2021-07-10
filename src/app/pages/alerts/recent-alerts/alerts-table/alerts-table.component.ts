import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild } from '@angular/core';
import { AppQuery } from '@core/state/app/app.query';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Alert } from 'src/app/core/models/alert';
import { AlertsService } from 'src/app/core/state/alerts/alerts.service';
import { AlertModalComponent, AlertModalInput } from 'src/app/shared/components/alert-modal/alert-modal.component';

@Component({
  selector: 'app-alerts-table',
  templateUrl: './alerts-table.component.html',
  styleUrls: ['./alerts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsTableComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input() alerts: Alert[];
  @Input() loading: boolean;


  @ViewChild('table', { static: true, read: ElementRef }) private table: any;

  tableWidth: number;

  smallerDesktopBreakpoint = 1200;
  tabletBreakpoint = 968;
  mobileBreakpoint = 740;

  private subscription = new Subscription();


  constructor(
    private alertsService: AlertsService,
    private modalCtrl: ModalController,
    private changeDetector: ChangeDetectorRef,
    private appQuery: AppQuery) { }

  ngOnInit() {
    this.subscription.add(
      this.appQuery.select(x => x.sideMenuCollapsed).pipe(debounceTime(100)).subscribe(collapsed => {
        this.checkTableWidth();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked() {
    this.checkTableWidth();
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

  itemHeightFn(item, index) {
    return 95;
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

  private checkTableWidth() {
    this.tableWidth = this.table.nativeElement.offsetWidth;
    console.log('Tab width', this.table.nativeElement.offsetWidth);
    this.changeDetector.markForCheck();
  }
}
