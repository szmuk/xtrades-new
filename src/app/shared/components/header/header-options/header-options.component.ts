import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-header-options',
  templateUrl: './header-options.component.html',
  styleUrls: ['./header-options.component.scss'],
})
export class HeaderOptionsComponent implements OnInit {

  constructor(private router: Router, private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  openComponentsPage() {
    this.router.navigate(['/components']);
    this.popoverCtrl.dismiss();
  }
}
