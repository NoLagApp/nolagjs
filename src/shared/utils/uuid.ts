export const UUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const regenerateUUID = (listOfUUIDs?: string[]): string => {
  const uuid = UUID();
  if (listOfUUIDs && listOfUUIDs.includes(uuid)) {
    return regenerateUUID(listOfUUIDs);
  }
  return uuid;
};
