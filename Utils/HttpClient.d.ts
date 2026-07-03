export default class HttpClient {
    static vid: number;
    static _initialize: boolean;
    static gid: number;
    static gameUrl: string;
    static secret: string;
    static HEADER_TYPE_JSON: string;
    static HEADER_TYPE_FORM: string;
    static init(): void;
    static postJson(t: any, e: any, n: any): void;
    static getInfo(e: any, n: any): void;
    static get(url: any, callback: any): void;
    static gameRequest(e: any, n: any, a: any, o: any): void;
    static getFormStr(t: any, e: any, n?: boolean, a?: boolean): string;
    static getJsonStr(e: any, n: any, a?: boolean): string;
    static postObj(t: any, e: any, n: any, a?: boolean): void;
    static put(url: any, body: any, callback: any, contentType?: any): void;
    static saveData(t: any): void;
    static getMd5(t: any, e: any): string;
    static post(url: any, body: any, callback: any, contentType?: any): void;
    static async_post(url: any, body: any, contentType?: any): Promise<unknown>;
}
