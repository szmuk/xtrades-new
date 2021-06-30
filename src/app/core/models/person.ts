import { Alert } from './alert';

export class Person {
  id: number;
  name: string;
  login: string;
  imageUrl: string;
  alertsCount: number;
  following: boolean;
}
export class PersonDetailed extends Person {
  stats: PersonStats;
  style: string[];
  alerts: Alert[];
}

export class PersonStats {
  rank: number;
  winRatePercent: number;
  avgGainPercent: number;
  avgTradeTime: number;
}
