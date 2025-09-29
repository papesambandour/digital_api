"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BictorisSNCashOutApiManagerService = void 0;
const api_manager_interface_service_1 = require("../api-manager-interface/api-manager-interface.service");
const Controller_1 = require("../../Controller");
const Enum_entity_1 = require("../../../Models/Entities/Enum.entity");
const PartnerBictorisMerchant_entity_1 = require("../../../Models/Entities/PartnerBictorisMerchant.entity");
const BictorisProvider_1 = require("../../../sdk/Bictoris/BictorisProvider");
const main_1 = require("../../../main");
class BictorisSNCashOutApiManagerService extends api_manager_interface_service_1.ApiManagerInterface {
    static getBictorisProvider() {
        console.log('🔄 [BICTORIS] Creating new BictorisProvider instance...');
        return new BictorisProvider_1.BictorisProvider();
    }
    async checkStatusTransaction(params) {
        console.log('🔍 [BICTORIS] checkStatusTransaction called with transaction ID:', params.transaction.transactionId);
        return (await this.notImplementedYet(params));
    }
    async confirmTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async handleCallbackTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async initTransaction(params) {
        var _a, _b, _c, _d;
        console.log('🚀 [BICTORIS] Starting initTransaction with params:', {
            phone: params.dto.phone,
            amount: params.dto.amount,
            codeService: params.dto.codeService,
            externalTransactionId: params.dto.externalTransactionId,
            useOMQrCode: params.dto.useOMQrCode,
            hasData: !!params.dto.data,
        });
        try {
            console.log('📋 [BICTORIS] Full DTO received:', Object.assign(Object.assign({}, params.dto), { data: params.dto.data ? 'DATA_PRESENT' : 'NO_DATA' }));
            console.log('🌐 [BICTORIS] Request URLs:', {
                callbackUrl: params.dto.callbackUrl,
                successRedirectUrl: params.dto.successRedirectUrl,
                errorRedirectUrl: params.dto.errorRedirectUrl,
            });
            if (params.dto.data) {
                console.log('📄 [BICTORIS] Raw data content:', params.dto.data);
                try {
                    const parsedData = typeof params.dto.data === 'string'
                        ? JSON.parse(params.dto.data)
                        : params.dto.data;
                    console.log('🔍 [BICTORIS] Parsed data structure:', JSON.stringify(parsedData, null, 2));
                }
                catch (error) {
                    console.error('❌ [BICTORIS] Failed to parse data:', error);
                }
            }
            const api = await this.loadBalancingPhone();
            console.log('📱 [BICTORIS] Load balancing phone result:', api
                ? `Phone ID: ${api.id}, Number: ${api.number}`
                : 'No phone available');
            const baseResponse = {
                phone: params.dto.phone,
                amount: params.dto.amount.toString(),
                externalTransactionId: params.dto.externalTransactionId,
                codeService: params.dto.codeService,
                callbackUrl: params.dto.callbackUrl,
            };
            if (this.apiService.partner.id !== 3 &&
                this.apiService.partner.id !== 1) {
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Paiement temporairement indisponible, veuillez ressayer plus tard!',
                    usedPhoneId: api.id,
                }, baseResponse);
            }
            if (!api) {
                console.log('❌ [BICTORIS] No API phone available, returning SERVICE_DOWN');
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.SERVICE_DOWN,
                    partnerMessage: api_manager_interface_service_1.MANAGER_INIT_DOWN_MESSAGE,
                }, baseResponse);
            }
            console.log('📝 [BICTORIS] Creating transaction with API phone:', api.id);
            const transaction = await this.createTransaction(api);
            console.log('✅ [BICTORIS] Transaction created:', {
                transactionId: transaction.transactionId,
                id: transaction.id,
                amount: transaction.amount,
                phone: transaction.phone,
            });
            console.log('🏪 [BICTORIS] Starting merchant setup process...');
            const merchantSetup = await this.createAndSetupMerchant(params.dto);
            console.log('🏪 [BICTORIS] Merchant setup result:', merchantSetup);
            if (!merchantSetup) {
                console.log('❌ [BICTORIS] Merchant setup failed');
                let merchantData = null;
                try {
                    const parsedData = typeof params.dto.data === 'string'
                        ? JSON.parse(params.dto.data)
                        : params.dto.data;
                    merchantData = parsedData === null || parsedData === void 0 ? void 0 : parsedData.bictorys;
                }
                catch (error) {
                    console.error('❌ [BICTORIS] Failed to parse merchant data for notification:', error);
                }
                await this.helper.notifyAdmin('BICTORIS MERCHANT SETUP FAILED', Enum_entity_1.TypeEvenEnum.UNKNOWN_RESPONSE_INIT, {
                    transactionId: transaction.transactionId,
                    externalTransactionId: params.dto.externalTransactionId,
                    amount: params.dto.amount,
                    phone: params.dto.phone,
                    merchantRequest: merchantData,
                    error: 'Merchant setup failed - check logs for details',
                    partnerId: this.apiService.partner.id,
                    partnerName: this.apiService.partner.name,
                }, true, 'alert');
                transaction.errorMessage = 'Failed to setup Bictoris merchant';
                await transaction.save();
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Failed to setup Bictoris merchant',
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                }, baseResponse);
            }
            const merchantEmail = this.extractMerchantEmail(params.dto);
            console.log('🔍 [BICTORIS] Looking for merchant with email:', merchantEmail);
            const merchant = await PartnerBictorisMerchant_entity_1.PartnerBictorisMerchant.findOne({
                where: {
                    partnerId: this.apiService.partner.id,
                    merchantEmail: merchantEmail,
                },
            });
            console.log('🔍 [BICTORIS] Merchant lookup result:', merchant ? `Found: ${merchant.merchantId}` : 'Not found');
            if (!merchant) {
                console.log('❌ [BICTORIS] Merchant not found after setup');
                transaction.errorMessage = 'Merchant not found after setup';
                await transaction.save();
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Merchant not found after setup',
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                }, baseResponse);
            }
            console.log('🔍 [BICTORIS] STRICT VALIDATION - merchant before charge creation:', {
                merchantId: merchant.merchantId,
                isEnabled: merchant.isEnabled,
                hasPublicKey: !!merchant.publicKey,
                publicKeyValue: ((_a = merchant.publicKey) === null || _a === void 0 ? void 0 : _a.substring(0, 20)) + '...',
                waveEnabled: merchant.waveEnabled,
                webhookConfigured: merchant.webhookConfigured,
            });
            if (!merchant.isEnabled) {
                console.error('❌ [BICTORIS] STRICT: Merchant is not enabled - cannot create charge');
                transaction.errorMessage = 'Merchant account not fully activated';
                await transaction.save();
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Merchant account activation failed. Manual intervention required.',
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                }, baseResponse);
            }
            if (!merchant.publicKey || merchant.publicKey === '') {
                console.error('❌ [BICTORIS] STRICT: Invalid/placeholder public key - cannot create charge');
                console.error('🔧 [BICTORIS] Current public key:', ((_b = merchant.publicKey) === null || _b === void 0 ? void 0 : _b.substring(0, 30)) + '...');
                transaction.errorMessage =
                    'Merchant account not properly configured - missing valid public key';
                await transaction.save();
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Merchant configuration incomplete. Please contact support to complete account setup.',
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                }, baseResponse);
            }
            const paymentType = params.dto.codeService === Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_OUT
                ? 'wave_money'
                : 'orange_money';
            if (paymentType === 'wave_money' && !merchant.waveEnabled) {
                console.error('❌ [BICTORIS] Wave payment requested but Wave not enabled');
                transaction.errorMessage = 'Wave payment not enabled for merchant';
                await transaction.save();
                return Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Wave payment not available, please try another method',
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                }, baseResponse);
            }
            console.log('🔍 [BICTORIS] REAL-TIME STATUS CHECK: Verifying merchant status before charge creation...');
            try {
                const realtimeStatus = await BictorisSNCashOutApiManagerService.getBictorisProvider().getAccountStatus(merchant.merchantId);
                console.log('📊 [BICTORIS] Real-time merchant status:', {
                    merchantId: merchant.merchantId,
                    dbStatus: {
                        isEnabled: merchant.isEnabled,
                        waveEnabled: merchant.waveEnabled,
                        webhookConfigured: merchant.webhookConfigured,
                    },
                    apiStatus: {
                        status: realtimeStatus.status,
                        id: realtimeStatus.id,
                        updatedAt: realtimeStatus.updatedAt,
                    },
                    statusMatch: merchant.isEnabled === (realtimeStatus.status === 'active'),
                });
                if (realtimeStatus.status !== 'active') {
                    console.error('❌ [BICTORIS] CRITICAL: Merchant status is NOT active on Bictoris API:', {
                        merchantId: merchant.merchantId,
                        actualApiStatus: realtimeStatus.status,
                        databaseStatus: merchant.isEnabled ? 'enabled' : 'disabled',
                        waveEnabled: merchant.waveEnabled,
                        accountStatusId: realtimeStatus.id,
                        lastUpdated: realtimeStatus.updatedAt,
                    });
                    transaction.errorMessage = `Merchant account status is ${realtimeStatus.status} (not active) - cannot create charge`;
                    await transaction.save();
                    return Object.assign({
                        status: Enum_entity_1.StatusEnum.FAILLED,
                        codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                        partnerMessage: `Account activation pending. Status: ${realtimeStatus.status}. Please try again in a few minutes or contact support.`,
                        transaction: transaction,
                        transactionId: transaction.transactionId,
                        usedPhoneId: api.id,
                    }, baseResponse);
                }
                console.log('✅ [BICTORIS] Real-time status verification passed - merchant is active on Bictoris API');
            }
            catch (statusError) {
                console.error('⚠️ [BICTORIS] Could not verify real-time merchant status:', {
                    error: statusError.message,
                    merchantId: merchant.merchantId,
                    httpStatus: (_c = statusError.response) === null || _c === void 0 ? void 0 : _c.status,
                    httpData: (_d = statusError.response) === null || _d === void 0 ? void 0 : _d.data,
                });
                console.warn('⚠️ [BICTORIS] Proceeding with charge creation despite status check failure');
            }
            const chargeRequest = {
                amount: transaction.amount,
                currency: 'XOF',
                paymentReference: transaction.transactionId.toString(),
                merchantReference: `PAYTECH-${transaction.transactionId}`,
                successRedirectUrl: params.dto.successRedirectUrl,
                failureRedirectUrl: params.dto.errorRedirectUrl,
            };
            console.log('💳 [BICTORIS] Charge request prepared:', {
                amount: chargeRequest.amount,
                currency: chargeRequest.currency,
                paymentReference: chargeRequest.paymentReference,
                merchantReference: chargeRequest.merchantReference,
                successRedirectUrl: chargeRequest.successRedirectUrl,
                failureRedirectUrl: chargeRequest.failureRedirectUrl,
            });
            console.log('💳 [BICTORIS] Payment type determined:', paymentType);
            console.log('💳 [BICTORIS] Using merchant public key:', merchant.publicKey ? 'KEY_PRESENT' : 'NO_KEY');
            console.log('🌐 [BICTORIS] Calling createCharge API...');
            const response = await BictorisSNCashOutApiManagerService.getBictorisProvider().createCharge(chargeRequest, merchant.publicKey, paymentType);
            console.log('🌐 [BICTORIS] Create charge API response:', {
                transactionId: response.transactionId,
                type: response.type,
                link: response.link,
                qrCodePresent: !!response.qrCode,
                redirectUrl: response.redirectUrl,
                merchantReference: response.merchantReference,
                message: response.message,
                state: response.state,
            });
            const isSuccess = !!response.transactionId && !!response.link;
            const statues = this.helper.getStatusAfterExec(isSuccess ? 'success' : 'failed', this.apiService.sousServices);
            console.log('📊 [BICTORIS] Status mapping result:', statues);
            transaction.statut = statues['status'];
            transaction.preStatut = statues['preStatus'];
            transaction.sousServiceTransactionId = response === null || response === void 0 ? void 0 : response.transactionId;
            console.log('💾 [BICTORIS] Updating transaction with status:', {
                status: statues['status'],
                preStatus: statues['preStatus'],
                sousServiceTransactionId: response === null || response === void 0 ? void 0 : response.transactionId,
                isSuccess: isSuccess,
            });
            await transaction.save();
            if (isSuccess) {
                console.log('✅ [BICTORIS] Charge creation successful, updating transaction data');
                transaction.message = main_1.serializeData(response);
                transaction.timeOutAt = this.helper.addMinuteToDate(new Date(), 30);
                const bictorisData = {
                    transactionId: response.transactionId,
                    chargeId: response.transactionId,
                    merchantId: merchant.merchantId,
                    qrCode: response.qrCode,
                    link: response.link,
                    type: response.type,
                    status: 'pending',
                    createdAt: new Date().toISOString(),
                };
                transaction.bictorisData = main_1.serializeData(bictorisData);
                console.log('💾 [BICTORIS] Bictoris data to store:', bictorisData);
                console.log('📱 [BICTORIS] Setting up payment deep link');
                transaction.deepLinkUrl = response.link;
                transaction.successRedirectUrl = params.dto.successRedirectUrl;
                transaction.errorRedirectUrl = params.dto.errorRedirectUrl;
                transaction.needCheckTransaction = 0;
                console.log('📱 [BICTORIS] Deep link URL set:', transaction.deepLinkUrl);
                await transaction.save();
                console.log('💾 [BICTORIS] Transaction saved with all data');
                console.log('📱 [BICTORIS] Preparing notification message for payment');
                const deepLink = `${process.env.APP_INTERNAL_URL}/deep/${transaction.transactionId}`;
                console.log('🔗 [BICTORIS] Deep link generated:', deepLink);
                const messageNotification = await this.helper.getDeepLinkNotificationMessage(transaction, deepLink);
                console.log('📧 [BICTORIS] Notification message prepared');
                const to = `+${this.apiService.sousServices.executeCountryCallCodeWithoutPlus}${params.dto.phone}`;
                console.log('📞 [BICTORIS] SMS recipient:', to);
                setTimeout(async () => {
                    const canSendLink = await this.apiService.partner.getCanSendWavePaymentLink();
                    console.log('📤 [BICTORIS] Can send payment link:', canSendLink);
                    if (canSendLink) {
                        console.log('📤 [BICTORIS] Sending SMS notification');
                        this.helper
                            .sendSms([to], messageNotification, this.apiService.sousServices.executeSmsSender, false, 30)
                            .then(() => {
                            console.log('✅ [BICTORIS] SMS sent successfully');
                        })
                            .catch((error) => {
                            console.log('❌ [BICTORIS] SMS sending failed:', error);
                        });
                    }
                    else {
                        console.log('🚫 [BICTORIS] SMS sending disabled for partner');
                    }
                }, 0);
                console.log('✅ [BICTORIS] Payment initiated successfully');
                console.log('⏰ [BICTORIS] Starting limited check status monitoring');
                this.helper.limitedCheckStatus(this, transaction).then();
                const successResponse = Object.assign({
                    status: Enum_entity_1.StatusEnum.PENDING,
                    codeHttp: Controller_1.CODE_HTTP.OK_OPERATION,
                    partnerMessage: api_manager_interface_service_1.MANAGER_INIT_CASH_OUT_SUCCESS_MESSAGE,
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                    data: {
                        notificationMessage: messageNotification,
                        amount: transaction.amount,
                        deepLinkUrl: deepLink,
                        paymentLink: response.link,
                        _be_removed_deepLinkUrl_: response.link,
                        _be_removed_deepQrCode_: response.qrCode,
                    },
                }, baseResponse);
                console.log('🎉 [BICTORIS] Returning success response for transaction:', transaction.transactionId);
                return successResponse;
            }
            else {
                console.log('❌ [BICTORIS] Charge creation failed:', response.message);
                transaction.errorMessage = main_1.serializeData(response);
                await transaction.save();
                const errorResponse = Object.assign({
                    status: Enum_entity_1.StatusEnum.FAILLED,
                    codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                    partnerMessage: 'Impossible de procéder au paiement ressayer plus tard',
                    transaction: transaction,
                    transactionId: transaction.transactionId,
                    usedPhoneId: api.id,
                }, baseResponse);
                console.log('❌ [BICTORIS] Returning error response for transaction:', transaction.transactionId);
                return errorResponse;
            }
        }
        catch (error) {
            console.error('💥 [BICTORIS] Critical error in initTransaction:', {
                error: error.message,
                stack: error.stack,
                phone: params.dto.phone,
                amount: params.dto.amount,
                externalTransactionId: params.dto.externalTransactionId,
            });
            const baseResponse = {
                phone: params.dto.phone,
                amount: params.dto.amount.toString(),
                externalTransactionId: params.dto.externalTransactionId,
                codeService: params.dto.codeService,
                callbackUrl: params.dto.callbackUrl,
            };
            return Object.assign({
                status: Enum_entity_1.StatusEnum.FAILLED,
                codeHttp: Controller_1.CODE_HTTP.UNKNOW_ERROR,
                partnerMessage: "Une erreur critique s'est produite lors de l'initialisation du paiement",
            }, baseResponse);
        }
    }
    async refundTransaction(params) {
        return (await this.notImplementedYet(params));
    }
    async getBalance(params) {
        return {
            success: true,
            newBalance: 100,
        };
    }
    async handleCallback(callbackData, transaction) {
        console.log('🔔 [BICTORIS] Callback received:', {
            chargeId: callbackData.id,
            status: callbackData.status,
            amount: callbackData.amount,
            merchantReference: callbackData.merchantReference,
            transactionId: transaction.transactionId,
        });
        try {
            let bictorisData = null;
            if (transaction.bictorisData) {
                bictorisData = JSON.parse(transaction.bictorisData);
                console.log('📊 [BICTORIS] Existing Bictoris data found:', {
                    chargeId: bictorisData.chargeId,
                    merchantId: bictorisData.merchantId,
                });
            }
            let newStatus;
            switch (callbackData.status) {
                case 'succeeded':
                    newStatus = Enum_entity_1.StatusEnum.SUCCESS;
                    break;
                case 'failed':
                case 'cancelled':
                    newStatus = Enum_entity_1.StatusEnum.FAILLED;
                    break;
                case 'pending':
                case 'processing':
                    newStatus = Enum_entity_1.StatusEnum.PENDING;
                    break;
                case 'reversed':
                    newStatus = Enum_entity_1.StatusEnum.REFUNDED;
                    break;
                case 'authorized':
                    newStatus = Enum_entity_1.StatusEnum.PENDING;
                    break;
                default:
                    newStatus = Enum_entity_1.StatusEnum.PENDING;
            }
            console.log('🔄 [BICTORIS] Status mapping:', {
                bictorisStatus: callbackData.status,
                internalStatus: newStatus,
            });
            const previousStatus = transaction.statut;
            transaction.statut = newStatus;
            transaction.message = main_1.serializeData(callbackData);
            if (bictorisData) {
                bictorisData.callbackStatus = callbackData.status;
                bictorisData.callbackAt = new Date().toISOString();
                bictorisData.pspName = callbackData.pspName;
                bictorisData.paymentMeans = callbackData.paymentMeans;
                bictorisData.paymentChannel = callbackData.paymentChannel;
                transaction.bictorisData = JSON.stringify(bictorisData);
            }
            await transaction.save();
            console.log('✅ [BICTORIS] Transaction updated:', {
                transactionId: transaction.transactionId,
                previousStatus: previousStatus,
                newStatus: newStatus,
                callbackStatus: callbackData.status,
            });
            return {
                success: true,
                message: 'Callback processed successfully',
                transactionId: transaction.transactionId,
                status: newStatus,
            };
        }
        catch (error) {
            console.error('💥 [BICTORIS] Callback processing error:', {
                error: error.message,
                stack: error.stack,
                transactionId: transaction.transactionId,
                callbackData: callbackData,
            });
            return {
                success: false,
                message: 'Error processing callback',
                error: error.message,
            };
        }
    }
    cleanTextField(text) {
        if (!text)
            return text || '';
        return text
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/'/g, '')
            .replace(/"/g, '')
            .replace(/[^a-zA-Z0-9\s\-_.]/g, '');
    }
    formatWebsite(website) {
        if (!website || website.trim() === '') {
            console.log('📝 [BICTORIS] Using default website: https://paytech.sn');
            return 'https://paytech.sn';
        }
        const trimmedWebsite = website.trim();
        if (trimmedWebsite.match(/^https?:\/\//i)) {
            if (trimmedWebsite.match(/^http:\/\//i)) {
                console.log(`📝 [BICTORIS] Converting http to https for website: ${trimmedWebsite}`);
                return trimmedWebsite.replace(/^http:\/\//i, 'https://');
            }
            return trimmedWebsite;
        }
        console.log(`📝 [BICTORIS] Adding https:// prefix to website: ${trimmedWebsite}`);
        return `https://${trimmedWebsite}`;
    }
    extractMerchantEmail(dto) {
        var _a, _b;
        console.log('📧 [BICTORIS] Extracting merchant email from DTO');
        if (dto.data) {
            const parsedData = typeof dto.data === 'string' ? JSON.parse(dto.data) : dto.data;
            const email = ((_b = (_a = parsedData.bictorys) === null || _a === void 0 ? void 0 : _a.merchantObject) === null || _b === void 0 ? void 0 : _b.email) || '';
            console.log('📧 [BICTORIS] Extracted email:', email);
            return email;
        }
        console.log('📧 [BICTORIS] No data in DTO, returning empty email');
        return '';
    }
    async createAndSetupMerchant(dto) {
        var _a;
        console.log('🏪 [BICTORIS] Starting createAndSetupMerchant process');
        try {
            if (!dto.data) {
                console.error('❌ [BICTORIS] No data provided for merchant creation');
                return false;
            }
            const parsedData = typeof dto.data === 'string' ? JSON.parse(dto.data) : dto.data;
            console.log('📋 [BICTORIS] Parsed DTO data keys:', Object.keys(parsedData));
            if (!parsedData.bictorys) {
                console.error('❌ [BICTORIS] No bictorys data found in dto.data');
                console.error('❌ [BICTORIS] Expected data structure:');
                console.error(`{
  "bictorys": {
    "merchantObject": {
      "name": "Merchant Name",
      "email": "merchant@example.com",
      "phone": "770123456",
      "address": "Address",
      "category": "Retail",
      "country": "SN",
      "locale": "fr-SN",
      "website": "https://example.com"
    },
    "representative": {
      "firstName": "John",
      "lastName": "Doe", 
      "email": "rep@example.com",
      "phone": "770123456",
      "address": "Address",
      "city": "Dakar",
      "country": "SN",
      "locale": "fr-SN"
    }
  }
}`);
                return false;
            }
            const bictorysData = parsedData.bictorys;
            const merchantEmail = (_a = bictorysData.merchantObject) === null || _a === void 0 ? void 0 : _a.email;
            const isWavePayment = dto.codeService === Enum_entity_1.SOUS_SERVICE_ENUM.WAVE_SN_API_CASH_OUT;
            console.log('🏪 [BICTORIS] Merchant setup parameters:', {
                merchantEmail: merchantEmail,
                isWavePayment: isWavePayment,
                partnerId: this.apiService.partner.id,
            });
            if (!merchantEmail) {
                console.error('❌ [BICTORIS] Missing merchant email in bictorys data');
                return false;
            }
            console.log('🔍 [BICTORIS] Checking for existing merchant...');
            const existingMerchant = await PartnerBictorisMerchant_entity_1.PartnerBictorisMerchant.findOne({
                where: {
                    partnerId: this.apiService.partner.id,
                    merchantEmail: merchantEmail,
                },
            });
            if (existingMerchant) {
                console.log('✅ [BICTORIS] Found existing merchant:', existingMerchant.merchantId);
                console.log('🔧 [BICTORIS] Completing partial merchant setup...');
                await this.completePartialMerchantSetup(existingMerchant, bictorysData, isWavePayment);
                console.log('✅ [BICTORIS] Partial setup completed for existing merchant');
                return true;
            }
            console.log('🆕 [BICTORIS] Creating new merchant...');
            if (!bictorysData.merchantObject || !bictorysData.representative) {
                console.error('❌ [BICTORIS] Missing merchantObject or representative in bictorys data');
                return false;
            }
            const truncateString = (str, maxLength, fieldName) => {
                if (!str)
                    return str;
                if (str.length > maxLength) {
                    console.log(`⚠️ [BICTORIS] Truncating ${fieldName || 'field'} from ${str.length} to ${maxLength} chars`);
                    return str.substring(0, maxLength);
                }
                return str;
            };
            const merchantRequest = {
                merchantObject: {
                    name: this.cleanTextField(bictorysData.merchantObject.name),
                    category: truncateString(this.cleanTextField(bictorysData.merchantObject.category || 'Retail'), 32, 'merchantObject.category'),
                    email: bictorysData.merchantObject.email,
                    phone: bictorysData.merchantObject.phone,
                    address: truncateString(this.cleanTextField(bictorysData.merchantObject.address), 32, 'merchantObject.address'),
                    country: 'SN',
                    locale: 'fr-SN',
                    website: this.formatWebsite(bictorysData.merchantObject.website),
                },
                representative: {
                    firstName: this.cleanTextField(bictorysData.representative.firstName),
                    lastName: this.cleanTextField(bictorysData.representative.lastName),
                    email: bictorysData.representative.email,
                    password: bictorysData.representative.password,
                    phone: bictorysData.representative.phone,
                    locale: 'fr-SN',
                    address: truncateString(this.cleanTextField(bictorysData.representative.address), 32, 'representative.address'),
                    city: this.cleanTextField('Dakar'),
                    country: 'SN',
                },
            };
            console.log('📝 [BICTORIS] Merchant request prepared:', {
                merchantName: merchantRequest.merchantObject.name,
                merchantEmail: merchantRequest.merchantObject.email,
                representativeName: `${merchantRequest.representative.firstName} ${merchantRequest.representative.lastName}`,
                representativeEmail: merchantRequest.representative.email,
            });
            console.log('🌐 [BICTORIS] Calling createMerchant API...');
            const createdMerchant = await BictorisSNCashOutApiManagerService.getBictorisProvider().createMerchant(merchantRequest);
            console.log('✅ [BICTORIS] Merchant created with ID:', createdMerchant.merchantId);
            console.log('🔑 [BICTORIS] Getting account status for activation...');
            const accountStatus = await BictorisSNCashOutApiManagerService.getBictorisProvider().getAccountStatus(createdMerchant.merchantId);
            console.log('🔑 [BICTORIS] Account status retrieved:', accountStatus.id);
            console.log('💾 [BICTORIS] Saving merchant to database...');
            const newMerchant = new PartnerBictorisMerchant_entity_1.PartnerBictorisMerchant();
            newMerchant.partnerId = this.apiService.partner.id;
            newMerchant.merchantId = createdMerchant.merchantId;
            newMerchant.accountStatusId = accountStatus.id;
            newMerchant.merchantEmail = merchantRequest.merchantObject.email;
            newMerchant.merchantUsername = merchantRequest.representative.email;
            newMerchant.merchantPassword = merchantRequest.representative.password;
            newMerchant.merchantName = merchantRequest.merchantObject.name;
            newMerchant.merchantPhone = merchantRequest.merchantObject.phone;
            newMerchant.merchantAddress = merchantRequest.merchantObject.address;
            newMerchant.merchantCountry = merchantRequest.merchantObject.country;
            newMerchant.merchantLocale = merchantRequest.merchantObject.locale;
            newMerchant.merchantWebsite = merchantRequest.merchantObject.website;
            newMerchant.merchantCategory = merchantRequest.merchantObject.category;
            newMerchant.representativeFirstName =
                merchantRequest.representative.firstName;
            newMerchant.representativeLastName =
                merchantRequest.representative.lastName;
            newMerchant.representativeEmail = merchantRequest.representative.email;
            newMerchant.representativePhone = merchantRequest.representative.phone;
            newMerchant.isEnabled = false;
            newMerchant.waveEnabled = false;
            newMerchant.webhookConfigured = false;
            newMerchant.publicKey = '';
            await newMerchant.save();
            console.log('💾 [BICTORIS] New merchant saved to database with ID:', newMerchant.id);
            console.log('🔑 [BICTORIS] Attempting merchant activation...');
            try {
                await BictorisSNCashOutApiManagerService.getBictorisProvider().activateMerchant(createdMerchant.merchantId);
                console.log('✅ [BICTORIS] Merchant account activated successfully');
                newMerchant.isEnabled = true;
                await newMerchant.save();
                console.log('✅ [BICTORIS] Merchant enabled in database after successful activation');
            }
            catch (error) {
                console.warn('⚠️ [BICTORIS] Merchant activation failed, merchant remains disabled:', {
                    error: error.message,
                    merchantId: createdMerchant.merchantId,
                    accountStatusId: accountStatus.id,
                });
            }
            console.log('🔧 [BICTORIS] Completing setup steps for new merchant...');
            await this.completePartialMerchantSetup(newMerchant, bictorysData, isWavePayment);
            console.log('✅ [BICTORIS] New merchant setup completed successfully');
            return true;
        }
        catch (error) {
            console.error('💥 [BICTORIS] Failed to create and setup merchant:', {
                error: error.message,
                stack: error.stack,
                partnerId: this.apiService.partner.id,
            });
            return false;
        }
    }
    async completePartialMerchantSetup(merchant, bictorysData, isWavePayment) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console.log('🔧 [BICTORIS] Starting idempotent merchant setup completion for:', merchant.merchantId);
        console.log('🔧 [BICTORIS] Current setup status:', {
            merchantId: merchant.merchantId,
            isWavePayment: isWavePayment,
            currentlyEnabled: merchant.isEnabled,
            currentWaveEnabled: merchant.waveEnabled,
            currentWebhookConfigured: merchant.webhookConfigured,
            hasPublicKey: !!merchant.publicKey,
            accountStatusId: merchant.accountStatusId,
        });
        const hasValidPublicKey = merchant.publicKey &&
            merchant.publicKey !== '' &&
            !merchant.publicKey.startsWith('PLACEHOLDER_KEY_');
        if (!hasValidPublicKey) {
            console.log('🧹 [BICTORIS] Resetting merchant with invalid/placeholder data');
            merchant.isEnabled = false;
            merchant.waveEnabled = false;
            merchant.webhookConfigured = false;
            merchant.publicKey = '';
            await merchant.save();
            console.log('🧹 [BICTORIS] Merchant reset - will attempt proper configuration');
        }
        if (!merchant.isEnabled) {
            console.log('🔑 [BICTORIS] Merchant not enabled, checking account status...');
            try {
                const accountStatus = await BictorisSNCashOutApiManagerService.getBictorisProvider().getAccountStatus(merchant.merchantId);
                console.log('📊 [BICTORIS] Current account status:', accountStatus.status);
                if (accountStatus.status !== 'active') {
                    console.log('🔑 [BICTORIS] Account not active, attempting activation...');
                    try {
                        await BictorisSNCashOutApiManagerService.getBictorisProvider().activateMerchant(merchant.merchantId);
                        console.log('✅ [BICTORIS] Merchant account activated successfully');
                        merchant.isEnabled = true;
                        await merchant.save();
                        console.log('✅ [BICTORIS] Merchant enabled in database after successful activation');
                    }
                    catch (activationError) {
                        console.error('❌ [BICTORIS] CRITICAL: Merchant activation failed:', {
                            error: activationError.message,
                            status: (_a = activationError.response) === null || _a === void 0 ? void 0 : _a.status,
                            data: (_b = activationError.response) === null || _b === void 0 ? void 0 : _b.data,
                            merchantId: merchant.merchantId,
                            accountStatusId: accountStatus.id,
                        });
                        console.error('🚫 [BICTORIS] Merchant will remain DISABLED until activation succeeds');
                        throw new Error(`Merchant activation failed: ${activationError.message}. Account status: ${accountStatus.status}. Activation endpoint returned: ${(_c = activationError.response) === null || _c === void 0 ? void 0 : _c.status}`);
                    }
                }
                else {
                    console.log('✅ [BICTORIS] Account already active');
                    merchant.isEnabled = true;
                    await merchant.save();
                    console.log('✅ [BICTORIS] Merchant enabled in database (account already active)');
                }
            }
            catch (error) {
                console.error('❌ [BICTORIS] Failed to activate merchant account:', {
                    error: error.message,
                    merchantId: merchant.merchantId,
                });
            }
        }
        else {
            console.log('✅ [BICTORIS] Merchant already enabled');
        }
        if (!merchant.waveEnabled) {
            console.log('🌊 [BICTORIS] Wave not enabled, activating for full merchant activation...');
            try {
                const waveActivationData = {
                    name: this.cleanTextField(merchant.merchantName),
                    business_sector: this.cleanTextField(merchant.merchantCategory || 'Retail'),
                    business_type: 'other',
                    business_description: `${this.cleanTextField(merchant.merchantName)} - Payment processing`,
                    business_registration_identifier: null,
                    website_url: merchant.merchantWebsite
                        ? this.formatWebsite(merchant.merchantWebsite)
                        : this.formatWebsite(`www.${this.cleanTextField(merchant.merchantName)
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, '')}.com`),
                };
                console.log('🌊 [BICTORIS] Wave activation data prepared:', {
                    name: waveActivationData.name,
                    business_sector: waveActivationData.business_sector,
                    website_url: waveActivationData.website_url,
                });
                console.log('🌐 [BICTORIS] Calling activateWaveAccount API...');
                const waveResponse = await BictorisSNCashOutApiManagerService.getBictorisProvider().activateWaveAccount(merchant.merchantId, waveActivationData);
                merchant.waveEnabled = true;
                merchant.subMerchantId = waveResponse.subMerchantId;
                await merchant.save();
                console.log('✅ [BICTORIS] Wave account activated and saved for merchant:', merchant.merchantId);
                console.log('🆔 [BICTORIS] Wave subMerchantId received:', waveResponse.subMerchantId);
                console.log('🔍 [BICTORIS] Checking merchant status after Wave activation...');
                try {
                    const finalAccountStatus = await BictorisSNCashOutApiManagerService.getBictorisProvider().getAccountStatus(merchant.merchantId);
                    console.log('📊 [BICTORIS] Final merchant status after Wave activation:', {
                        merchantId: merchant.merchantId,
                        status: finalAccountStatus.status,
                        accountStatusId: finalAccountStatus.id,
                        updatedAt: finalAccountStatus.updatedAt,
                        isNowActive: finalAccountStatus.status === 'active',
                    });
                }
                catch (statusError) {
                    console.warn('⚠️ [BICTORIS] Could not fetch final merchant status:', statusError.message);
                }
            }
            catch (error) {
                console.error('❌ [BICTORIS] Failed to activate Wave account:', {
                    error: error.message,
                    stack: error.stack,
                    merchantId: merchant.merchantId,
                });
            }
        }
        else {
            console.log('✅ [BICTORIS] Wave already enabled for merchant');
        }
        if (!merchant.webhookConfigured) {
            console.log('🔗 [BICTORIS] Webhook not configured, setting up...');
            const callbackUrl = process.env.INTECH_BICTORIS_CALLBACK;
            const webhookSecret = process.env.BICTORIS_WEBHOOK_SECRET_KEY ||
                'gHl46vamtf7UBrarxnroRJwpBjwa2aYp';
            console.log('🔍 [BICTORIS] Webhook configuration validation:', {
                callbackUrl: callbackUrl,
                callbackUrlValid: !!callbackUrl && callbackUrl.startsWith('http'),
                merchantEmail: merchant.merchantEmail,
                representativeEmail: merchant.representativeEmail,
                merchantUsername: merchant.merchantUsername,
                merchantPassword: merchant.merchantPassword
                    ? '[PROVIDED]'
                    : '[MISSING]',
                hasSecret: !!webhookSecret,
                merchantId: merchant.merchantId,
                isEnabled: merchant.isEnabled,
                accountStatusId: merchant.accountStatusId,
            });
            if (!merchant.merchantPassword ||
                merchant.merchantPassword.trim() === '') {
                console.error('❌ [BICTORIS] CRITICAL: Merchant password missing - webhook configuration impossible');
                console.error('💡 [BICTORIS] Webhook requires OAuth with merchant credentials, but password is empty');
                console.log('🚫 [BICTORIS] Skipping webhook configuration due to missing merchant password');
                console.warn('⚠️ [BICTORIS] Webhook NOT marked as configured due to missing credentials');
            }
            else if (!callbackUrl || !callbackUrl.startsWith('http')) {
                console.error('❌ [BICTORIS] CRITICAL: Invalid callback URL for webhook configuration');
                console.error('💡 [BICTORIS] Set INTECH_BICTORIS_CALLBACK environment variable to a valid HTTP(S) URL');
                console.log('🚫 [BICTORIS] Skipping webhook configuration due to invalid callback URL');
            }
            else {
                try {
                    console.log('🌐 [BICTORIS] Attempting webhook configuration with valid credentials...');
                    console.log('🔑 [BICTORIS] Using representative email for webhook authentication:', merchant.representativeEmail);
                    const webhookResponse = await BictorisSNCashOutApiManagerService.getBictorisProvider().configureWebhook(callbackUrl, webhookSecret, merchant.representativeEmail, merchant.representativeEmail, merchant.merchantPassword);
                    merchant.webhookConfigured = true;
                    merchant.webhookId = webhookResponse.id;
                    await merchant.save();
                    console.log('✅ [BICTORIS] Webhook configured and saved for merchant:', merchant.merchantId);
                    console.log('🆔 [BICTORIS] Webhook ID saved:', webhookResponse.id);
                    if (!process.env.BICTORIS_WEBHOOK_SECRET_KEY) {
                        console.log('⚠️ [BICTORIS] IMPORTANT: Set BICTORIS_WEBHOOK_SECRET_KEY in environment:', webhookSecret);
                    }
                }
                catch (error) {
                    console.error('❌ [BICTORIS] Webhook configuration failed with detailed error:', {
                        error: error.message,
                        stack: error.stack,
                        merchantId: merchant.merchantId,
                        merchantEmail: merchant.merchantEmail,
                        representativeEmail: merchant.representativeEmail,
                        merchantUsername: merchant.merchantUsername,
                        callbackUrl: callbackUrl,
                        httpStatus: (_d = error.response) === null || _d === void 0 ? void 0 : _d.status,
                        httpStatusText: (_e = error.response) === null || _e === void 0 ? void 0 : _e.statusText,
                        responseData: (_f = error.response) === null || _f === void 0 ? void 0 : _f.data,
                        responseHeaders: (_g = error.response) === null || _g === void 0 ? void 0 : _g.headers,
                    });
                    if (((_h = error.response) === null || _h === void 0 ? void 0 : _h.status) === 406) {
                        console.error('❌ [BICTORIS] HTTP 406 - Webhook endpoint does not accept the request format');
                        console.error('💡 [BICTORIS] This indicates API compatibility issues or invalid request format');
                    }
                    else if (((_j = error.response) === null || _j === void 0 ? void 0 : _j.status) === 401) {
                        console.error('❌ [BICTORIS] HTTP 401 - Authentication failed for webhook configuration');
                        console.error('💡 [BICTORIS] Merchant credentials (email/password) are invalid or expired');
                    }
                    else if (((_k = error.response) === null || _k === void 0 ? void 0 : _k.status) === 403) {
                        console.error('❌ [BICTORIS] HTTP 403 - Forbidden - Merchant may not have webhook permissions');
                        console.error('💡 [BICTORIS] Check if merchant account has proper permissions for webhook configuration');
                    }
                    else if (error.message.includes('timeout') ||
                        error.code === 'ECONNABORTED') {
                        console.error('❌ [BICTORIS] Webhook configuration timed out');
                        console.error('💡 [BICTORIS] Network or server timeout - retry might succeed');
                    }
                    else {
                        console.error('❌ [BICTORIS] Unknown webhook configuration error');
                        console.error('💡 [BICTORIS] Check Bictoris API documentation for webhook endpoint requirements');
                    }
                    console.error('🚨 [BICTORIS] CRITICAL ERROR: Webhook configuration failed - stopping merchant setup');
                    throw new Error(`Webhook configuration failed: ${error.message}. Webhooks are essential for payment status notifications. Merchant setup cannot continue without proper webhook configuration.`);
                }
            }
        }
        else {
            console.log('✅ [BICTORIS] Webhook already configured for merchant');
        }
        if (!merchant.publicKey || merchant.publicKey === '') {
            console.log('🔑 [BICTORIS] Public key missing, fetching...');
            try {
                merchant.publicKey = await BictorisSNCashOutApiManagerService.getBictorisProvider().getPublicKey(merchant.merchantId);
                await merchant.save();
                console.log('✅ [BICTORIS] Public key retrieved and saved successfully');
            }
            catch (error) {
                console.error('❌ [BICTORIS] Failed to get public key:', {
                    error: error.message,
                    stack: error.stack,
                    merchantId: merchant.merchantId,
                });
                console.warn('⚠️ [BICTORIS] Public key fetch failed - payments will not work without it');
            }
        }
        else {
            console.log('✅ [BICTORIS] Public key already present');
        }
        console.log('🔧 [BICTORIS] Partial merchant setup completion finished for:', merchant.merchantId);
    }
}
exports.BictorisSNCashOutApiManagerService = BictorisSNCashOutApiManagerService;
//# sourceMappingURL=bictoris-sn-cash-out-api-manager.service.js.map