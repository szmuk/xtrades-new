import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {

  @Input() profileId: string;
  @Input() alertsCount = 0;
  @Input() showBorder = true;

  url: string;

  ngOnInit() {
    this.url = `${environment.storageBaseUrl}/avatars/${this.profileId}.png`;
  }

  error() {
    this.url = 'assets/missing-avatar.png';
  }
}
