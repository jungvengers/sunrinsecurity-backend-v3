export function compare(str1: string | undefined, str2: string | undefined) {
  if (!str1 || !str2) {
    return false;
  }
  return str1.localeCompare(str2, undefined, { sensitivity: 'accent' }) === 0;
}
