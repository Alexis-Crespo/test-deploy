export interface InvestorTestGetResponse {
  [key: string]: {
    id: number
    question: string,
    type: string,
    key?: string,
    answers: {
      id: number,
      label: string
      options?: {
        id: number,
        label: string
      }[]
    }[]
  }
}

export interface InvestorTestPostParams {
  previouslyInvestedInstruments: number[],
  knowledgeOfEachInstrument: Record<string, string>[],
  investMaxTerm: number,
  age: number,
  investGoal: number,
  carInsurance: number,
  savingCapacity: number,
  investEquityPercentage: number
}

export interface InvestorTestPostResponse {
  suggestedProfile: {
    name: string,
    detail: string,
    profileComposition: {
      name: string,
      percentage: number
    }[]
  }
}

export interface IInvestorTestGetPageResponse {
  percentages?: number[],
  investorType?: string,
  investorDescription?: string
}
