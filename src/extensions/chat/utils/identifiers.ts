export const findIdentifierId = (key: string, identifier?: string): string | undefined => {
  if (!identifier) return;
  if (!identifier.includes(key)) return;
  return identifier.replace(key, "");
}

export const setIdentifierId = (prefixTag: string, idToSet: string) => {
  return `${prefixTag}${idToSet}`;
}