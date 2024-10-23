// Internal
import {
  ACCOUNT_SELECT_OPTIONS,
  CURRENCY_SELECT_OPTIONS,
  INVESTMENT_TERMS_SELECT_OPTIONS
} from '@/constants/selectsOptions';
import { CURRENCIES } from '../enums';

export enum STEPS {
  form,
  swornStatement,
  detail,
  success,
  error,
  termsAndConditions
}

// Buy/sell flow
export type SimplePorfolioFlowFormikValues = {
  estimatedAmount: number,
  isLegalStatementAccepted: boolean,
  tradeAmount: number,
  availableBalance: number,
  portfolioCurrency: CURRENCIES,
  maxPortfoliosToBuy: number,
  portfolioId: string,
  referencePrice: number,
  portfolioName: string
};

export enum SimplePortfolioOrderStatus {
  success,
  failed
}

// Main page
export type SimplePortfolioFormikValues = {
  account: typeof ACCOUNT_SELECT_OPTIONS[0],
  currency: typeof CURRENCY_SELECT_OPTIONS[0],
  investmentTerms: typeof INVESTMENT_TERMS_SELECT_OPTIONS[0],
  searchAssets: string,
};
