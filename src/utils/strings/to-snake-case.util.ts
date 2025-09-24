/**
 * Converts a given string into snake_case.
 * * This function handles various input formats, including:
 * - PascalCase (e.g., "PascalCaseString" -> "pascal_case_string")
 * - camelCase (e.g., "camelCaseString" -> "camel_case_string")
 * - kebab-case (e.g., "kebab-case-string" -> "kebab_case_string")
 * - Strings with spaces (e.g., "A Sentence String" -> "a_sentence_string")
 * * It ensures that multiple spaces or special characters are replaced with
 * a single underscore.
 * * @param input The string to be converted.
 * @returns The snake_case version of the input string.
 */
export function toSnakeCase(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string.');
  }

  // 1. Replace all non-alphanumeric characters (except underscore) with a space.
  // 2. Insert a space before any uppercase letter that follows a lowercase letter.
  // 3. Trim whitespace from the start and end of the string.
  // 4. Convert to lowercase.
  // 5. Replace any remaining spaces or hyphens with a single underscore.
  const tempString = input
    .replace(/[^a-zA-Z0-9_ ]/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim()
    .toLowerCase();

  return tempString.replace(/[\s-]/g, '_').replace(/_+/g, '_');
}
