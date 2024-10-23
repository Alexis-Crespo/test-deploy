'use server';

/* SERVER ACTIONS */

// External
import { revalidatePath } from 'next/cache';

// Internal
import { auth } from '@/lib/auth';
import type { IRequestError } from '@/types/services/global';
import { Indexable } from '@/types/types';

/**
 * Retrieves the access token from the server session.
 * @returns {Promise<string|null>} The access token or null if it is not available.
 */
export const getAccessToken = async () => {
  const session = await auth();

  return session?.access_token;
};

/**
 * An abstraction of the fetch request
 * @param url The url to make the fetch request
 * @param param1 An object containing the request method, headers and body
 * @returns A promise with the data fetched
 */
// eslint-disable-next-line @typescript-eslint/comma-dangle
export const fetchRequest = async <T,>(
  url: string,
  {
    method,
    headers,
    body
  }: { method: string, headers?: Indexable<HeadersInit>, body?: Record<string, any> },
  revalidate: false | number = 0
): Promise<T & IRequestError> => {
  // Verify if it is the /Token url to avoid calling getAccessToken..
  // ..because if so, it can generate an infinite loop with authOptions and jwt callback..
  // ..and also /Token endpoint doesn't need Authorization header
  const isTokenUrl = url.includes('/Token');
  const accessToken = isTokenUrl ? '' : await getAccessToken();

  // By default the content type is application/json, so the body will be a JSON string
  // but if the content type is application/x-www-form-urlencoded (used on token service)
  // the body must be a URLSearchParams
  const contentType: string = headers?.['Content-Type']?.toString() ?? 'application/json';
  const parsedBody = contentType === 'application/x-www-form-urlencoded'
    ? new URLSearchParams(body)
    : JSON.stringify(body);

  const response = await fetch(url, {
    method,
    headers: new Headers({
      'Content-Type': contentType,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers
    }),
    ...(body && { body: parsedBody }),
    ...(revalidate && { next: { revalidate } })
  });

  const data = await response.json() as T & IRequestError;

  return data;
};

/**
 * Clear the cache for the given path and revalidate service data for server component
 * @param path The path to clear the cache
 */
export const clearCache = async (path?: string) => {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath('/');
      revalidatePath('/[lang]');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('clearCache => ', error);
  }
};
