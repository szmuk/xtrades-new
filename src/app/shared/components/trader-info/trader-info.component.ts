import { Component, Input, OnInit } from '@angular/core';
import { PersonDetailed } from 'src/app/core/models/person';

@Component({
  selector: 'app-trader-info',
  templateUrl: './trader-info.component.html',
  styleUrls: ['./trader-info.component.scss'],
})
export class TraderInfoComponent implements OnInit {

  @Input() traderId: number;

  trader: PersonDetailed;


  ngOnInit() {
  }
}
