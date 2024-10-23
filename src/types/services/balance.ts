import { BAR_CHART_OPTIONS } from '../enums';

interface Totals {
  t0: number;
  t1: number;
  t2: number;
  t3: number;
}

interface Account {
  totals: Totals;
  available: Totals;
  committed: Totals;
  dollarsAvailableForOperationsInArgentina: number;
  availableForWithdrawal: number;
}

export interface BalanceGetResponse {
  arg_Ars: Account;
  arg_Usd: Account;
  eeuu_Usd: Account;
}

interface IBalanceTerm {
  availableSum: number;
  totals: number;
  totalCommitted: number;
  available: number;
}

interface IBalanceBarChartTerm extends IBalanceTerm {
  label: BAR_CHART_OPTIONS;
  percentage: number;
  date: string;
}

export interface IBalanceGetResponseAdapted {
  arg_Ars: {
    totals: { t0: number; t1: number; t2: number; t3: number };
    available: { t0: number; t1: number; t2: number; t3: number };
    committed: { t0: number; t1: number; t2: number; t3: number };
    dollarsAvailableForOperationsInArgentina: number;
    availableForWithdrawal: number;
    terms: {
      t0: IBalanceBarChartTerm;
      t1: IBalanceBarChartTerm;
      t2: IBalanceBarChartTerm;
      t3: IBalanceBarChartTerm
    }
  };
  arg_Usd: {
    totals: { t0: number; t1: number; t2: number; t3: number };
    available: { t0: number; t1: number; t2: number; t3: number };
    committed: { t0: number; t1: number; t2: number; t3: number };
    dollarsAvailableForOperationsInArgentina: number;
    availableForWithdrawal: number;
    terms: {
      t0: IBalanceBarChartTerm;
      t1: IBalanceBarChartTerm;
      t2: IBalanceBarChartTerm;
      t3: IBalanceBarChartTerm;
    }
  };
  eeuu_Usd: {
    totals: { t0: number; t1: number; t2: number; t3: number };
    available: { t0: number; t1: number; t2: number; t3: number };
    committed: { t0: number; t1: number; t2: number; t3: number };
    dollarsAvailableForOperationsInArgentina: number;
    availableForWithdrawal: number;
    terms: {
      t0: IBalanceTerm;
      t1: IBalanceTerm;
      t2: IBalanceTerm;
      t3: IBalanceTerm;
    }
  };
}
