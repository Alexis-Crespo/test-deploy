// Internal
import { CURRENCIES, TAB_NAMES } from '../enums';

interface IAsset {
  symbol: string;
  description: string;
  country: string;
  market: string;
  type: string;
  term: string;
  currency: string;
  lot: number;
  minimumInvestment: number;
  minimunOperable: number;
}

export interface IPosition {
  quantity: number;
  committed: number;
  pointsVariation: number;
  dailyVariation: number;
  lastPrice: number;
  avarageEntryPrice: number;
  gainPercentage: number;
  gainAmount: number;
  valuation: number;
  weightedValue: number;
  daysInPortfolio: number;
  asset: IAsset;
  immediateAvailable: number;
}

export interface IPortfolioGetResponseAdapted {
  assetObj: {
    label: string;
    asset: string;
    country: string;
    lot: number;
    market: string;
    minimumOperable: number;
    term: string;
    currency: CURRENCIES;
    type: TAB_NAMES;
  };
  quantity: { amount: number };
  dailyVariation: { amount: number };
  lastPrice: { amount: number };
  averageEntryPrice: { amount: number };
  startInvestmentAmount: { amount: number };
  lastPurchaseDate: { date: string };
  gainPercentage: number;
  gainAmount: number;
  committed: { quantity: number };
  valuation: number;
  investment: number;
}

export interface IPortfolioGetResponse {
  country: string;
  positions: IPosition[];
  valuation: number;
}

// * For getPortfolioSummaryAdapter
export interface IPortfolioSummaryInstrument {
  instrument: {
    type: TAB_NAMES;
    percentage: number;
    percentageLabel: string; // For Pills
  },
  gainAmount: number;
  gainPercentage: number;
  valuation: number;
  currency: string;
}

export interface IPortfolioSummary {
  totalValuation: number;
  totalGainAmount: number;
  totalGainPercentage: number;
  currency: string;
  instruments: IPortfolioSummaryInstrument[];
}

export interface IPortfolioSummaryGetResponseAdapted {
  arsSummary: IPortfolioSummary;
  usdSummary: IPortfolioSummary;
}
