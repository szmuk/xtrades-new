import { Company } from './company';

export class Trending {
  id: number;
  company: Company;
  alertsCount: number;
  bullishPercent: number;
  bearishPercent: number;
  date: Date;
}
