/**
 * Convert string to Buffer, buffer will be sent to message broker
 * @param str
 * @deprecated Use stringToBuffer
 */
export declare const stringToArrayBuffer: (str: string) => ArrayBuffer;
/**
 * Convert string to Buffer, buffer will be sent to message broker
 * @param str
 */
export declare const stringToBuffer: (str: string) => ArrayBuffer;
/**
 * Convert Buffer received from message broker to string
 * @param buffer
 */
export declare const bufferToString: (buffer: ArrayBuffer | Uint8Array<ArrayBuffer>) => string;
/**
 * Convert Buffer received from message broker to string
 * @param buffer
 * @deprecated Use bufferToString
 */
export declare const uint8ArrayToString: (buffer: ArrayBuffer | Uint8Array<ArrayBuffer>) => string;
//# sourceMappingURL=Encodings.d.ts.map