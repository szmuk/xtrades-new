
export class Alert {
  actualPriceAtTimeOfAlert: number;
  alertSentimentDislikeCount: number;
  alertSentimentHasDisliked: boolean;
  alertSentimentHasLiked: boolean;
  alertSentimentLikeCount: number;
  alertSentimentTotal: number;
  alertClosedDate: Date;
  audit: Audit;
  diffCalc: number;
  direction: number;
  flagWasReviewed: boolean;
  formattedDetails: string;
  formattedLength: string;
  formattedLengthShort: string;
  id: string;
  isAnalyst: boolean;
  isExperimental: boolean;
  isFlagged: boolean;
  isProfitableTrade: boolean;
  isShort: boolean;
  isSwing: boolean;
  lastCheckedPrice: number;
  lastKnownPercentProfit: number;
  originalMessage: string;
  pricePaid: number;
  profitPossiblePercent: number;
  result: number;
  risk: number;
  shouldSendNotification: boolean;
  showExpansion: boolean;
  side: number;
  status: number;
  symbol: string;
  timeOfEntryAlert: Date;
  type: number;
  userId: string;
  userMeta: UserMeta;
  userName: string;
  xscore: number;
}

export class Audit {
  createdDate: Date;
}

export class UserMeta {
  avatar: string;
  userId: string;
  username: string;
  xScore: number;
}
