import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyLogoComponent {

  @Input() url = 'assets/missing-company.png';

  error() {
    this.url = 'assets/missing-company.png';
  }
}
