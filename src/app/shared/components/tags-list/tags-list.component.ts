import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Tag } from '../tag/tag.component';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsListComponent implements OnInit {

  @Input() tags: string[];
  @Input() dark = true;
  @Input() showAmount = 2;

  tagsShow: string[];
  tagsRest: string[];

  constructor() { }

  ngOnInit() {
    this.tagsShow = this.tags.slice(0, this.showAmount);
    this.tagsRest = this.tags.slice(this.showAmount, this.tags.length);
  }

}
