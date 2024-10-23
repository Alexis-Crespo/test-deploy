import { CURRENCIES } from '../enums';
import type { LabelI18n } from '../types';

// BUY ORDERS SERVICE
export interface IOrdersPostParams {
  asset: string,
  market: string,
  side: string, // 'buy' | 'sell'
  amount: number,
  quantity: number,
  limitPrice: number,
  type: string, // 'limit | 'market
  settlementTerm: string,
  dueDate: string,
  bankAccountId: number
}

interface IOrdersPostResponseSuccess {
  orderId: string
}

interface IOrdersPostResponseError {
  code: string,
  message: string
}

export type IOrdersPostResponse = IOrdersPostResponseSuccess | IOrdersPostResponseError[];

export interface IOrdersPostResponseAdapted {
  orderId: string
}

// ORDER TAXES SERVICE
export interface IOrderTaxesPostParams {
  asset: string,
  market: string,
  side: string, // 'buy' | 'sell'
  amount: number,
  quantity: number,
  limitPrice: number,
  type: string, // 'limit | 'market
  settlementTerm: string,
  dueDate: string,
  bankAccountId: number
}

export interface IOrderTax<Currency = string> {
  currency: Currency,
  value: number
}

export interface IOrderTaxAdapted extends IOrderTax<CURRENCIES> {
  label: LabelI18n,
}

export interface IOrderTaxesPostResponse {
  amount: IOrderTax,
  commission: IOrderTax,
  ivaCommission: IOrderTax,
  saleMarketFee: IOrderTax,
}

export interface IOrderTaxesPostResponseAdapted {
  amount: IOrderTax<CURRENCIES>,
  taxesByCurrency: {
    ars: {
      taxes: IOrderTaxAdapted[]
      total: number,
    },
    usd: {
      taxes: IOrderTaxAdapted[]
      total: number,
    }
  }
}
