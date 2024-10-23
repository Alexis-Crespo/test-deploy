// External
import type { FormikErrors } from '@dependencies/formik';
import type {
  ReactNode,
  MouseEventHandler,
  Dispatch,
  SetStateAction
} from 'react';

export type ValuesI18n = Record<string, any>;

export type LabelI18n = string | number | {
  id: string;
  defaultMessage?: string;
  values?: ValuesI18n;
};

export type FormikSetFieldValue = (field: string, value: any, shouldValidate?: boolean) =>
Promise<void | FormikErrors<any>>;

export type Children = ReactNode | ReactNode[] | null;

// ? This type can be used to extend any object with an index signature.
// ? The objects with this type can be used as myObject['myKey']
export type Indexable<T = any> = T & {
  [index: string]: T[keyof T];
};

// TODO: Provisory and generic type until we have the exact format of the data from the backend
export type TableData = {
  [key: string]: string
  | number
  | boolean
  | Record<string, string | number | boolean | null>
  | undefined
  | null;
}[];

export type ButtonAction = MouseEventHandler<HTMLButtonElement>;

export type SelectOption<V = number | string> = {
  [index: string]: string | number | string[] | V | undefined,
  value: V;
  label: string;
  imgSrc?: string;
  countries?: string[];
  investmentType?: string[]
};

export type UseStateAction<T> = Dispatch<SetStateAction<T>>;

export type Breakpoints = {
  [index: string]: boolean
};

export type DestinationPath = string | { pathname: string, query: { [key: string]: string } };

export type FilterCondition<T> = (dataItem: T) => boolean;
