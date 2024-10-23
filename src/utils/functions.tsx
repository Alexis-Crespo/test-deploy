/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-props-no-spreading */
// External
import {
  type ReactElement, type JSX, Suspense
} from 'react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

// Internal
import { type DateObject } from 'react-multi-date-picker';
import {
  INSTRUMENTS_ADAPTER,
  richTextLineBreak,
  richTextWhiteSpace,
  ROUTES
} from '@/constants/constants';
import {
  BG_PILL_VARIANTS,
  TEXT_PILL_VARIANTS,
  MOVEMENTS_TYPES,
  TAB_NAMES,
  INVESTMENTS_TERMS
} from '@/types/enums';
import type {
  Children,
  DestinationPath,
  FilterCondition,
  LabelI18n
} from '@/types/types';

const colors = [
  {
    bg: BG_PILL_VARIANTS.lightBlue500,
    txt: TEXT_PILL_VARIANTS.black
  },
  {
    bg: BG_PILL_VARIANTS.primary500,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.primary900,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.onSurfaceText,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.violet200,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.red300,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.blue500,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.violet600,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.lightBlue600,
    txt: TEXT_PILL_VARIANTS.black
  },
  {
    bg: BG_PILL_VARIANTS.red800,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.blue600,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.violet300,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.primary800,
    txt: TEXT_PILL_VARIANTS.white
  },
  {
    bg: BG_PILL_VARIANTS.primary700,
    txt: TEXT_PILL_VARIANTS.white
  }
];

/**
 * Concatenate classNames for several scss classes in modules
 * @param  {string[]} classNames Different classNames
 * @returns {string} String of concatenated classes
 */
export const concatClassNames = (...classNames: (string | undefined | boolean)[]): string => classNames.filter((className) => !!className).join(' ');

/**
 * Get color from variant as css variable
 * @param {string} colorVariant Variant of COLORS constant
 * @returns {string} Color as css variable: var(--colorVariant)
 */
export const getColor = (colorVariant: string): string => {
  if (!colorVariant) return '';

  return colorVariant.startsWith('#')
    ? colorVariant
    : `var(--${colorVariant})`;
};

/**
 *
 * @param {number} number Number to format
 * @param {intlNumberFormatOptions} formatOptions Options for Intl.NumberFormat, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#options
 * @returns {string} Formatted number
 */
export const formatNumber = (
  number: number,
  formatOptions: Intl.NumberFormatOptions = {}
): string => {
  // By default, maximum fraction digits is 3, I set in 6 to avoid problems in FCI flow
  const maximumFractionDigits = formatOptions.maximumFractionDigits ?? 6;

  const formatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits, ...formatOptions });

  return formatter.format(number);
};

/**
 * Get the pill background color variant based on the index.
 *
 * @param {number} dataIndex - The index in the array of instruments.
 * @returns {Object} - An object with 'bg' and 'txt' properties representing the pill variant.
 *                    - 'bg' is the background color of the pill.
 *                    - 'txt' is the text color of the pill.
 */
export const getPillVariant = (dataIndex: number) => {
  // Ensure a cyclic index that wraps around when it exceeds the array length.
  const index = dataIndex % colors.length;
  const variant = colors[index];

  return {
    bg: variant?.bg,
    txt: variant?.txt
  };
};

/**
 * Get Pill background color (variant) and pill text color based on the movement type
 * @param {string} type The movement type
 * @returns {string} A valid Pill variant to use with Pill atom
 */
export const getPillVariantMovement = (type: string) => {
  switch (type) {
    case MOVEMENTS_TYPES.iniciada:
      return {
        pillVariant: BG_PILL_VARIANTS.primary200,
        txtVariant: TEXT_PILL_VARIANTS.black

      };
    case MOVEMENTS_TYPES.enProceso:
      return {
        pillVariant: BG_PILL_VARIANTS.warning500,
        txtVariant: TEXT_PILL_VARIANTS.black
      };
    case MOVEMENTS_TYPES.terminada:
      return {
        pillVariant:
          BG_PILL_VARIANTS.success500,
        txtVariant: TEXT_PILL_VARIANTS.white

      };
    case MOVEMENTS_TYPES.cancelada:
      return {
        pillVariant:
          BG_PILL_VARIANTS.danger500,
        txtVariant: TEXT_PILL_VARIANTS.white

      };
    default:
      return {
        pillVariant:
          BG_PILL_VARIANTS.primary600,
        txtVariant: TEXT_PILL_VARIANTS.white
      };
  }
};

/**
 * Get Pill background color and pill text color based on the INVESTMENTS_TERM
 * @param {*} term
 * @returns default bg color and text color
 */
export const getPillVariantInvestments = (term: INVESTMENTS_TERMS | null) => {
  switch (term) {
    case INVESTMENTS_TERMS.short:
      return {
        pillVariant: BG_PILL_VARIANTS.primary300,
        txtVariant: TEXT_PILL_VARIANTS.black,
        txt: INVESTMENTS_TERMS.short
      };
    case INVESTMENTS_TERMS.medium:
      return {
        pillVariant: BG_PILL_VARIANTS.primary500,
        txtVariant: TEXT_PILL_VARIANTS.white,
        txt: INVESTMENTS_TERMS.medium
      };
    case INVESTMENTS_TERMS.long:
      return {
        pillVariant:
          BG_PILL_VARIANTS.primary900,
        txtVariant: TEXT_PILL_VARIANTS.white,
        txt: INVESTMENTS_TERMS.long
      };

    default:
      return {
        pillVariant:
          BG_PILL_VARIANTS.primary500,
        txtVariant: TEXT_PILL_VARIANTS.black
      };
  }
};

/**
 * Calculate the difference in days/months/years between 2 dates
 * @param fromDate Start date
 * @param toDate End date
 * @param unit Unit to calculate the difference
 * @returns {number} Difference in days/months/years between 2 dates
 */
export const calculateDateDiff = (fromDate: DateObject, toDate: DateObject, unit: 'D' | 'M' | 'Y' = 'D') => {
  const diff = toDate.unix - fromDate.unix;
  const daysDiff = Math.floor(diff / 86400);
  const monthsDiff = Math.floor(daysDiff / 30);
  const yearsDiff = Math.floor(monthsDiff / 12);

  const dateDiff = {
    D: daysDiff,
    M: monthsDiff,
    Y: yearsDiff
  };

  return dateDiff[unit];
};

/**
 * Checks if the current time is within the specified opening hours.
 * @param {string} openingHours - The opening hours in ISO 8601 format
 *  (e.g., "1900-01-01T00:00:00").
 * @param {string} closingHours - The closing hours in ISO
 *  8601 format (e.g., "1900-01-01T23:59:59").
 * @returns {boolean} Returns true if the current time
 *  is within the specified opening hours, false otherwise.
 */
export const isWithinOpeningHours = (openingHours: string, closingHours: string) => {
  // get current Date
  const currentDate = new Date();
  const currentDateString = currentDate.toISOString().substring(0, 10); //  YYYY-MM-DD
  const currentTimeString = currentDate.toTimeString().substring(0, 8); //  HH:MM:SS

  const openingTime = new Date(`${currentDateString}T${openingHours.substring(11)}`);
  const closingTime = new Date(`${currentDateString}T${closingHours.substring(11)}`);
  const currentTime = new Date(`${currentDateString}T${currentTimeString}`);

  const withinOpeningHours = currentTime >= openingTime && currentTime <= closingTime;

  return withinOpeningHours;
};

/**
 * This code snippet defines a function
 *  called formatDate that takes a Date object
 *  as input. It formats the date by extracting
 *  the day, month, and year from the Date object, converting them
 * to strings, and padding them with leading zeros if necessary.
 *  Finally, it returns a string representation of the date in the format "dd/mm/yyyy".
 * @param date
 * @returns date in the format "dd/mm/yyyy"
 */
export const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * Sequence generator function
 * https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/from#generador_de_secuencia_rango
 * Useful for calculating pagination
 * @param {number} start Start value
 * @param {number} end End value
 * @returns Array of certain length with elements from start value to end value
 */
export const range = (start: number, end: number): number[] => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

/**
 * Generate a random number between a min and a max
 * @param {number} min Minimum number
 * @param {number} max Maximum number
 * @param {boolean} decimals Explicit if return decimals places
 * @returns A number between the range explicit
 */
export const getRandomNumber = (min = 0, max = 10, decimals = false) => {
  const randomNumber = (Math.random() * (max - min)) + min;

  if (decimals) return Number(randomNumber.toFixed(2));

  return Math.floor(randomNumber);
};

/**
 *
 * @param {string} parentRoute Is the parent route to take as base
 * @param  {...string} subRoutes Are the subroutes to concatenate with the parent route
 * @returns {string} Return the parentRoute and subRoutes concatenated with slashes
 */
export const getFullRoute = (parentRoute: string, ...subRoutes: string[]): string => {
  const subRoutesString = subRoutes.join('/');

  return `${parentRoute}/${subRoutesString}`;
};

/**
 * redirectPages
 * @param tabName (string)
 * returns the redirect next.js action with the tabName selected.
 * Example: redirect to /invest/instruments?investmentType=CEDEARs
 * This function is used in the pages when the page does not exist,
 * it redirects to a page that does exist.
 */
export const redirectPages = (tabName: TAB_NAMES) => {
  redirect(`${ROUTES.INVEST.path}/${ROUTES.INSTRUMENTS.path}?investmentType=${tabName}`);
};

/**
 * @returns {URLSearchParams} Return the current search params as URLSearchParams
 */
export const getCurrentSearchParams = () => {
  const windowExist = typeof window !== 'undefined';

  if (!windowExist) return new URLSearchParams();

  const currentSearchParams = new URLSearchParams(window.location.search);

  return currentSearchParams.toString();
};

/**
 * @returns Return the current search params as Object
 */
export const getCurrentSearchParamsAsObject = (): Record<string, string> => {
  const windowExits = typeof window !== 'undefined';

  if (!windowExits) return {};

  const currentSearchParams = new URLSearchParams(window.location.search);

  return Object.fromEntries(currentSearchParams);
};

/**
 * @param {number} number The number to truncate
 * @param {number} decimals Max quantity of decimals to show.
 * @returns {number} The number truncated.
 * Examples:
 * - truncateNumber(1.2345, 2) => 1.23
 * - truncateNumber(1.23, 3) => 1.23
 * - truncateNumber(1.2345, 0) => 1
 */
// TODO: Revisar si no se puede quitar el any
export const truncateNumber = (number: any, decimals: number) => {
  const factor = 10 ** decimals;
  const truncatedNumber = Math.trunc(number * factor) / factor;

  return Math.abs(truncatedNumber) === 0 ? 0 : truncatedNumber;
};

/**
 * Function used to render a Rich Text Component for any string that needs it
 * react-intl docs: https://formatjs.io/docs/react-intl/components/#rich-text-formatting
 * @param {Element} Component the component to render
 * @param {Object} props the props to pass to the component
 * @returns The component with the props passed
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const renderRichTextComponent = <T,>(
  Component: (p: T) => ReactElement,
  props: T & JSX.IntrinsicAttributes
  // eslint-disable-next-line react/jsx-props-no-spreading
) => <Component key={Math.random()} {...props} />;

/**
 * Get values with the global variables to any Intl id using rich text
 * with validation if there isn't values
 * @param {object} values Object with values to be translated
 * @returns {object} The values with the global variables to any Intl id using rich text
 */
// eslint-disable-next-line max-len
export const getIntlValues = (values?: Record<string, string | number | boolean | Function>) => (values
  ? {
    ...values,
    // global variables to any Typography using rich text
    whitespace: richTextWhiteSpace,
    linebreak: richTextLineBreak
  }
  : {
    // global variables to any Typography using rich text
    whitespace: richTextWhiteSpace,
    linebreak: richTextLineBreak
  });

/**
 * This function is used in the Account State Cards to render the conditional label
 * @param pathname Current path
 * @returns The corresponding label
 */
export const adaptLabelToPath = (pathname: string) => (
  pathname === ROUTES.HOME.path || pathname === ROUTES.MY_INVESTMENTS.path
    ? 'home__account-state_arg-card__label--available-to-invest'
    : 'wallet__account-state_arg-card__label--available-to-invest'
);

/**
 * This function is used in the Account State Cards to render the conditional title
 * @param pathname Current path
 * @returns The corresponding title
 */
export const adaptLabelsToPath = (pathname: string) => {
  if (pathname === ROUTES.HOME.path) {
    return {
      arg: 'home__account-state_arg-card__title',
      usa: 'home__account-state-eeuu-card__title'
    };
  }
  if (pathname === ROUTES.MY_WALLET.path) {
    return {
      arg: 'wallet__account-state_arg-card__title',
      usa: 'wallet__account-state_eeuu-card__title'
    };
  }
  if (pathname === ROUTES.MY_INVESTMENTS.path) {
    return {
      arg: 'investments__account-state_arg-card__title',
      usa: 'investments__account-state_eeuu-card__title'
    };
  }

  return {
    arg: 'home__account-state_arg-card__title',
    usa: 'home__account-state-eeuu-card__title'
  };
};

/**
 * This function has been created to use a Server Component that makes a fetch request
 * (from server) and render a fallback while the component is loading.
 * Is recommended to use this function in exports of components
 * @example export default withSuspense(MyServerComponent, <MyFallback />)
 * @param Component Server Component to render wrapped in Suspense,
 * mostly used with async components
 * @param fallback Component (JSX) to render while the wrapped component is loading.
 * Must be a Server Component
 * @returns Other component that wraps the Component (param) in Suspense with the fallback,
 * and can receive all props of the Component (param)
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const withSuspense = <T,>(
  Component: (p: T) => ReactElement | Promise<ReactElement>,
  fallback: Children) => function (props: T & JSX.IntrinsicAttributes) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  };

/**
 * This function has been created to use a Client Component that must use dynamic import,
 * and render a fallback while the component is loading.
 * Is recommended to use this function in exports of components
 * @example export default withDynamic(MyClientComponent, <MyFallback />)
 * @param Component Client component to use as dynamic import,
 * mostly used with components that need to use dynamic import by hydration errors
 * @param fallback Component (JSX) to render while the wrapped component is loading.
 * Must be a Server Component
 * @returns The Component (param) as dynamic import with the fallback,
 * can receive all props of the Component (param)
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const withDynamic = <T,>(
  Component: (p: T) => Children | Promise<Children>,
  fallback: ReactElement = <span style={{ display: 'none' }} />
) => dynamic(() => Promise.resolve(Component), { ssr: false, loading: () => fallback });

/**
 * Get a random enum value
 * @param enumObject A TS Enum object
 * @returns An Enum random value from the Enum provided as param
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const getRandomEnumValue = <Enum,>(enumObject: Record<string, Enum>) => {
  const enumValues = Object.values(enumObject);
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
};

/**
 * Get a random value from an array
 * @param array Array of values
 * @returns A random value from the array provided as param
 */
export const getRandomValueFromArray = (
  array: string[]
) => array[Math.floor(Math.random() * array.length)];

/**
 * @returns {boolean} Return true if the window exists, then you can use client side code
 */
export const windowExists = () => typeof window !== 'undefined';

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @return {string} The capitalized string.
 */
export const capitalizeFirstLetter = (
  str: string
): string => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Check if a response object contains an error
 * @param responseObject Response object to check
 * @returns {Error} Throw an error if the response object contains an error
 */
export const checkBackServiceError = (responseObject: {
  status: number,
  title: string
}) => {
  // Only for 401 error
  if (responseObject.status && responseObject.status === 401) {
    redirect(ROUTES.LOG_OUT.path);
  }

  // Rest of the errors
  if (responseObject.status && responseObject.status >= 400) {
    throw new Error(`${responseObject.status} - ${responseObject.title}`);
  }
};

/**
 * Return an error object to check in the container - mostly used in Adapters catch block
 * @param errorMessage Error message
 * @returns {hasError: boolean, errorMessage: string} Error pseudo-object
 */
export const returnBackServiceError = (error?: unknown) => {
  if (error instanceof Error) {
    // Next redirect function throw an error when it's called with 'NEXT_REDIRECT'
    if (error.message === 'NEXT_REDIRECT') throw error;

    return { hasError: true, errorMessage: error.message };
  }

  // Should never reach this point - only for ESLint rule "consistent return"
  return { hasError: true, errorMessage: 'Unknown error' };
};

/**
 * @param path The path to get the string path from
 * @returns If passed path is a string, returns it. If it's a DestinationPath, returns its pathname
 */
export const getStringPath = (path: DestinationPath): string => {
  if (typeof path === 'string') {
    return path;
  }

  return path.pathname;
};

/**
 * @param path The path to get the partial paths from
 * @returns An array of every partial path of the given path
 *
 * Example: getPartialPaths('/invest/AAPL') returns ['/invest', '/invest/AAPL']
 */
export const getPartialPaths = (path: DestinationPath): string[] => {
  const partialPaths: string[] = [];
  const fullPath = getStringPath(path);
  let partialPath = '';

  fullPath.split('/').slice(1).forEach((auxPath) => {
    partialPath += `/${auxPath}`;
    partialPaths.push(partialPath);
  });

  return partialPaths;
};

/**
 * Verifies if the given path is the same as the current pathname (or a partial path of it)
 * Useful to verify if a link is active
 * @param pathname Current pathname
 * @param to Path to verify
 * @param queryParamToCompare Optional, used to compare routes with search params like
 * /invest?investmentType=CEDEARs and compare also the query param investmentType
 * @returns True if the given path is the same as the current pathname (or a partial path of it)
 */
export const isActiveLink = (
  pathname: string,
  to: string,
  queryParamToCompare?: string
) => {
  // * Get partialPaths and toStringPath removing the query params from 'pathname' and 'to'
  const partialPaths = getPartialPaths(pathname.split('?')[0]);
  const toStringPath = getStringPath(to.split('?')[0]);

  const isActivePath = partialPaths.includes(toStringPath);

  // * If is an active link comparing by path only
  // * Verify if queryParamToCompare is passed and compare the query params of 'pathname' and 'to'
  if (isActivePath && queryParamToCompare) {
    // * Split the 'pathname' and 'to' to get their query params
    const toQueryParams = new URLSearchParams(to.split('?')[1]);
    const pathnameQueryParams = new URLSearchParams(pathname.split('?')[1]);

    const toQueryParam = toQueryParams.get(queryParamToCompare);
    const pathnameQueryParam = pathnameQueryParams.get(queryParamToCompare);

    return toQueryParam === pathnameQueryParam;
  }

  return isActivePath;
};

/**
 * Returns an string useful to use as a key for items in a list
 * @param label The label of the item
 * @returns A string useful to use as a key for items in a list
 */
export const getKeyFromLabel = (label: LabelI18n): string => String(typeof label === 'object' ? label.id : label);

/**
 * Returns the path to the /invest/instruments page with the given instrument as query param
 * @param instrument The instrument to use as query param
 * @returns The path useful to use in a Link or redirect
 */
export const getInstrumentPath = (instrument: TAB_NAMES) => `${ROUTES.INVEST.path}/${ROUTES.INSTRUMENTS.path}?investmentType=${instrument}`;

/**
 * Converts camelCase to kebab-case
 * @param string
 * @returns {string} string
 */
export const parseCamelCaseToKebabCase = (text: string) => text.replace(/[A-Z]/g, '-$&').toLowerCase();

/**
 * Sum all the values of an array of objects by a key
 * @param array Array of objects
 * @param key Key to sum, its value must be a number
 * @returns The sum of all the values of the array by the given key.
 * If some value for the given key is not a number, returns NaN
 * @example sumArrayByKey([{ value: 1 }, { value: 2 }], 'value') => 3
 */
export const sumArrayByKey = <T extends Record<string, any> = Record<string, any>>
  (array: T[], key: keyof T) => array
    .reduce((acc, curr) => acc + (curr[key] ?? 0), 0);

/**
 * Get the corresponding enum value searching by the enum values, with the given value.
 * It's useful when `value` possibly have spaces or special characters
 * @param enumParam Enum to search in
 * @param value Value to transform to the given enum, corresponding to the enum values
 * @returns The enum value that matches the given value. If doesn't exist, throws an error
 * @example
 * ```
 * enum COUNTRY {
 *   ARGENTINA = 'ARG',
 *   EEUU = 'USA'
 * }
 *
 * findEnumByValue<COUNTRY>(COUNTRY, 'ARG') = COUNTRY.ARGENTINA // = COUNTRY.ARGENTINA
 * ```
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const findEnumByValue = <Enum,>(
  enumParam: Record<string, string | number>,
  value: string | number
): Enum => {
  const foundEnum = Object.values(enumParam).find((enumValue) => enumValue === value);

  if (!foundEnum) {
    // eslint-disable-next-line no-console
    console.error(`Enum value ${value} not found`);
  }

  return foundEnum as Enum;
};

/**
 * Get the corresponding enum value searching by the enum keys, with the given key
 * @param enumParam Enum to search in
 * @param value Value to transform to the given enum, corresponding to the enum keys
 * @returns The enum that matches the given value with any key. If doesn't find, throws an error
 * @example
 * ```
 * enum COUNTRY {
 *   ARGENTINA = 'ARG',
 *   EEUU = 'USA'
 * }
 *
 * findEnumByKey<COUNTRY>(COUNTRY, 'ARGENTINA') // = COUNTRY.ARGENTINA
 * ```
*/
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const findEnumByKey = <Enum,>(
  enumParam: Record<string, string | number>,
  key: string
): Enum => {
  const foundEnumKey = Object.keys(enumParam).find((enumKey) => enumKey === key) ?? '';
  const foundEnum = enumParam[foundEnumKey];

  if (!foundEnum) {
    // eslint-disable-next-line no-console
    console.error(`Enum key ${key} not found`);
  }

  return foundEnum as Enum;
};

/**
 * Allows us to simulate a call service delay
 * @param ms Time in milliseconds
 * @returns Promise that resolves after the given time
 */
export const sleep = (ms: number) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

/**
 * Maps the back service type to our standard instrument/tab key.
 *
 * @param {string} type - The type to map.
 * @return {string} The instrument/tab key corresponding to the type, or 'Error' if not found.
 */
export const mapInstrumentsType = (type: string): TAB_NAMES => {
  const key = Object.keys(INSTRUMENTS_ADAPTER).find((k) => INSTRUMENTS_ADAPTER[k].includes(type));

  if (!key) {
    // eslint-disable-next-line no-console
    console.error(`Key ${type} not found`);
  }

  return key as TAB_NAMES;
};

// eslint-disable-next-line @typescript-eslint/comma-dangle
export const getAssetPagePath = (
  assetType: TAB_NAMES,
  assetSymbol: string,
  market: string
): string => {
  const assetTypeKey = Object
    .keys(TAB_NAMES)
    .find((enumKey) => TAB_NAMES[enumKey as keyof typeof TAB_NAMES] === assetType) ?? '';

  const searchParams = new URLSearchParams({ market, orderType: 'buy' });

  return `/invest/instruments/${assetTypeKey}/${assetSymbol}?${searchParams.toString()}`;
};

/**
 * Sums up all the numbers in an array.
 *
 * @param arr - Array of numbers to sum
 * @returns The sum of all the numbers in the array
 */
export const sumArray = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);

/**
 * Returns the percentage formatted as following:
 * 0% <= Result < 1% => max 2 decimals
 * 1% <= Result < 100% => 0 decimals
 */
export const getPillPercentage = (percentage: number) => {
  const showDecimals = percentage < 1;

  return truncateNumber(percentage, showDecimals ? 2 : 0);
};

/**
 * Filters an array by the given conditions.
 * Each condition is a function that receives an item of the array and returns a boolean.
 *
 * @example
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const data: Person[] = [{ name: 'John', age: 18 }, { name: 'Jane', age: 16 }];
 *
 * // You can create conditions that don't need parameters
 * const adultFilterCondition: FilterCondition<Person> = (item) => item.age >= 18;
 * // Or conditions that need parameters using a High Order Function
 * const nameFilterCondition = (name: string): FilterCondition<Person> => {
 *   return (item) => item.name === name
 * };
 * // Usage
 * const filteredData = filterByConditions(
 *   data,
 *   [adultFilterCondition, nameFilterCondition('John')]
 * )
 * // Result: [{ name: 'John', age: 18 }]
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const filterByConditions = <T,>(
  data: T[],
  conditions: FilterCondition<T>[]
) => data.filter((item) => conditions.every((condition) => condition(item)));

/**
 * Validate password
 * @param {string} password
 * @returns {isValidPassword: boolean, testResults: object} Test results and if password is valid
 */
export const validatePassword = (password: string) => {
  const lengthCheck = password.length >= 8;
  const capLetterCheck = /[A-Z]/.test(password);
  const lowerLetterCheck = /[a-z]/.test(password);
  const numberCheck = /\d/.test(password);
  const specialCharCheck = /[^\w]/.test(password);

  const isValidPassword = capLetterCheck
    && lowerLetterCheck
    && numberCheck
    && lengthCheck
    && specialCharCheck;

  const testResults = {
    lengthCheck,
    capLetterCheck,
    lowerLetterCheck,
    numberCheck,
    specialCharCheck
  };

  return {
    isValidPassword,
    testResults
  };
};

/**
 * Generates a random date in the format DD/MM/YYYY within the provided start and end dates,
 * and returns it as a string in the "DD/MM/YYYY" format.
 *
 * @param {Date} start - The start date of the range.
 * @param {Date} end - The end date of the range.
 * @returns {string} A string representing a random date in the "DD/MM/YYYY" format.
 *
 * @example
 * const startDate = new Date(2024, 0, 1); // January 1, 2024
 * const endDate = new Date(2024, 11, 31); // December 31, 2024
 * const randomDate = getRandomDate(startDate, endDate);
 * console.log(randomDate); // Example output: "15/07/2024"
 */

export const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
