import { ORDER_TAB_KEYS } from '../enums';

export enum STEPS {
  form = 'dollarMepForm',
  detail = 'dollarMepDetail',
  success = 'dollarMepSuccess',
  error = 'dollarMepError',
  swornStatement = 'dollarMepSwornStatement',
  operationInfo = 'dollarMepOperationInfo'
}

export type OrderFlowFormikValues = {
  [ORDER_TAB_KEYS.buy]: {
    estimatedToReceive: number,
    estimatedToDebit: number,
    destinationAccount: null,
    isSwornStatementAccepted: boolean,
    tradeAmount: number,
    arsPrefix: boolean,
    inputModeMoney: boolean,
    useAllAmount: boolean,
    referencePrice: number | string, // Precio referencia dólar
    availableBalance: number | string, // Saldo disponible,
    minLimit: number | string,
    maxLimit: number | string
  },
  [ORDER_TAB_KEYS.sell]: {
    estimatedToReceive: number,
    estimatedToDebit: number,
    destinationAccount: null,
    isSwornStatementAccepted: boolean,
    tradeAmount: number,
    arsPrefix: boolean,
    inputModeMoney: boolean,
    useAllAmount: boolean,
    referencePrice: number | string, // Precio referencia dólar
    availableBalance: number | string, // Saldo disponible,
    minLimit: number | string,
    maxLimit: number | string
  }
};
