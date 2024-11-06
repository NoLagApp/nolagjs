"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint8ArrayToString = exports.stringToArrayBuffer = void 0;
const stringToArrayBuffer = (str) => {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    const strLen = str.length + 1;
    for (let i = 0; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
};
exports.stringToArrayBuffer = stringToArrayBuffer;
const uint8ArrayToString = (buffer) => {
    const view = new Uint8Array(buffer);
    return view.reduce((accumulator, index) => {
        return accumulator + String.fromCharCode(index);
    }, "");
};
exports.uint8ArrayToString = uint8ArrayToString;
//# sourceMappingURL=Encodings.js.map