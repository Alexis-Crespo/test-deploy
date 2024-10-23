export type UserPhone = {
  areaCode: string,
  number: string
};

// ! None of this interfaces are real - just for mocked purposes

export interface IPersonalDataGetResponse {
  particularPhone: UserPhone,
  mobilePhone: UserPhone,
  civilStatus: {
    label: string,
    value: string,
  },
  job: {
    label: string,
    value: string
  }
}

export interface IPersonalDataPostResponse {
  status: 200 | 400 | 401 | 500,
  messages?: string[]
}

export interface IResidenceDataGetResponse {
  street: string,
  streetNumber: string,
  floor: string,
  department: string,
  postalCode: string,
  province: string,
  location: string,
  city: string,
  country: string
}
