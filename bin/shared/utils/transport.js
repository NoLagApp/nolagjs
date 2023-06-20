"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransport = exports.toGroupSeparator = exports.stringToUint8Array = exports.toRecordSeparator = exports.arrayOfString = exports.toTransportSeparator = exports.nqlPayload = exports.topicPayload = exports.toUint8Array = exports.toUnitSeparator = void 0;
const enum_1 = require("../enum");
const toUnitSeparator = (unitArray) => {
    var _a, _b, _c;
    let byteLength = 0;
    // add space for seporator
    if (unitArray[0] && unitArray[1]) {
        // total byte data
        byteLength = ((_a = unitArray[0]) === null || _a === void 0 ? void 0 : _a.length) + ((_b = unitArray[1]) === null || _b === void 0 ? void 0 : _b.length);
        // add byte length for seporator
        byteLength = byteLength + 1;
    }
    else if (unitArray[0]) {
        byteLength = (_c = unitArray[0]) === null || _c === void 0 ? void 0 : _c.length;
    }
    let unitData = new Uint8Array(byteLength);
    if (unitArray[0] && unitArray[1]) {
        unitData = (0, exports.toUint8Array)(unitData, unitArray[0], 0);
        unitData[unitArray[0].length] = enum_1.ESeparator.Unit;
        unitData = (0, exports.toUint8Array)(unitData, unitArray[1], unitArray[0].length + 1);
    }
    else if (unitArray[0]) {
        unitData = (0, exports.toUint8Array)(unitData, unitArray[0], 0);
    }
    return unitData;
};
exports.toUnitSeparator = toUnitSeparator;
const toUint8Array = (uint8Array, str, offset) => {
    const strLen = str.length;
    for (let i = 0; i < strLen; i++) {
        uint8Array[offset] = str.charCodeAt(i);
        offset = offset + 1;
    }
    return uint8Array;
};
exports.toUint8Array = toUint8Array;
const topicPayload = (topicName, action) => {
    const actionString = action;
    return (0, exports.toUnitSeparator)([topicName, actionString].filter((i) => i));
};
exports.topicPayload = topicPayload;
const nqlPayload = (identifiers, action) => {
    var _a;
    const seporator = 31;
    const actionString = new Uint8Array((_a = action === null || action === void 0 ? void 0 : action.length) !== null && _a !== void 0 ? _a : 0);
    if (action) {
        actionString[0] = action.charCodeAt(0);
    }
    return (0, exports.toTransportSeparator)([identifiers, actionString], seporator);
};
exports.nqlPayload = nqlPayload;
const toTransportSeparator = (recordArray, seporator) => {
    var _a, _b, _c;
    let byteLength = 0;
    const seporatorArray = new Uint8Array(1);
    seporatorArray[0] = seporator;
    // add space for seporator
    if (recordArray[0] && recordArray[1] && recordArray[1][0] !== undefined) {
        // total byte data
        byteLength = ((_a = recordArray[0]) === null || _a === void 0 ? void 0 : _a.byteLength) + ((_b = recordArray[1]) === null || _b === void 0 ? void 0 : _b.byteLength);
        // add byte byteLength for seporator
        byteLength = byteLength + 1;
    }
    else if (recordArray[0]) {
        byteLength = (_c = recordArray[0]) === null || _c === void 0 ? void 0 : _c.byteLength;
    }
    let recordData = new Uint8Array(byteLength);
    if (recordArray[0] && recordArray[1] && recordArray[1][0] !== undefined) {
        recordData.set(recordArray[0], 0);
        recordData.set(seporatorArray, recordArray[0].byteLength);
        recordData.set(recordArray[1], recordArray[0].byteLength + 1);
    }
    else if (recordArray[0]) {
        recordData.set(recordArray[0], 0);
    }
    return recordData;
};
exports.toTransportSeparator = toTransportSeparator;
const arrayOfString = (identifiers = []) => {
    // count the number of characters found in all the identifiers
    // we need this number to construct the Uint8Array
    const identifiersLength = identifiers
        .map((item) => {
        return item.length;
    })
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    // get the number of NQL separators
    // ex. 2 identifiers will need one seporator
    // we need this number to construct the Uint8Array
    const seporatorLength = identifiers.length <= 1 ? 0 : identifiers.length - 1;
    const uint8Length = identifiersLength + seporatorLength;
    const bufView = new Uint8Array(uint8Length);
    let arrayCount = 0;
    identifiers.map((item, key) => {
        const strLen = item.length;
        for (let i = 0; i < strLen; i++) {
            bufView[arrayCount] = item.charCodeAt(i);
            arrayCount = arrayCount + 1;
        }
        if (identifiers.length - 1 !== key) {
            bufView[arrayCount] = enum_1.ESeparator.Vertical;
            arrayCount = arrayCount + 1;
        }
    });
    return bufView;
};
exports.arrayOfString = arrayOfString;
const toRecordSeparator = (recordArray) => {
    return (0, exports.toTransportSeparator)(recordArray, enum_1.ESeparator.Record);
};
exports.toRecordSeparator = toRecordSeparator;
const stringToUint8Array = (str) => {
    const bufView = new Uint8Array(str.length);
    const strLen = str.length;
    for (let i = 0; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
};
exports.stringToUint8Array = stringToUint8Array;
const toGroupSeparator = (records, data) => {
    const seporatorArray = new Uint8Array(1);
    seporatorArray[0] = enum_1.ESeparator.Group;
    const bitLength = records.byteLength + seporatorArray.byteLength + data.byteLength;
    const buf = new ArrayBuffer(bitLength);
    let tmp = new Uint8Array(buf);
    tmp.set(new Uint8Array(records), 0);
    tmp.set(seporatorArray, records.byteLength);
    tmp.set(new Uint8Array(data), records.byteLength + 1);
    return tmp.buffer;
};
exports.toGroupSeparator = toGroupSeparator;
const generateTransport = (data, topicName, identifiers) => {
    const topicNamePayload = (0, exports.topicPayload)(topicName);
    const nql = (0, exports.nqlPayload)((0, exports.arrayOfString)(identifiers));
    const records = (0, exports.toRecordSeparator)([topicNamePayload, nql]);
    const groups = (0, exports.toGroupSeparator)(records, data);
    return groups;
};
exports.generateTransport = generateTransport;
//# sourceMappingURL=transport.js.map