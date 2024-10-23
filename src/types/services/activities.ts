// Internal
import { CURRENCIES } from '../enums';

export interface IActivitiesGetParams {
  [key: string]: string | null | undefined; // So this can be use as param in URLSearchParams
  market: string | null;
  currency: string | null;
  startDate?: string;
  endDate?: string;
  movementType: string | null;
  state: string | null;
}

export type ValueCurrency = {
  value: number;
  currency: CURRENCIES;
};

export interface IActivitiesGetResponse {
  [key: string]: number | string | ValueCurrency;
  number: number;
  description: string;
  account: string;
  settlementDate: string;
  liquidationDate: string;
  quantityAssets: number;
  price: ValueCurrency;
  status: string;
  commission: ValueCurrency;
  taxes: ValueCurrency;
  total: ValueCurrency;
}
