export declare const CODE_HTTP: {
    OK_OPERATION: string;
    OK: string;
    NOTFOUND: string;
    CREATED: string;
    UPDATED: string;
    DELETED: string;
    NOTVALID: string;
    STATE_CHANGE: string;
    OPERATION_SUCCESS: string;
    OPERATION_: string;
    OPERATION_BADREQUEST: string;
    OPERATION_AUTH_NEED: string;
    OPERATION_ACCESS_DENY: string;
    SERVICE_DOWN: string;
    NOT_IMPLEMENTED: string;
    UNKNOW_ERROR: string;
    FAILLED: string;
};
export declare const CODE_HTTP_OBJECT: {
    OK: {
        code: number;
        msg: string;
    };
    OK_OPERATION: {
        code: number;
        msg: string;
    };
    NOTFOUND: {
        code: number;
        msg: string;
    };
    CREATED: {
        code: number;
        msg: string;
    };
    UPDATED: {
        code: number;
        msg: string;
    };
    DELETED: {
        code: number;
        msg: string;
    };
    NOTVALID: {
        code: number;
        msg: string;
    };
    STATE_CHANGE: {
        code: number;
        msg: string;
    };
    OPERATION_SUCCESS: {
        code: number;
        msg: string;
    };
    OPERATION_BADREQUEST: {
        code: number;
        msg: string;
    };
    OPERATION_AUTH_NEED: {
        code: number;
        msg: string;
    };
    OPERATION_ACCESS_DENY: {
        code: number;
        msg: string;
    };
    SERVICE_DOWN: {
        code: number;
        msg: string;
    };
    NOT_IMPLEMENTED: {
        code: number;
        msg: string;
    };
    UNKNOW_ERROR: {
        code: number;
        msg: string;
    };
    FAILLED: {
        code: number;
        msg: string;
    };
};
export declare class ControllerBase {
    CODE_HTTP: {
        OK_OPERATION: string;
        OK: string;
        NOTFOUND: string;
        CREATED: string;
        UPDATED: string;
        DELETED: string;
        NOTVALID: string;
        STATE_CHANGE: string;
        OPERATION_SUCCESS: string;
        OPERATION_: string;
        OPERATION_BADREQUEST: string;
        OPERATION_AUTH_NEED: string;
        OPERATION_ACCESS_DENY: string;
        SERVICE_DOWN: string;
        NOT_IMPLEMENTED: string;
        UNKNOW_ERROR: string;
        FAILLED: string;
    };
    private CODE_HTTP_OBJECT;
    response(code: string, data: object, msg?: string, error?: boolean): {
        code: number;
        msg: any;
        error: boolean;
        data: object;
    };
    paginate(data: any): any;
    getMessage(code: any): any;
    getCode(code: any): any;
    getInstanceObject(object: any, instanceRealObject: any): any;
    validator(data: any): Promise<{}>;
    getCodeOperation(): any[];
    private validateAsync;
}
