// ? Type needed in Caution Table
// eslint-disable-next-line max-len
// TODO: Update the following type when table endpoint be ready. For now, it only match mocked data [JMG 20240611]

export type IQuotationTermsGetResponse = {
  currency: string,
  terms: string;
  maxDate: string;
  takerAmount: number;
  takerTNA: number;
  placementTNA: number;
  placementAmount: number;
};
