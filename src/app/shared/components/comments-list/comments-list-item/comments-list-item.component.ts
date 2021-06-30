import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/comment';

@Component({
  selector: 'app-comments-list-item',
  templateUrl: './comments-list-item.component.html',
  styleUrls: ['./comments-list-item.component.scss'],
})
export class CommentsListItemComponent {
  @Input() comment: Comment;
}
