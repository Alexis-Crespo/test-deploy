import {
  ACCOUNT_SELECT_OPTIONS,
  CURRENCY_SELECT_OPTIONS,
  INVESTMENT_TERMS_SELECT_OPTIONS,
  TERMS_SELECT_OPTIONS
} from '@/constants/selectsOptions';
import { FUNDS_CONTENT_VARIANTS, TAB_NAMES } from '../enums';
import { RISK_LEVEL_OPTIONS } from '@/constants/constants';
import { SelectOption } from '../types';

export type FormikValues = {
  account: typeof ACCOUNT_SELECT_OPTIONS[0],
  terms: typeof TERMS_SELECT_OPTIONS[0],
  currency: typeof CURRENCY_SELECT_OPTIONS[0] | null,
  investmentTerms: typeof INVESTMENT_TERMS_SELECT_OPTIONS[0],
  investmentType: TAB_NAMES,
  searchAssets: string,
  fundsContentVariant: FUNDS_CONTENT_VARIANTS,
  riskLevel: typeof RISK_LEVEL_OPTIONS[0] | null,
  panel: SelectOption | null
};
