import { Component, Input } from '@angular/core';
import { Company } from 'src/app/core/models/company';

@Component({
  selector: 'app-company-logo',
  templateUrl: './company-logo.component.html',
  styleUrls: ['./company-logo.component.scss'],
})
export class CompanyLogoComponent {

  @Input() company: Company;

}
