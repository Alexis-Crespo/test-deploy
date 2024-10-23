// Internal
import {
  INSTRUMENTS_FILTER_VARIANTS,
  TAB_NAMES,
  COUNTRY,
  CURRENCIES
} from '../enums';
import type { PillButtonOption, Term } from '../components/globals';

export interface IAssetGetResponse {
  symbol: string
  description: string
  country: string
  market: string
  type: string
  term: string
  currency: string
  lot: number
  minimumInvestment: number
  minimunOperable: number
}

export interface IAssetGetAdapterParams {
  asset: string
  market: string
}

export interface IAssetGetResponseAdapted {
  symbol: string
  description: string
  country: COUNTRY
  market: string
  type: TAB_NAMES
  term: string
  currency: CURRENCIES
}

export interface IAssetTypesGetResponse {
  name: string,
  country: string,
  realDelay: boolean
}

export interface IAssetTypesGetResponseAdapted {
  label: TAB_NAMES,
  investmentVariant: INSTRUMENTS_FILTER_VARIANTS,
  getColumnsFn: (tabName: TAB_NAMES) => Array<Record<string, any>>
}

export interface IAssetTypesGetParams {
  country: string
}

export interface IAssetPanelGetResponse {
  name: string,
  panel: string
}

export interface IAssetPanelGetResponseAdapted {
  [key: string]: string, // Necessary to avoid types problems with SelectFilter component
  value: string,
  label: string
}

export interface IAssetPanelGetParams {
  assetType: TAB_NAMES,
  country: string
}

// ASSET DETAIL SERVICE
export interface IAssetDetailGetParams {
  symbol: string
  market: string
  term: string
}

interface IAssetDetailResponsePrice {
  currency: 'ARS' | 'USD'
  value: number
}

export interface IAssetDetailGetResponse {
  openingPrice: IAssetDetailResponsePrice
  previousClosePrice: IAssetDetailResponsePrice
  previousTrade: IAssetDetailResponsePrice
  tradePrice: IAssetDetailResponsePrice
  nominalAmount: number
  tradeVolume: number
  timestampGMT: string
  maximum: IAssetDetailResponsePrice
  minimum: IAssetDetailResponsePrice
  variation: number
  totalNominalVolume: number
  cashVolume: IAssetDetailResponsePrice
  averagePrice: IAssetDetailResponsePrice
  trend: string
  variationPoints: IAssetDetailResponsePrice
  rate: number
  closePrice: IAssetDetailResponsePrice
  symbol: string
  market: string
  term: string
  idTypeAsset: number
  dueDate: string | null
  timestamp: string
  lot: number
  idGroupTypeAsset: number
  idAsset: number
  idMarket: number
  idTerm: number
}

export interface IAssetDetailGetResponseAdapted {
  currency: CURRENCIES
  lastPrice: number
  dailyVariation: {
    amount: number
    percentage: number
  }
  tradeVolume: number
  openingPrice: number
  previousClosePrice: number
  maximum: number
  minimum: number
  lastUpdate: string
  term: PillButtonOption<Term>
}

// ASSETS IN COMMON SERVICE
export interface IAssetsInCommonGetParams {
  symbol: string
  market: string
}

export interface IAssetsInCommonGetResponse {
  symbolSpeciesARS: string
  symbolSpeciesD: string
  symbolSpeciesC: string
}

export interface IAssetTradeGetParams {
  country: string,
  assetType: TAB_NAMES,
  panel: string,
  term: string
}

export type AssetPrice = {
  symbol: string,
  description: string,
  market: string,
  variacionDiaria: number,
  ultimoPrecio: number,
  ultimoCierre: number,
  apertura: number,
  min: number,
  max: number,
  volumenOperado: number,
  cantidadCompra: number,
  cantidadVenta: number,
  precioCompra: number,
  precioVenta: number,
  tasaCompra: number,
  tasaVenta: number
};

export interface IAssetTradeGetResponse {
  assetPrices: AssetPrice[]
}

export interface IAssetTradeGetResponseAdapted {
  symbol: {
    label: string,
    asset: string,
    img: string,
  },
  market: string,
  dailyVariation: number,
  lastPrice: number,
  lastClosing: number,
  opening: number,
  min: number,
  max: number,
  tradedVolume: number,
  buyAmount: number,
  buyPrice: number,
  sellAmount: number,
  sellPrice: number,
  buyRate: number,
  sellRate: number,
  currency: CURRENCIES
}

export interface IAssetQuoteGetParams {
  symbol: string,
  market: string,
  term: string
}

export type QuoteType = 'BID' | 'OFFER';

export type AssetQuote = {
  type: QuoteType,
  size: number,
  price: number,
  rate?: number, // rate it is not used in this flow
  position: number
};

export interface IAssetQuoteGetResponse {
  quotesValues: AssetQuote[],
  symbol: string,
  market: string,
  term: string,
  idTypeAsset: number,
  dueDate: string | null,
  timestamp: string,
  lot: number,
  idGroupTypeAsset: number,
  idAsset: number,
  idMarket: number,
  idTerm: number
}

export type IAssetQuoteAdapted = {
  buyAmount: number[],
  buyPrice: number[],
  sellAmount: number[],
  sellPrice: number[]
};

export interface IAssetQuoteGetResponseAdapted
  extends Omit<IAssetQuoteGetResponse, 'quotesValues'> {
  quotesValues: IAssetQuoteAdapted,
  tallRows: boolean[]
}
