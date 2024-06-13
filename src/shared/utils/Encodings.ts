export const stringToArrayBuffer = (str: string): ArrayBuffer => {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  const strLen = str.length + 1;
  for (let i = 0; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

export const uint8ArrayToString = (buffer: ArrayBuffer): string => {
  const view = new Uint8Array(buffer);
  return view.reduce((accumulator, index) => {
    return accumulator + String.fromCharCode(index);
  }, "");
};
