// External
import type { DateObject } from "react-multi-date-picker";

// Internal
import { CURRENCIES, ORDER_TAB_KEYS, TAB_NAMES } from "../enums";
import type { PillButtonOption, Term } from "../components/globals";

export enum ORDER_FLOW_STEPS {
  orderForm = "orderForm",
  swornStatement = "swornStatement",
  orderDetail = "orderDetail",
  orderSuccess = "orderSuccess",
  orderError = "orderError",
}

export enum FIELD_NAMES {
  settlementDeadline = "settlementDeadline",
  limitPrice = "limitPrice",
  marketPrice = "marketPrice",
  validUntil = "validUntil",
  tradeAmount = "tradeAmount",
  isCustomLimitPrice = "isCustomLimitPrice",
  isSwornStatementAccepted = "isSwornStatementAccepted",
  isEditOrderConditionsState = "isEditOrderConditionsState",
  useAllQuantity = "useAllQuantity",
  availableAmount = "availableAmount",
  minAmount = "minAmount",
  inputModeMoney = "inputModeMoney",
  estimatedQuantity = "estimatedQuantity",
  estimatedAmount = "estimatedAmount",
  availableAssetQuantity = "availableAssetQuantity",
  calculatedTaxes = "calculatedTaxes",
  assetSymbol = "assetSymbol",
  assetType = "assetType",
  assetDescription = "assetDescription",
  currentStep = "currentStep",
  buyMarketPrice = "buyMarketPrice",
  sellMarketPrice = "sellMarketPrice",
  swornStatement = "swornStatement",
}

export type ShowSwornStatement = "none" | "read" | "check";

export interface FormikValues {
  settlementDeadline: PillButtonOption<Term>;
  availableAmount: number;
  marketPrice: number;
  limitPrice: number;
  validUntil: DateObject | string;
  isCustomLimitPrice: boolean;
  tradeAmount: number;
  isSwornStatementAccepted: boolean;
  isEditOrderConditionsState: boolean;
  inputModeMoney: boolean;
  estimatedAmount: number;
  estimatedQuantity: number;
  availableAssetQuantity: number;
  totalAmount: number;
  useAllQuantity?: boolean;
  calculatedTaxes: number;
  assetSymbol?: string;
  assetType?: TAB_NAMES;
  assetDescription?: string;
  currentStep: ORDER_FLOW_STEPS;
  showSwornStatement: ShowSwornStatement;
  market: string;
  currency: CURRENCIES;
}

export type OrderFlowFormikValues = {
  [ORDER_TAB_KEYS.buy]: FormikValues;
  [ORDER_TAB_KEYS.sell]: FormikValues;
};
