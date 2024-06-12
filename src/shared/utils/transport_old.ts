import { EAction, ESeparator } from "../enum";

export const toUnitSeparator = (unitArray: string[]): Uint8Array => {
  let byteLength = 0;

  // add space for separator
  if (unitArray[0] && unitArray[1]) {
    // total byte data
    byteLength = unitArray[0]?.length + unitArray[1]?.length;
    // add byte length for separator
    byteLength = byteLength + 1;
  } else if (unitArray[0]) {
    byteLength = unitArray[0]?.length;
  }

  let unitData = new Uint8Array(byteLength);

  if (unitArray[0] && unitArray[1]) {
    unitData = toUint8Array(unitData, unitArray[0], 0);
    unitData[unitArray[0].length] = ESeparator.Unit;
    unitData = toUint8Array(unitData, unitArray[1], unitArray[0].length + 1);
  } else if (unitArray[0]) {
    unitData = toUint8Array(unitData, unitArray[0], 0);
  }

  return unitData;
};

export const toUint8Array = (
  uint8Array: Uint8Array,
  str: string,
  offset: number,
): Uint8Array => {
  const strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    uint8Array[offset] = str.charCodeAt(i);
    offset = offset + 1;
  }
  return uint8Array;
};

export const topicPayload = (
  topicName: string,
  action?: EAction,
): Uint8Array => {
  const actionString = action as string;
  return toUnitSeparator([topicName, actionString].filter((i) => i));
};

export const nqlPayload = (
  identifiers: Uint8Array,
  action?: EAction,
): Uint8Array => {
  const separator = 31;

  const actionString = new Uint8Array(action?.length ?? 0);

  if (action) {
    actionString[0] = action.charCodeAt(0);
  }

  return toTransportSeparator([identifiers, actionString], separator);
};

export const toTransportSeparator = (
  recordArray: Uint8Array[],
  separator: number,
): Uint8Array => {
  let byteLength = 0;

  const separatorArray = new Uint8Array(1);
  separatorArray[0] = separator;

  // add space for separator
  if (recordArray[0] && recordArray[1] && recordArray[1][0] !== undefined) {
    // total byte data
    byteLength = recordArray[0]?.byteLength + recordArray[1]?.byteLength;
    // add byte byteLength for separator
    byteLength = byteLength + 1;
  } else if (recordArray[0]) {
    byteLength = recordArray[0]?.byteLength;
  }

  let recordData = new Uint8Array(byteLength);

  if (recordArray[0] && recordArray[1] && recordArray[1][0] !== undefined) {
    recordData.set(recordArray[0], 0);
    recordData.set(separatorArray, recordArray[0].byteLength);
    recordData.set(recordArray[1], recordArray[0].byteLength + 1);
  } else if (recordArray[0]) {
    recordData.set(recordArray[0], 0);
  }

  return recordData;
};

export const arrayOfString = (identifiers: string[] = []): Uint8Array => {
  // count the number of characters found in all the identifiers
  // we need this number to construct the Uint8Array
  const identifiersLength = identifiers
    .map((item) => {
      return item.length;
    })
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  // get the number of NQL separators
  // ex. 2 identifiers will need one separator
  // we need this number to construct the Uint8Array
  const separatorLength = identifiers.length <= 1 ? 0 : identifiers.length - 1;

  const uint8Length = identifiersLength + separatorLength;

  const bufView = new Uint8Array(uint8Length);
  let arrayCount = 0;
  identifiers.map((item, key) => {
    const strLen = item.length;
    for (let i = 0; i < strLen; i++) {
      bufView[arrayCount] = item.charCodeAt(i);
      arrayCount = arrayCount + 1;
    }
    if (identifiers.length - 1 !== key) {
      bufView[arrayCount] = ESeparator.Vertical;
      arrayCount = arrayCount + 1;
    }
  });

  return bufView;
};

export const toRecordSeparator = (recordArray: Uint8Array[]) => {
  return toTransportSeparator(recordArray, ESeparator.Record);
};

export const stringToUint8Array = (str: string): Uint8Array => {
  const bufView = new Uint8Array(str.length);
  const strLen = str.length;
  for (let i = 0; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }

  return bufView;
};

export const toGroupSeparator = (records: Uint8Array, data: ArrayBuffer) => {
  const separatorArray = new Uint8Array(1);
  separatorArray[0] = ESeparator.Group;

  const bitLength =
    records.byteLength + separatorArray.byteLength + data.byteLength;
  const buf = new ArrayBuffer(bitLength);
  let tmp = new Uint8Array(buf);
  tmp.set(new Uint8Array(records), 0);
  tmp.set(separatorArray, records.byteLength);
  tmp.set(new Uint8Array(data), records.byteLength + 1);
  return tmp.buffer;
};

export const generateTransport = (
  data: ArrayBuffer,
  topicName: string,
  identifiers: string[],
): ArrayBufferLike => {
  const topicNamePayload = topicPayload(topicName);
  const nql = nqlPayload(arrayOfString(identifiers));

  const records = toRecordSeparator([topicNamePayload, nql]);
  const groups = toGroupSeparator(records, data);
  return groups;
};
