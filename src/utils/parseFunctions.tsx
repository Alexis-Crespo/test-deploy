// External
import type { ComponentProps, ReactNode } from 'react';

// Internal
import { Typography } from '@atoms/index';
import { formatNumber } from './functions';

/**
 * Escape special characters in a string to be used in a regex
 * @param value String to escape
 * @returns The string with the special characters escaped
 */
export const escapeRegex = (value: string) => value.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');

/**
 * Highlight the matches of a string
 * @param label String to be highlighted
 * @param match String to match
 * @param typographyProps Props for the Typography component to the non-highlighted parts
 * @param higlightedProps Props for the Typography component to the highlighted parts
 * @returns The full label divided by the match prop, with the matches highlighted
 */
export const highlightMatches = (
  label: string,
  match: string,
  typographyProps: ComponentProps<typeof Typography>,
  higlightedProps: ComponentProps<typeof Typography>
): ReactNode => {
  // Split the label by the match prop
  const parts = label
    .split(new RegExp(`(${escapeRegex(match)})`, 'gi'))
    .filter(Boolean);

  return (
    <div style={{ whiteSpace: 'pre-wrap' }}>
      {parts.map((part) => {
        // If the part is the match, apply the highlighted props
        const highlightProps = part.toLowerCase() === match.toLowerCase() ? higlightedProps : {};

        return (
          <Typography
            key={part}
            className="d-inline-block"
            label={part}
            Tag="span"
            {...typographyProps}
            {...highlightProps}
          />
        );
      })}
    </div>
  );
};

export const compactNumber = (value: number): string => {
  const compactLookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'Mil.' },
    { value: 1e6, symbol: 'Mill.' },
    { value: 1e9, symbol: 'Mil Mill.' },
    { value: 1e12, symbol: 'Bill.' }
  ];

  // Regular expression to match and remove trailing zeros from a decimal number.
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = compactLookup.findLast((aux) => Math.abs(value) >= aux.value);
  return item
    ? formatNumber(value / item.value, { maximumFractionDigits: 0 })
      .replace(regexp, '')
      .concat(' ', item.symbol)
    : '0';
};
