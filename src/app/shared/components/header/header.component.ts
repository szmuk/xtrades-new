import { Component, Input, OnInit } from '@angular/core';
import { AppQuery } from '@core/state/app/app.query';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HeaderOptionsComponent } from './header-options/header-options.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  userId: string;

  subscription = new Subscription();

  constructor(
    private popoverController: PopoverController,
    private appQuery: AppQuery) { }

  ngOnInit() {
    this.subscription.add(
      this.appQuery.select(x => x.auth).subscribe(auth => {
        this.userId = auth.registerApiUser.userId;
      })
    );

  }

  async openOptions(ev) {
    const popover = await this.popoverController.create({
      component: HeaderOptionsComponent,
      event: ev,
      translucent: true
    });

    await popover.present();
  }
}
