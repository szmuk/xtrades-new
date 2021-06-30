import { Company } from './company';
import { Person } from './person';
import { Comment } from './comment';

export class Alert {
  id: number;
  company: Company;
  user: Person;
  closed: Date;
  opened: Date;
  type: string;
  gainLoss: number;
  likesCount: number;
  liked: boolean;
  savedCount: number;
  saved: boolean;
  commentsCount: number;
  commented: boolean;
  top: boolean;
  price: number;
  currency: string;
}

export class AlertDetailed extends Alert {
  descriptionTitle: string;
  descriptionHtml: string;
  graphUrl: string;
  comments: Comment[];
}
