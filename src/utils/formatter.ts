/**
 * Add thousands separator to number
 * @param value
 * @returns {String}
 */
export function addComma(value: string) {
  let parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
