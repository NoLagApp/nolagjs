export const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  const strLen = str.length + 1;
  for (let i = 0; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

export const uint8ArrayToString = (data: Uint8Array): string => {
  return data.reduce((accumulator, index) => {
    return accumulator + String.fromCharCode(index);
  }, "");
};
