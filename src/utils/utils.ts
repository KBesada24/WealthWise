import { redirect } from "next/navigation";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

/**
 * Parses and stringifies a value to create a deep clone and ensure serializability
 * @param {any} value - The value to parse and stringify
 * @returns {any} A deep cloned version of the value
 */
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

/**
 * Encrypts an ID by encoding it to base64
 * @param {string} id - The ID to encrypt
 * @returns {string} The encrypted ID
 */
export const encryptId = (id: string) => {
  return Buffer.from(id).toString('base64');
};
