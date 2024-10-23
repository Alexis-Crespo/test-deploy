// Internal
import { CURRENCIES, INVESTMENTS_TERMS } from '../enums';
import { SimplePortfolioOrderStatus } from '../pages/simple-portfolio-page';

export interface ISimplePortfolioGetParams {
  visible: boolean,
  tradeable: boolean
}

export interface ISimplePortfolioGetResponse {
  visible: boolean,
  tradeable: boolean,
  portfolioId: string,
  name: string,
  quantity: number,
  investmentHorizon: string,
  performance: number,
  performanceTerm: string,
  performanceYTD: number,
  minimunAmount: number,
  assetsWithNoQuote: null, // TODO: check this prop - [AnS 20240506]
  currency: string,
  marketId: number
}

export interface ISimplePortfolioGetResponseAdapted {
  visible: boolean,
  tradeable: boolean,
  portfolioId: string,
  name: string,
  quantity: number,
  investmentHorizon: INVESTMENTS_TERMS,
  performance: number,
  performanceTerm: string,
  performanceYTD: number,
  portfolioTotal: number,
  assetsWithNoQuote: null, // TODO: check this prop - [AnS 20240506]
  currency: CURRENCIES,
  marketId: number
}

export interface ISimplePortfolioIdGetParams {
  portfolioId: string
}

export type ISimplePortfolioIdAsset = {
  id: string,
  symbol: string,
  quantity: number,
  equity: number,
  lote: number,
  quote: number,
  percentage: number,
  percentageLabel: string, // For Pills
  // TODO: to be defined - [AnS 20240529]
  img: string,
};

export interface ISimplePortfolioIdGetResponse {
  portfolio: {
    portfolioId: string,
    name: string,
    assets: ISimplePortfolioIdAsset[],
    tradeable: boolean,
    visible: boolean,
    goal: string,
    investmentHorizon: string,
    performanceTerm: string,
    performance: number,
    link: string,
    minimumAmount: number,
    performanceYTD: number,
    currency: string,
    marketId: number
  },
  ok: boolean,
  messages: string[]
}

export interface ISimplePortfolioIdGetResponseAdapted {
  portfolio: {
    portfolioId: string,
    name: string,
    assets: ISimplePortfolioIdAsset[],
    tradeable: boolean,
    visible: boolean,
    goal: string,
    investmentHorizon: INVESTMENTS_TERMS,
    performanceTerm: string,
    performance: number,
    link: string,
    portfolioTotal: number,
    performanceYTD: number,
    currency: CURRENCIES,
    marketId: number
  },
  ok: boolean,
  messages: string[]
}

export interface ISimplePortfolioEstimatedAmountsGetParams {
  portfolioId: string
}

export interface ISimplePortfolioEstimatedAmountsGetResponse {
  estimatedAmount: number,
  purchaseCommission: number,
  ivaComission: number,
  derechosMercado: number,
  ivaDerechosMercado: number,
  ok: boolean,
  messages: string[]
}

export interface ISimplePortfolioEstimatedAmountsGetResponseAdapted {
  estimatedToDebit: number,
  commission: number,
  commissionIva: number,
  marketRights: number,
  marketRightsIva: number,
  ok: boolean,
  messages: string[]
}

export interface ISimplePortfolioParametricGetResponse {
  isValidTime: boolean,
  openingHour: string,
  closingHour: string,
  minimumQuantity: number,
  maximumQuantity: number
}

export interface ISimplePortfolioOrdersPostParams {
  portfolioId: string,
  quantity: number
}

export type SimplePortfolioTransaction = {
  transactionId: string,
  symbol: string,
  status: SimplePortfolioOrderStatus
};

export interface ISimplePortfolioOrdersPostResponse {
  status: number,
  titulos_no_comprados: SimplePortfolioTransaction[],
  transacciones_generadas: SimplePortfolioTransaction[],
}

export interface ISimplePortfolioOrdersPostResponseAdapted {
  status: number,
  transactions: SimplePortfolioTransaction[],
}
