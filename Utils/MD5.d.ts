export default class MD5 {
    static hexcase: number;
    static chrsz: number;
    static b64pad: string;
    static safe_add(x: number, y: number): number;
    static md5_cmn(q: number, a: number, b: number, x: number, s: number, t: number): number;
    static md5_hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
    static md5_vm_test(): boolean;
    static md5_ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
    static hex_md5(s: string): string;
    static core_md5(x: number[], len: number): number[];
    static binl2b64(binarray: number[]): string;
    static binl2hex(binarray: number[]): string;
    static bit_rol(num: number, cnt: number): number;
    static str2binl(str: string): number[];
    static md5_ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
    static md5_gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number;
    static core_hmac_md5(key: string, data: string): number[];
}
