export interface Token {
  access_token: string,
  refresh_token: string,
  expires_in: number,
  token_type: string
}

export interface Customer {
  username: string,
  name: string,
  accountNumber: string,
  email: string,
  hasUSAccount: boolean,
  hasDeposit: boolean,
  investorTest: string,
  inversorTestRenewalDate: boolean,
  termsAndConditions: boolean,
  tycRenewalDate: string,
  require2FA?: boolean, // TODO: update when 2FA service is available
  cuitCuil: string,
  auth: boolean
}

export type GrantType = 'password' | 'refresh_token';

export interface TokenRequest {
  grant_type: GrantType,
  username?: string,
  password?: string,
  refresh_token?: string
}
