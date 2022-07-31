export declare class ControllerBase {
    response(code: string, data: object, msg?: string, error?: boolean): {
        code: number;
        msg: any;
        error: boolean;
        data: object;
    };
    paginate(data: any): any;
    private CODE_HTTP_OBJECT;
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
    };
    getMessage(code: any): any;
    getCode(code: any): any;
    getInstanceObject(object: any, instanceRealObject: any): any;
    private validateAsync;
    validator(data: any): Promise<{}>;
    getCodeOperation(): any[];
}
