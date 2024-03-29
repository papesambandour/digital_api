"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mtnApiConfig = void 0;
const mtnApiConfig = (country) => {
    if (country === 'bj') {
        return {
            remittance: {
                primaryKey: process.env.MTN_BJ_REMITANCE_PRIMARY_KEY,
                secondaryKey: process.env.MTN_BJ_REMITANCE_SECONDARY_KEY,
                apiUserId: process.env.MTN_BJ_REMITANCE_API_USER_ID,
                apiUserKey: process.env.MTN_BJ_REMITANCE_API_USER_KEY,
                envTarget: process.env.MTN_BJ_REMITANCE_ENV_TARGET,
                currency: process.env.MTN_BJ_REMITANCE_CURRENCY,
                ressource: 'disbursement',
                operation: 'transfer',
                callback: process.env.MTN_BJ_CALLBACK,
                baseUrl: process.env.MTN_BJ_BASE_URL,
            },
            collection: {
                primaryKey: process.env.MTN_BJ_COLLECTION_PRIMARY_KEY,
                secondaryKey: process.env.MTN_BJ_COLLECTION_SECONDARY_KEY,
                apiUserId: process.env.MTN_BJ_COLLECTION_API_USER_ID,
                apiUserKey: process.env.MTN_BJ_COLLECTION_API_USER_KEY,
                envTarget: process.env.MTN_BJ_COLLECTION_ENV_TARGET,
                currency: process.env.MTN_BJ_COLLECTION_CURRENCY,
                ressource: 'collection',
                operation: 'requesttopay',
                callback: process.env.MTN_BJ_CALLBACK,
                baseUrl: process.env.MTN_BJ_BASE_URL,
            },
        };
    }
    else if (country === 'ci') {
        return {
            remittance: {
                primaryKey: process.env.MTN_CI_REMITANCE_PRIMARY_KEY,
                secondaryKey: process.env.MTN_CI_REMITANCE_SECONDARY_KEY,
                apiUserId: process.env.MTN_CI_REMITANCE_API_USER_ID,
                apiUserKey: process.env.MTN_CI_REMITANCE_API_USER_KEY,
                envTarget: process.env.MTN_CI_REMITANCE_ENV_TARGET,
                currency: process.env.MTN_CI_REMITANCE_CURRENCY,
                ressource: 'disbursement',
                operation: 'transfer',
                callback: process.env.MTN_CI_CALLBACK,
                baseUrl: process.env.MTN_CI_BASE_URL,
            },
            collection: {
                primaryKey: process.env.MTN_CI_COLLECTION_PRIMARY_KEY,
                secondaryKey: process.env.MTN_CI_COLLECTION_SECONDARY_KEY,
                apiUserId: process.env.MTN_CI_COLLECTION_API_USER_ID,
                apiUserKey: process.env.MTN_CI_COLLECTION_API_USER_KEY,
                envTarget: process.env.MTN_CI_COLLECTION_ENV_TARGET,
                currency: process.env.MTN_CI_COLLECTION_CURRENCY,
                ressource: 'collection',
                operation: 'requesttopay',
                callback: process.env.MTN_CI_CALLBACK,
                baseUrl: process.env.MTN_CI_BASE_URL,
            },
        };
    }
};
exports.mtnApiConfig = mtnApiConfig;
//# sourceMappingURL=config.js.map