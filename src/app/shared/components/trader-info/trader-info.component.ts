import { Component, Input, OnInit } from '@angular/core';
import { PersonDetailed } from 'src/app/core/models/person';
import { PeopleService } from 'src/app/core/services/people/people.serice';

@Component({
  selector: 'app-trader-info',
  templateUrl: './trader-info.component.html',
  styleUrls: ['./trader-info.component.scss'],
})
export class TraderInfoComponent implements OnInit {

  @Input() traderId: number;

  trader: PersonDetailed;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPersonDetails(this.traderId).then(x => {
      this.trader = x;
    });
  }
}
