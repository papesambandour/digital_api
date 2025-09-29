"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyGramSignatureVerifier = void 0;
const crypto = require("crypto");
class MoneyGramSignatureVerifier {
    static parseSignatureHeader(signatureHeader) {
        try {
            const parts = signatureHeader.split(', ');
            let timestamp = null;
            let signature = null;
            for (const part of parts) {
                const [key, value] = part.split('=');
                if (key === 't') {
                    timestamp = parseInt(value, 10);
                }
                else if (key === 's') {
                    signature = value;
                }
            }
            if (timestamp && signature) {
                return { timestamp, signature };
            }
            return null;
        }
        catch (error) {
            console.error('Error parsing signature header:', error);
            return null;
        }
    }
    static verifySignature(signatureHeader, destinationHost, body, mode) {
        try {
            const parsed = this.parseSignatureHeader(signatureHeader);
            if (!parsed) {
                return { isValid: false, error: 'Invalid signature header format' };
            }
            const { timestamp, signature } = parsed;
            const currentTimestamp = Math.floor(Date.now() / 1000);
            const maxAge = 65 * 60;
            if (currentTimestamp - timestamp > maxAge) {
                return {
                    isValid: false,
                    error: `Request too old: ${currentTimestamp - timestamp} seconds (max ${maxAge})`,
                };
            }
            const publicKeyString = mode === 'sandbox'
                ? this.SANDBOX_PUBLIC_KEY
                : this.PRODUCTION_PUBLIC_KEY;
            const publicKey = `-----BEGIN PUBLIC KEY-----\n${publicKeyString}\n-----END PUBLIC KEY-----`;
            const payload = `${timestamp}.${destinationHost}.${body}`;
            const payloadBuffer = Buffer.from(payload);
            const algorithm = 'RSA-SHA256';
            const isVerified = crypto.verify(algorithm, payloadBuffer, publicKey, Buffer.from(signature, 'base64'));
            return { isValid: isVerified };
        }
        catch (error) {
            console.error('Error verifying signature:', error);
            return { isValid: false, error: error.message };
        }
    }
    static getProductionIPs() {
        return ['3.137.64.179', '3.137.64.157', '3.13.206.10'];
    }
    static getSandboxIPs() {
        return ['3.16.53.226', '3.143.88.249'];
    }
    static getMoneyGramIPs(mode) {
        return mode === 'sandbox' ? this.getSandboxIPs() : this.getProductionIPs();
    }
}
exports.MoneyGramSignatureVerifier = MoneyGramSignatureVerifier;
MoneyGramSignatureVerifier.SANDBOX_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Dm7LFleQyaXakYdNOvCv2Irm2ufOcncek0Q4J+MtzmEYvdlfhx5Sm206s2Z5l0/+6YyA3tFljRNCFar3lm96o/S6IFNo0xOsCy+Il7EzQNl4S7kojqnOGfgMgUBC/qxf0S7zkh7y0St8G3OpcjYg7Ff7PAFXmcgjk22F1lUeOqy+zyP2dRJ+NEKZrcHJhbFheB0dPH++e+1foHSfhz+I+Pt9DDaESJasJptZGo0Ww3U+KkPmrDriOLbvpdE4r7MKzeQfGa7SMx4VzhtWFa98/6V6MO29ZjkegejHBZsCekA/1NU0gAQhQnxuYsgdCn/9LogrWqUS8Tl44K2yPYCsQIDAQAB';
MoneyGramSignatureVerifier.PRODUCTION_PUBLIC_KEY = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtPGnqyaDXdZgsYqLuj+hP44TM4hTgnQi+Giq25FIXITANi5kHqS7/PtxGl0QsJex84NabOVc20PI56Nwk2X2+tid1dAXnIDH4S0dQeNRjTt3QRd3eNn0ikCKFZ+yJWyZ2IR1bkWR+FHn1WBjeC5DwrF4Jpmpv6D+YJGvJRFsDbjS3VFypN4RxF146kHDm3T/5cTFDhXnubgjWhi/T7dYpN881bY4Lh8y3maNpruH99bzTZEtkpyBpm4dnBUnmWdSDNgchhT/8t6nLzVczp1bDSl8cV5WUsgftaDW1aVZrde2fVuEnNwEvD5eFv/C9/8KwBRqr898aw7ZzMD9Y9vBkQIDAQAB';
//# sourceMappingURL=MoneyGramSignatureVerifier.js.map