export interface ICautionTerm {
  termId: number;
  termMax: number;
  maxAmount: number;
  date: string;
}

export interface ICautionTermsGetParams {
  cautionType: string;
  currency: string;
  workDay: boolean;
}

export type CautionTermsGetResponse = ICautionTerm[];

export interface ICautionTermsGetResponseAdapted {
  terms: ICautionTerm[];
  calendar: {
    minDate: string;
    maxDate: string;
    holidays: string[];
  }
}

export interface ICautionQuotesGetParams {
  term: number;
  currency: 'ars' | 'usd';
  cautionType: string;
}

interface ICautionQuote {
  takerAmount: number;
  placementAmount: number;
  takerRate: number;
  placementRate: number;
  index: number;
}

export type CautionQuotesGetResponse = ICautionQuote[];

export interface ICautionQuotesGetResponseAdapted {
  quotesData: { bidAmount: number[];
    bidRate: number[];
    placementRate: number[];
    placementAmount: number[]; },
  tallRows: boolean[]
}

export interface ICautionPlacementPostParams {
  priceType: 'limit' | 'market';
  termId: number;
  currency: 'ars';
  rate: number;
  amount: number;
  sourceId: 0;
}

export interface ISuccessCautionPlacement {
  type: number;
  transactionId: number;
  amount: number;
  futureAmount: number;
  interest: number;
  rate: number;
  customerId: number;
  term: {
    termId: number;
    termMax: number;
    maxAmount: number;
    date: string;
  },
  priceType: number;
  fees: {
    feeType: number;
    commissionType: number;
    commissionCurrency: number;
    amount: number;
    ivaAmount: number;
  }[],
  currency: number;
  validity: string;
  sourceId: number;
  dueDate: string;
  daysToMaturity: number;
}

export interface IErrorCautionPlacement {
  esCorrecto: boolean;
  mensajesError: {
    key: string;
    value: string
  }[]
}

export type CautionPlacementPostResponse = ISuccessCautionPlacement | IErrorCautionPlacement;

export interface ICautionPlacementPostResponseAdapted {
  transactionId: string;
  estimatedAmount: number;
}
