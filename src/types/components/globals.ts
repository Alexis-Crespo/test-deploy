// Internal
import type { Children, LabelI18n } from "../types";
import {
  MONEY_TAB_KEYS,
  DRAWER_PLACEMENTS,
  INVESTOR_TEST_STEPS,
} from "../enums";
import type { IBankAccountGetResponse } from "../services/bankAccount";

// Modal: useModal.ts, ModalProvider.ts
export interface IModalConfig {
  show?: boolean;
  backdrop?: boolean;
  animation?: boolean;
  centered?: boolean;
  fullscreen?: boolean;
  size?: null;
  bodyScrollable?: boolean;
  title?: string;
  subtitle?: string;
  primaryAction?: null;
  primaryActionLabel?: string;
  secondaryAction?: null;
  secondaryActionLabel?: string;
  modalChildren?: Children;
  className?: string;
}

// Drawer: useDrawer.ts, DrawerProvider.ts
export interface IDrawerConfig {
  show?: boolean;
  placement?: DRAWER_PLACEMENTS;
  drawerChildren?: Children;
  position?: "absolute" | "fixed";
  width?: string;
  height?: string;
  title?: string;
  subTitle?: string;
  padding?: string;
  maxWidthContent?: string;
  drawerStyles?: {};
  onClose?: () => void;
}

export interface ITabItemProps {
  title: LabelI18n;
  tabKey: string;
  children?: Children;
  onClick?: () => void;
}

export type WithdrawMoneyFormikValues = {
  [MONEY_TAB_KEYS.arsAccount]: {
    account: {
      label: string;
      value: string;
    } | null;
    amount: number | string;
    availableForWithdrawal: number;
  };
  [MONEY_TAB_KEYS.usdAccount]: {
    account: {
      label: string;
      value: string;
    } | null;
    amount: number | string;
    availableForWithdrawal: number;
  };
  confirmationForm: {
    password: string;
  };
  selectedAccount: null;
  bankAccounts: IBankAccountGetResponse[];
  serviceIsPending: boolean;
  bankAccountError: any;
  bankAccountFetchData: () => Promise<void>;
  balanceError: any;
  balanceFetchData: () => Promise<void>;
};

export enum TICKER_BOARD_COLUMN_TYPE {
  default,
  buy,
  sell,
}

export enum TICKER_BOARD_VALUE_TYPE {
  default,
  money,
  percentage,
}

export type TickerBoardColumn = {
  id: string;
  columnType: TICKER_BOARD_COLUMN_TYPE;
  valueType: TICKER_BOARD_VALUE_TYPE;
  title: LabelI18n;
};

// ?: This type belong to PillButtonSwitch component
export type PillButtonOption<T = string> = {
  label: string;
  value: T;
};

export type InvestorTestFormikValues = {
  currentStep: INVESTOR_TEST_STEPS;
  currentQuestion: number;
  answers: {
    previouslyInvestedInstruments: string[];
    knowledgeOfEachInstrument: {
      instrumentId: number;
      selectedOption: PillButtonOption;
    }[];
    investMaxTerm: string;
    age: string;
    investGoal: string;
    carInsurance: string;
    savingCapacity: string;
    investEquityPercentage: string;
  };
};

export type Term = "t0" | "t1" | "t2" | "t3";
