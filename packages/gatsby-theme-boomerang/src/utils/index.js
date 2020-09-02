import capitalize from "lodash.capitalize";

export function unKebabCase(text) {
  return text
    ? text
        .split("-")
        .reduce((acc, frag) => `${acc} ${capitalize(frag)}`, "")
        .replace(/([^0-9])([0-9])/g, "$1 $2")
    : "";
}

/**
 * Take a string and turn into a kebab-cased URL UrlComponent safe value
 * Simple implementation in JS so same implementation can be done in the Java services
 * @param {string} value
 * @returns {any} string or the non-string value arg
 */
export function kebabCaseUrlComponent(value) {
  const notAllowedCharsRegex = /[^a-zA-Z\d\s\-_~]/g;
  if (typeof value !== "string") {
    return "";
  }
  return value
    .trim() // remove whitespace at start and end
    .replace(notAllowedCharsRegex, "") // remove not allowed characters
    .replace(/\s+/g, "-") // replace series of spaces w/ a single hyphen
    .toLowerCase(); // lowercase it
}
