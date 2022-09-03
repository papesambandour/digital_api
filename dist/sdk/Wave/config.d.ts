import { WAVE_COUNTRY } from './WaveApiProvider';
export declare const waveBusinessApiConfig: (country: WAVE_COUNTRY) => {
    sessionId: string;
    walletId: string;
    cashOutApiKey: string;
};
