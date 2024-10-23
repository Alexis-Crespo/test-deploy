import { CURRENCIES, TAB_NAMES } from '../enums';

export interface ISearchbarResult {
  img: string;
  symbol: string;
  description: string;
  assetType: {
    label: string;
    value: TAB_NAMES;
  },
  currency: CURRENCIES;
  market: string;
}

export type SearchbarGetResponseAdapted = ISearchbarResult[];
