// Internal
import { BANK_ACCOUNT_STATUS, BANK_ACCOUNT_TYPE, CURRENCIES } from '../enums';

export interface IBankAccountGetResponse {
  bankName: string,
  branch: string, // Sucursal
  currency: CURRENCIES,
  accountType: BANK_ACCOUNT_TYPE,
  accountNumber: string,
  holder: string, // Titular
  singleTaxIdentificationNumber: string, // CUIT/CUIL
  standardizedBankKey: string, // CBU
  favorite: boolean,
  accountState: BANK_ACCOUNT_STATUS
}
