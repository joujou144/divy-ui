/**
 * Creates a debounced function that delays invoking `func` until after `waitMilliseconds` have elapsed
 * since the last time the debounced function was invoked. The debounced function has the
 * same `this` context and arguments as the original function.
 *
 * @param func - The function to debounce.
 * @param waitMilliseconds - The number of milliseconds to delay; defaults to 0.
 *
 * @returns A new debounced function.
 *
 * @typeParam F - The type of the function to debounce.
 *
 * @example
 * const save = debounce(() => console.log('Saved!'), 300);
 * save(); // Will log 'Saved!' after 300ms, subsequent calls within 300ms will reset the timer.
 */

export function debounce<F extends (...args: any[]) => void>(
  func: F,
  waitMilliseconds: number = 0
) {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const later = () => {
      timeout = undefined;
      func.apply(this, args);
    };

    if (timeout !== undefined) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, waitMilliseconds);
  };
}

/**
 * Generates a unique identifier using a specified prefix and a random number.
 *
 * @param prefix - The prefix to prepend to the unique identifier.
 * @returns A string that combines the prefix and a random number.
 *
 * @example
 * getUniqueID('btn'); // returns 'btn-123456'
 */
export function getUniqueID(prefix: string) {
  return `${prefix}-${Math.floor(Math.random() * 1000000)}`;
}

/**
 * Capitalizes the first character of a string and converts the rest of the string to lowercase.
 *
 * @param s - The string to capitalize.
 * @returns The capitalized string, or an empty string if the input is falsy.
 *
 * @example
 * capitalize('hello'); // returns 'Hello'
 * capitalize(''); // returns ''
 */
export const capitalize = (s: string) => {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
};
