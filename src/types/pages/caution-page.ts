// External
import type { DateObject } from 'react-multi-date-picker';

// Internal
import type { ICautionTerm } from '../services/caution';

export enum STEPS {
  form,
  swornStatement,
  detail,
  success,
  error
}

export enum TAB_KEYS {
  ars = 'ars',
  usd = 'usd'
}

export interface ICautionFlowFormikValues {
  tradeAmount: number,
  cautionTerm: ICautionTerm | null,
  terms: ICautionTerm[],
  customLimitTNA: number,
  isSwornStatementAccepted: boolean,
  isCustomLimitTNA: boolean,
  isEditOrderConditionsState: boolean,
  estimatedAmount: number,
  calendar: {
    minDate: DateObject,
    maxDate: DateObject,
    holidays: string[],
    value: DateObject[]
  }
  marketTNA: number,
  availableBalance: number,
  useAllQuantity: boolean,
  minAmount: number,
  currency: 'ars' | 'usd',
  cautionType: string
}

export type FormikValues = {
  [TAB_KEYS.ars]: ICautionFlowFormikValues,
  [TAB_KEYS.usd]: ICautionFlowFormikValues,
};

export interface ICautionTickerBoardData {
  bidAmount: number[],
  bidRate: number[],
  placementRate: number[],
  placementAmount: number[]
}
