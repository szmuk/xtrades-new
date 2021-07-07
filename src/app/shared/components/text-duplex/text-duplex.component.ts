import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-duplex',
  templateUrl: './text-duplex.component.html',
  styleUrls: ['./text-duplex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextDuplexComponent {

  @Input() upper: string;
  @Input() lower: string;

}
