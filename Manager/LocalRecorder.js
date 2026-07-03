"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LocalRecorder {
    readData(t) {
        const e = cc.sys.localStorage.getItem(t);
        return e;
    }
    writeData(t, e) {
        if (typeof e === "number" && e > 100000000) {
            let num = BigInt(e);
            cc.sys.localStorage.setItem(t, num);
            return;
        }
        cc.sys.localStorage.setItem(t, JSON.stringify(e));
    }
    hexCharCodeToStr(t) {
        const n = t.trim();
        const a = "0x" === n.substr(0, 2).toLowerCase() ? n.substr(2) : n;
        const o = a.length;
        if (o % 2 != 0)
            return "";
        const i = [];
        for (let r = 0; r < o; r += 2) {
            const e = parseInt(a.substr(r, 2), 16);
            i.push(String.fromCharCode(e));
        }
        return i.join("");
    }
    strToHexCharCode(t) {
        if ("" === t)
            return "";
        const e = [];
        e.push("0x");
        for (let n = 0; n < t.length; n++)
            e.push(t.charCodeAt(n).toString(16));
        return e.join("");
    }
    writeDatas(t) {
        for (const e in t) {
            const n = t[e];
            this.writeData(e, n);
        }
    }
}
exports.default = LocalRecorder;
