import capitalize from "lodash/capitalize";

export function unKebabCase(text) {
  return Boolean(text)
    ? text
        .split("-")
        .reduce((acc, frag) => `${acc} ${capitalize(frag)}`, "")
        .replace(/([^0-9])([0-9])/g, "$1 $2")
    : "";
}
