import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { HeaderOptionsComponent } from './header-options/header-options.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(private popoverController: PopoverController) { }

  ngOnInit() { }

  async openOptions(ev) {
    const popover = await this.popoverController.create({
      component: HeaderOptionsComponent,
      event: ev,
      translucent: true
    });

    await popover.present();
  }
}
