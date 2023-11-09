import { WAVE_COUNTRY } from './WaveApiProvider';
export declare const waveBusinessApiConfig: (country: WAVE_COUNTRY) => {
    sessionId: () => Promise<string>;
    walletId: string;
    cashOutApiKey: string;
    cashInApiKey: string;
};
