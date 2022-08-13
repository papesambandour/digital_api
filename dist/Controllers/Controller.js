"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBase = exports.CODE_HTTP_OBJECT = exports.CODE_HTTP = void 0;
const class_validator_1 = require("class-validator");
exports.CODE_HTTP = {
    OK_OPERATION: 'OK_OPERATION',
    OK: 'OK',
    NOTFOUND: 'NOTFOUND',
    CREATED: 'CREATED',
    UPDATED: 'UPDATED',
    DELETED: 'DELETED',
    NOTVALID: 'NOTVALID',
    STATE_CHANGE: 'STATE_CHANGE',
    OPERATION_SUCCESS: 'OPERATION_SUCCESS',
    OPERATION_: 'OPERATION_SUCCESS',
    OPERATION_BADREQUEST: 'OPERATION_BADREQUEST',
    OPERATION_AUTH_NEED: 'OPERATION_AUTH_NEED',
    OPERATION_ACCESS_DENY: 'OPERATION_ACCESS_DENY',
    SERVICE_DOWN: 'SERVICE_DOWN',
    NOT_IMPLEMENTED: 'NOT_IMPLEMENTED',
    UNKNOW_ERROR: 'UNKNOW_ERROR',
};
exports.CODE_HTTP_OBJECT = {
    OK: {
        code: 200,
        msg: 'Donnés disponible',
    },
    OK_OPERATION: {
        code: 2000,
        msg: 'Successfully operation',
    },
    NOTFOUND: {
        code: 404,
        msg: "Les ressources demandés n'existent pas",
    },
    CREATED: {
        code: 201,
        msg: 'Les donnés ont été sauvegardés avec succès',
    },
    UPDATED: {
        code: 201,
        msg: 'Les donnés ont été mis a jour avec succès',
    },
    DELETED: {
        code: 204,
        msg: 'Les donnés ont été supprimés avec succès',
    },
    NOTVALID: {
        code: 400,
        msg: 'Les donnés envoyés sont invalides',
    },
    STATE_CHANGE: {
        code: 203,
        msg: "L'etat a été modifié avec succès",
    },
    OPERATION_SUCCESS: {
        code: 2000,
        msg: "Votre opération s'est effectuée sans erreur. Veuillez attendre le callback pour avoir l'état final de la transaction",
    },
    OPERATION_BADREQUEST: {
        code: 4000,
        msg: 'Les parametres envoyés sont invalides',
    },
    OPERATION_AUTH_NEED: {
        code: 4000,
        msg: "L'authentification est requis !!!",
    },
    OPERATION_ACCESS_DENY: {
        code: 4000,
        msg: "Le service demandés n'est authorizé pour votre clee API",
    },
    SERVICE_DOWN: {
        code: 4000,
        msg: "Le service demandé n'est pas disponible",
    },
    NOT_IMPLEMENTED: {
        code: 4000,
        msg: "Le service demandé n'est pas disponible",
    },
    UNKNOW_ERROR: {
        code: 4000,
        msg: "Une erreur inconnue s'est produite",
    },
};
class ControllerBase {
    constructor() {
        this.CODE_HTTP = exports.CODE_HTTP;
        this.CODE_HTTP_OBJECT = exports.CODE_HTTP_OBJECT;
    }
    response(code, data, msg = '', error = false) {
        return {
            code: +this.getCode(code),
            msg: msg || this.getMessage(code),
            error: error,
            data: data || {},
        };
    }
    paginate(data) {
        return data;
    }
    getMessage(code) {
        return this.CODE_HTTP_OBJECT[code].msg;
    }
    getCode(code) {
        return this.CODE_HTTP_OBJECT[code].code;
    }
    getInstanceObject(object, instanceRealObject) {
        const newInsatance = new instanceRealObject.constructor();
        for (const key in object) {
            newInsatance[key] = object[key];
        }
        return newInsatance;
    }
    async validator(data) {
        const erros = (await this.validateAsync(data)) || [];
        if (erros.length === 0) {
            return null;
        }
        const msg = {};
        erros.filter((err) => {
            msg[err.property] = [];
            for (const key in err.constraints) {
                msg[err.property].push(err.constraints[key]);
            }
        });
        return msg;
    }
    getCodeOperation() {
        const code_operations = [];
        for (const key in this.CODE_HTTP_OBJECT) {
            if (this.CODE_HTTP_OBJECT[key].code >= 2000) {
                code_operations.push({
                    code: this.CODE_HTTP_OBJECT[key].code,
                    message: this.CODE_HTTP_OBJECT[key].msg,
                });
            }
        }
        return code_operations;
    }
    validateAsync(data) {
        return new Promise((resolve, reject) => {
            class_validator_1.validate(data).then((errors) => {
                resolve(errors);
            });
        });
    }
}
exports.ControllerBase = ControllerBase;
//# sourceMappingURL=Controller.js.map