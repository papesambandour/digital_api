import { CustomBaseModel } from './CustomBaseModel';
export declare const APP_SETTING_WIZALL_TOKEN_NAME = "APP_SETTING_WIZALL_TOKEN_NAME";
export declare const WAVE_SESSION_ID = "WAVE_SESSION_ID";
export declare const WAVE_CI_SESSION_ID = "WAVE_CI_SESSION_ID";
export declare class AppSettings extends CustomBaseModel {
    id: number;
    name: string;
    value: string;
    state: 'ACTIVED' | 'INACTIVED' | 'DELETED';
    createdAt: Date;
    updatedAt: Date | null;
}
