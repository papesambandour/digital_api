export declare class SocketBodyMessage {
    room: string;
    codeSecret: string;
    data: SMS;
}
export declare class SocketInternal {
    id: string;
    room: string;
}
export declare class SocketBodyFinish {
    room: string;
    transactionId: number | string;
    codeSecret: string;
    data: string;
}
export declare class SMS {
    numeroCentre: string | null;
    numero: string | null;
    operateur: string | null;
    date: string | null;
    content: string | null;
}
