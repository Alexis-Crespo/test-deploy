// Internal
import { CURRENCIES, ORDER_TAB_KEYS } from '../enums';

export interface ISimpleOperationParametersGetResponse {
  operationTypeId: number;
  productId: number;
  name: string;
  description: string;
  purchaseSymbol: string;
  saleSymbol: string;
  minimumLimitAmount: number;
  maximumLimitAmount: number;
  currencyIdLimitAmount: number;
  preOrderExpirationTime: number;
  purchaseTradingTermId: number;
  saleTradingTermId: number;
  openingHours: string;
  closingHours: string;
  isValidSchedule: boolean;
  settlementDate: string;
  currencyLimitAmount: string
}

export interface IReferenceValueMepGetParams {
  [key: string]: string | number | boolean | null;
  symbol: string,
  term: number,
  saleOperationTermId: number
}

export interface IDollarMepPreviewGetResponseAdapted {
  buyPrice: number;
  sellPrice: number;
  lastUpdate: string;
  openToOperate: boolean;
  isMarketClosed: boolean;
}

// Used in simpleOperationParameters.ts
export interface ISimpleOperationParametersGetResponseAdapted {
  lastUpdate: string;
  buy: {
    currencyLimitAmount: CURRENCIES;
    minimumLimitAmount: number;
    maximumLimitAmount: number;
    symbol: string;
    settlementDate: Date;
  };
  sell: {
    currencyLimitAmount: CURRENCIES;
    minimumLimitAmount: number;
    maximumLimitAmount: number;
    symbol: string;
    settlementDate: Date;
  }
}

// Used in estimatedAmountsMep.ts
export interface IEstimatedAmountsMepGetResponse {
  estimatedAmount: number;
  grossAmount: number;
  netAmount: number;
  purchaseCommission: number;
  saleCommission: number;
  ivaPurchaseCommission: number;
  ivaSaleCommission: number;
  purchaseMarketFee: number;
  saleMarketFee: number;
}

export interface IEstimatedAmountsMepGetParameters {
  tradeAmount: number;
  tabKey: ORDER_TAB_KEYS;
}
