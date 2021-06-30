import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { SortFilterListComponent } from './sort-filter-list/sort-filter-list.component';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss'],
})
export class SortFilterComponent {
  @Input() label: string;
  @Input() display: 'dropdown' | 'bar' = 'dropdown';

  @Input() options: SortFilterComponentOption[];
  @Input() placeholder: string;

  @Input() value: SortFilterComponentOption;
  @Output() valueChange = new EventEmitter<SortFilterComponentOption>();

  constructor(public popoverController: PopoverController) { }

  async openOptions(ev) {
    const popover = await this.popoverController.create({
      component: SortFilterListComponent,
      event: ev,
      translucent: true,
      componentProps: { options: this.options, selected: this.value }
    });

    popover.onDidDismiss().then(response => {
      if (response?.data) {
        this.optionSelected(response.data);
      }
    });

    await popover.present();
  }

  optionSelected(option) {
    this.value = option;
    this.valueChange.emit(this.value);
  }
}

export class SortFilterComponentOption {
  key: string;
  value: string;
}
