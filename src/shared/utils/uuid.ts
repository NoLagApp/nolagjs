import { v4 } from 'uuid';

export const uuid = (): string => {
  return v4();
};

export const regenerateUuid = (listOfUUIDs?: string[]): string => {
  const generatedUuid = uuid();
  if (listOfUUIDs && listOfUUIDs.includes(generatedUuid)) {
    return regenerateUuid(listOfUUIDs);
  }
  return generatedUuid;
};
