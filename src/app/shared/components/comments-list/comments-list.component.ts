import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Comment } from 'src/app/core/models/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent implements OnInit {

  @Input() comments: Comment[];

  today: Comment[];
  yesterday: Comment[];
  older: Comment[];

  ngOnInit() {
    const sorted = this.comments.sort((a, b) => a.date < b.date ? 1 : -1);

    this.today = sorted.filter(x => moment(x.date).isAfter(moment().subtract(moment().hour(), 'hours')));
    let left = sorted.filter(x => !this.today.includes(x));

    this.yesterday = left.filter(x => moment(x.date).isAfter(moment().subtract(2, 'days')));
    left = left.filter(x => !this.yesterday.includes(x));

    this.older = left.filter(x => !this.yesterday.includes(x));
  }

}
