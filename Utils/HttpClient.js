"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MD5_1 = require("MD5");
class HttpClient {
    static vid = 115;
    static _initialize = false;
    static gid = 1016;
    static gameUrl = "http://wxxxxxxxxxxxxxxxxxx";
    static secret = "";
    static HEADER_TYPE_JSON = "application/json";
    static HEADER_TYPE_FORM = "application/x-www-form-urlencoded";
    static init() {
        if (this._initialize)
            return;
        this._initialize = true;
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            this.gameUrl = this.gameUrl.replace("http://", "https://");
        }
    }
    static postJson(t, e, n) {
        const a = this.getJsonStr(e, this.secret);
        this.post(t, a, n, this.HEADER_TYPE_JSON);
    }
    static getInfo(e, n) {
    }
    static get(url, callback) {
        const n = new XMLHttpRequest();
        n.timeout = 30000;
        n.onload = () => {
            if (n.status >= 200 || n.status < 400) {
                const t = n.responseText;
                callback.success(t);
            }
        };
        n.ontimeout = () => {
            callback.fail(n.status);
        };
        n.onerror = (t) => {
            callback.fail(n.status);
        };
        n.open("GET", url, true);
        n.send();
    }
    static gameRequest(e, n, a, o) {
    }
    static getFormStr(t, e, n = true, a = true) {
        const o = Object.keys(t).sort();
        let i = "";
        for (const r in o) {
            if ("object" == typeof t[o[r]])
                i += o[r] + "=" + JSON.stringify(t[o[r]]) + "&";
            else if ("string" == typeof t[o[r]] && a)
                i += o[r] + "=" + encodeURIComponent(t[o[r]]) + "&";
            else
                i += o[r] + "=" + t[o[r]] + "&";
        }
        i = i.substr(0, i.length - 1);
        if (!t.sign && n)
            i += "&sign=" + this.getMd5(i, e);
        return i;
    }
    static getJsonStr(e, n, a = true) {
        if (!e.sign) {
            if (a) {
                const o = HttpClient.getFormStr(e, n, false, false);
                e.sign = this.getMd5(o, n);
            }
        }
        const i = {};
        const r = Object.keys(e);
        for (const s in r) {
            if ("object" == typeof e[r[s]])
                i[r[s]] = JSON.stringify(e[r[s]]);
            else
                i[r[s]] = e[r[s]];
        }
        return JSON.stringify(i);
    }
    static postObj(t, e, n, a = true) {
        const o = this.getFormStr(e, this.secret);
        this.post(t, o, {
            success: (t) => {
                if (n.success) {
                    const e = JSON.parse(t);
                    if (a && 200 != e.code) {
                        if (n.fail)
                            n.fail(e.code);
                    }
                    else {
                        n.success(t);
                    }
                }
            },
            fail: (t) => {
                n.fail(t);
            }
        }, this.HEADER_TYPE_FORM);
    }
    static put(url, body, callback, contentType) {
        const o = new XMLHttpRequest();
        o.onreadystatechange = () => {
            if (4 == o.readyState && o.status >= 200 && o.status < 400) {
                const t = o.responseText;
                if (callback.success) {
                    console.info(t + "[" + typeof t + " ]");
                    callback.success(t);
                }
            }
        };
        if (callback.fail) {
            o.ontimeout = () => { callback.fail("timeout"); };
            o.onerror = () => { callback.fail("error"); };
        }
        o.open("PUT", url, true);
        if (contentType)
            o.setRequestHeader("Content-Type", contentType);
        else
            o.setRequestHeader("Content-Type", this.HEADER_TYPE_JSON);
        console.log("put里的body,", body, contentType);
        o.send(body);
    }
    static saveData(t) {
    }
    static getMd5(t, e) {
        t = decodeURIComponent(t);
        const n = t + e;
        return MD5_1.default.hex_md5(n);
    }
    static post(url, body, callback, contentType) {
        const o = new XMLHttpRequest();
        o.timeout = 30000;
        o.onload = () => {
            if (200 == o.status || 304 == o.status) {
                const t = o.responseText;
                if (callback.success)
                    callback.success(t);
            }
        };
        if (callback.fail) {
            o.ontimeout = () => { callback.fail("timeout"); };
            o.onerror = () => { callback.fail("error"); };
        }
        o.open("POST", this.gameUrl + url, true);
        if (contentType != null)
            o.setRequestHeader("content-type", contentType);
        else
            o.setRequestHeader("Content-Type", this.HEADER_TYPE_JSON);
        o.send(JSON.stringify(body));
    }
    static async async_post(url, body, contentType) {
        return new Promise((resolve, reject) => {
            HttpClient.post(url, body, { success: resolve, fail: resolve }, contentType);
        });
    }
}
exports.default = HttpClient;
HttpClient.init();
