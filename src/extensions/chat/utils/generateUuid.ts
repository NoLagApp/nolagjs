import { v4 } from 'uuid';

export const generateUuid = (): string => {
  return v4();
};

export const regenerateUuid = (listOfUUIDs?: string[]): string => {
  const generatedUuid = generateUuid();
  if (listOfUUIDs && listOfUUIDs.includes(generatedUuid)) {
    return regenerateUuid(listOfUUIDs);
  }
  return generatedUuid;
};
