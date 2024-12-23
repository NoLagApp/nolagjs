/**
 * Convert string to Buffer, buffer will be sent to message broker
 * @param str
 * @deprecated Use stringToBuffer
 */
export const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  const strLen = str.length + 1;
  for (let i = 0; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

/**
 * Convert string to Buffer, buffer will be sent to message broker
 * @param str
 */
export const stringToBuffer = (str: string): ArrayBuffer => {
  return stringToArrayBuffer(str);
};

/**
 * Convert Buffer received from message broker to string
 * @param buffer
 */
export const bufferToString = (buffer: ArrayBuffer | Uint8Array<ArrayBuffer> ): string => {
  return uint8ArrayToString(buffer);
};

/**
 * Convert Buffer received from message broker to string
 * @param buffer
 * @deprecated Use bufferToString
 */
export const uint8ArrayToString = (buffer: ArrayBuffer | Uint8Array<ArrayBuffer> ): string => {
  const view = new Uint8Array(buffer);
  return view.reduce((accumulator, index) => {
    return accumulator + String.fromCharCode(index);
  }, "");
};
