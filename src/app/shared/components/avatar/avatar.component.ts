import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person } from 'src/app/core/models/person';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() person: Person;
}
