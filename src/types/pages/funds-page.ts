export enum FUNDS_TAB_KEYS {
  subscribe = 'subscribe',
  recover = 'recover'
}

export enum STEPS {
  form,
  detail,
  success,
  error,
  managementRegulation
}

export type FundsFlowFormikValues = {
  [FUNDS_TAB_KEYS.subscribe]: {
    estimatedToReceive: number,
    isManagementRegulationAccepted: boolean,
    tradeAmount: number,
    arsPrefix: boolean,
    inputModeMoney: boolean,
    useAllAmount: boolean,
    availableBalance: number | string,
    minLimitToInvest: number | string,
  },
  [FUNDS_TAB_KEYS.recover]: {
    estimatedToReceive: number,
    isManagementRegulationAccepted: boolean,
    tradeAmount: number,
    arsPrefix: boolean,
    inputModeMoney: boolean,
    useAllAmount: boolean,
    availableBalance: number | string,
    minLimitToInvest: number | string,
  }
};
