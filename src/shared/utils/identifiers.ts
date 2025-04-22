export const findIdentifierId = (key: string, identifiers: string): string | undefined => {
  if (!identifiers[0]) return;
  if (identifiers[0].includes(key)) return;
  return identifiers[0].replace(key, "");
}