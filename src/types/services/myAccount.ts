// ! None of this interfaces are real - just for mocked purposes [JMG - 13/05/24]

export interface IOperationVolume {
  currency: string,
  amount: number
}

export interface IArgentinianOperationsVolume {
  lastMonth: IOperationVolume,
  thisMonth: IOperationVolume
}

export interface IArgentinianOperationsNumber {
  lastMonth: number,
  thisMonth: number
}

export interface IMyAccountDataGetResponse {
  registeredMail: string,
  registeredMailOk: boolean,
  investmentAccountNumber: string,
  passwordLastUpdate: string,
  investorType: string,
  argentinianOperationsNumber: IArgentinianOperationsNumber,
  argentinianOperationsVolume: IArgentinianOperationsVolume
}

export interface IChangePasswordPostAdapterParams {
  currentPassword: string,
  newPassword: string
}

export interface IChangePasswordPostResponseAdapted {
  currentPasswordOk: boolean,
  passwordChanged: boolean
}
