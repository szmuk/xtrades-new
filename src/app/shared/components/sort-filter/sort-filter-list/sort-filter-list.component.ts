import { Component } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { SortFilterComponentOption } from '../sort-filter.component';

@Component({
  templateUrl: './sort-filter-list.component.html',
  styleUrls: ['./sort-filter-list.component.scss'],
})
export class SortFilterListComponent {

  options: SortFilterComponentOption[];
  selected: SortFilterComponentOption;

  constructor(public navParams: NavParams, public popoverController: PopoverController) {
    this.options = this.navParams.data.options;
    this.selected = this.navParams.data.selected;
  }

  select(option) {
    this.popoverController.dismiss(option);
  }
}
