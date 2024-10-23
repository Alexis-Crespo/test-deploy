// External
import type { DateObject } from 'react-multi-date-picker';

// Internal
import type { SelectOption } from '../types';

export type MyMovementsFormikValues = {
  account: SelectOption | null;
  date: DateObject | DateObject[] | string | string[];
  movementType: SelectOption | null;
  currency: SelectOption | null;
  state: SelectOption | null; // TODO: check if there are enums [AS - 05022024]
};
