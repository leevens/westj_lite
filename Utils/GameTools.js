"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GameTools_1;
Object.defineProperty(exports, "__esModule", { value: true });
const SdkManager_1 = require("SdkManager");
const WxManager_1 = require("WxManager");
const { ccclass } = cc._decorator;
let GameTools = class GameTools {
    static { GameTools_1 = this; }
    static normalUnits = [".", "-", "+", "", "K", "M", "B", "T", "P", "E", "Z", "Y"];
    static artNumberUnits = [".", "/", ":", "", "<", "=", ">"];
    static units = [
        "", "K", "M", "B", "T", "P", "E", "Z", "Y", "S", "L", "X", "D",
        "KK", "KM", "KB", "KT", "KP", "KE", "KZ", "KY", "KS", "KL", "KX",
        "MM", "MB", "MT", "MP", "ME", "MZ", "MY", "MS", "ML", "MX", "MD",
    ];
    static sceneBundle = null;
    static ResBundle1 = null;
    static Jsonbundle = null;
    static ResBundle2 = null;
    static bundle = null;
    static sdkInstance = null;
    static getHowPoint(val, scale) {
        return Math.floor(val * scale) / scale;
    }
    static refSetCoin(val) {
        if (val == null) {
            return "???";
        }
        if (typeof val != "string") {
            val = Number(val);
        }
        if (val < 1000) {
            return Math.floor(val) == val ? val.toFixed(0) + "" : val.toFixed(2) + "";
        }
        let out = "???";
        const n = this.units.length;
        let base = 1;
        for (let i = 0; i < n; i++) {
            const upper = 1000 * base;
            if (val < upper) {
                out = (Math.floor(val / base * 10) / 10) + this.units[i];
                break;
            }
            base = upper;
        }
        return out;
    }
    static ConvertTargetPointToCoor(point, from, to) {
        let out = cc.Vec2.ZERO;
        try {
            const world = from.convertToWorldSpaceAR(point);
            out = to.convertToNodeSpaceAR(world);
        }
        catch (e) { }
        return out;
    }
    static ConvertNumberToAscii(val, units, withPlus) {
        if (units === undefined)
            units = this.normalUnits;
        if (withPlus === undefined)
            withPlus = true;
        val = parseInt(val.toString());
        let out = val.toString();
        if (val < 0) {
            out = out.replace("-", "");
            out = units[1] + out;
        }
        else if (withPlus) {
            out = out.replace("+", "");
            out = units[2] + out;
        }
        return out;
    }
    static loadAudioClip(bundleName, path) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, cc.AudioClip, (err, asset) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }
    static GetMinAngleValue(a, b) {
        a %= 360;
        b %= 360;
        let chosen = b;
        let minAbs = Math.abs(a - b);
        const b1 = b + 360;
        const d1 = Math.abs(a - b1);
        if (d1 < minAbs) {
            minAbs = d1;
            chosen = b1;
        }
        const b2 = b - 360;
        const d2 = Math.abs(a - b2);
        if (d2 < minAbs) {
            minAbs = d2;
            chosen = b2;
        }
        return [a, chosen];
    }
    static loadJson(bundleName, path) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, cc.JsonAsset, (err, asset) => {
                if (err) {
                    console.error(err);
                    resolve({});
                    return;
                }
                if (asset instanceof cc.JsonAsset)
                    resolve(this.parseCompressedJson(asset.json));
            });
        });
    }
    static GetTwoArray(rows, cols, fill) {
        const out = [];
        for (let i = 0; i < rows; i++)
            out.push(this.GetOneArray(cols, fill));
        return out;
    }
    static randomMinToMax(min, max) {
        const r = Math.random();
        return parseInt((100 * (r * (max - min) + min)) + "") / 100;
    }
    static GetUpDirLocalVect(target, ref = null) {
        if (ref == null)
            ref = target.parent;
        const up = target.up;
        const v = cc.v2(up.x, up.y);
        return ref.convertToNodeSpaceAR(v);
    }
    static parseCompressedJson(raw) {
        if (!Array.isArray(raw) || raw.length === 0)
            return raw;
        if (!Array.isArray(raw[0]))
            return raw;
        const keys = raw[0];
        const result = [];
        for (let i = 1; i < raw.length; i++) {
            const obj = {};
            const row = raw[i];
            for (let j = 0; j < keys.length; j++) {
                obj[keys[j]] = row[j];
            }
            result.push(obj);
        }
        return result;
    }
    static ConvertTargetToCurLocal(target, cur) {
        let out = cc.Vec2.ZERO;
        try {
            const pos = target.getPosition();
            const world = target.parent.convertToWorldSpaceAR(pos);
            out = cur.convertToNodeSpaceAR(world);
        }
        catch (e) { }
        return out;
    }
    static get0Time() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    }
    static LoadFont(bundleName, path) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, cc.Font, (err, asset) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }
    static LoadSpinData(bundleName, path) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, sp.SkeletonData, (err, asset) => {
                if (err) {
                    console.log(err);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }
    static GetNumFromArray(arr, item) {
        if (arr === undefined)
            arr = [];
        let count = 0;
        const n = arr.length;
        for (let i = 0; i < n; i++)
            if (arr[i] == item)
                count += 1;
        return count;
    }
    static getSdk() {
        if (this.sdkInstance == null) {
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                this.sdkInstance = new WxManager_1.default();
            }
            else {
                this.sdkInstance = new SdkManager_1.default();
            }
        }
        return this.sdkInstance;
    }
    static GetOneArray(len, fill) {
        const out = [];
        for (let i = 0; i < len; i++)
            out.push(fill);
        return out;
    }
    static hour_min_secTimeFuncion(sec) {
        let out = "";
        if (sec > -1) {
            const h = Math.floor(sec / 3600);
            const m = Math.floor(sec / 60 - 60 * h);
            const s = Math.floor(sec - 3600 * h - 60 * m);
            let hh = h.toString();
            let mm = m.toString();
            let ss = s.toString();
            if (h < 10)
                hh = "0" + h.toString();
            if (m < 10)
                mm = "0" + m.toString();
            if (s < 10)
                ss = "0" + s.toString();
            out = hh + ":" + mm + ":" + ss;
        }
        return out;
    }
    static IsPosInCanvas(node) {
        const canvas = cc.find("Canvas");
        if (canvas) {
            const local = this.ConvertTargetToCurLocal(node, canvas);
            const hw = canvas.width / 2;
            const hh = canvas.height / 2;
            return local.x >= -hw && local.x <= hw && local.y >= -hh && local.y <= hh;
        }
        console.log("没有找到canvas!!!!");
        return false;
    }
    static nowToZero() {
        const now = new Date();
        const hh = now.getHours();
        const mm = now.getMinutes();
        const ss = now.getSeconds();
        const remain = 86400 - (3600 * hh + 60 * mm + ss);
        console.log("now:", hh, mm, ss, remain);
        return remain;
    }
    static GameResume() { cc.director.resume(); }
    static getBundle(name) {
        let b = null;
        switch (name) {
            case "JsonBundle":
                b = GameTools_1.Jsonbundle;
                break;
            case "Bundle":
                b = GameTools_1.bundle;
                break;
            case "ResBundle1":
                b = GameTools_1.ResBundle1;
                break;
            case "ResBundle2":
                b = GameTools_1.ResBundle2;
                break;
        }
        return b;
    }
    static RemoveFromArray(arr, item) {
        if (arr === undefined)
            arr = [];
        const idx = arr.indexOf(item);
        if (idx > -1)
            arr.splice(idx, 1);
    }
    static GetRes(bundleName, path, type) {
        const b = this.getBundle(bundleName);
        const res = b && b.get(path, type);
        if (!res) {
            return res;
        }
        return res;
    }
    static Screen2CoordPos(screen, target, camera) {
        let out = cc.Vec2.ZERO;
        try {
            const world = camera.getScreenToWorldPoint(screen);
            const p = target.convertToNodeSpaceAR(world);
            out = new cc.Vec2(p.x, p.y);
        }
        catch (e) { }
        return out;
    }
    static isWxGame() {
        return cc.sys.platform == cc.sys.WECHAT_GAME;
    }
    static loadPrefab(bundleName, path) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, cc.Prefab, (err, asset) => {
                if (err) {
                    console.log(err);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }
    static cocosToWX(node) {
        const fw = cc.view.getFrameSize().width;
        const fh = cc.view.getFrameSize().height;
        const vw = cc.winSize.width;
        const vh = cc.winSize.height;
        const w = node.width;
        const h = node.height;
        const lt = node.convertToWorldSpace(cc.v2(0, h));
        return cc.rect((fw / vw) * lt.x, (1 - lt.y / vh) * fh, (fw / vw) * w, (fh / vh) * h);
    }
    static ConvertTargetCameraToCur(target, camera, cur, cur2) {
        const world = target.parent.convertToWorldSpaceAR(target.getPosition());
        const screen = camera.getWorldToScreenPoint(world);
        return this.Screen2CoordPos(new cc.Vec2(screen.x, screen.y), cur, cur2);
    }
    static sec_to_timefunction(sec) {
        let out = "";
        if (sec > -1) {
            const m = Math.floor(sec / 60);
            const s = Math.floor(sec - 60 * m);
            out = (m >= 10 ? "" + m : "0" + m) + ":" + (s >= 10 ? "" + s : "0" + s);
        }
        return out;
    }
    static IsGamePause() { return cc.director.isPaused(); }
    static ConvertNumberToUit(val, units) {
        if (units === undefined)
            units = this.normalUnits;
        const negative = val < 0;
        let out = "????";
        val = Math.abs(val);
        if (val < 1000)
            return negative ? units[1] + val.toFixed(0) + "" : val.toFixed(0) + "";
        const n = units.length;
        let base = 1;
        for (let i = 3; i < n; i++) {
            const upper = 1000 * base;
            if (val < upper) {
                out = (Math.floor(val / base * 10) / 10) + units[i];
                break;
            }
            base = upper;
        }
        out.replace(".", units[0]);
        if (negative)
            out = units[1] + out;
        return out;
    }
    static GetCloseInRectByPos(p, r) {
        const dTop = Math.abs(r.yMax - p.y);
        const dBottom = Math.abs(r.yMin - p.y);
        const dLeft = Math.abs(r.xMin - p.x);
        const dRight = Math.abs(r.xMax - p.x);
        let min = dTop;
        if (min > dBottom)
            min = dBottom;
        if (min > dLeft)
            min = dLeft;
        if (min > dRight)
            min = dRight;
        if (min == dTop)
            return new cc.Vec2(p.x, r.yMax);
        if (min == dBottom)
            return new cc.Vec2(p.x, r.yMin);
        if (min == dLeft)
            return new cc.Vec2(r.xMin, p.y);
        return new cc.Vec2(r.xMax, p.y);
    }
    static GetComponentInParent(node, compType) {
        const parent = node.parent;
        if (!parent)
            return null;
        const comp = parent.getComponent(compType);
        if (comp)
            return comp;
        try {
            return this.GetComponentInParent(parent, compType);
        }
        catch (e) {
            return null;
        }
    }
    static GamePause() { cc.director.pause(); }
    static loadImage(bundleName, path) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, cc.SpriteFrame, (err, asset) => {
                if (err) {
                    console.log(err);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }
    static async GetResJson(bundleName, path) {
        const b = this.getBundle(bundleName);
        const res = b && b.get(path);
        if (!res) {
            return await GameTools_1.loadJson(bundleName, path);
        }
        return GameTools_1.parseCompressedJson(res.json);
    }
    static LoadAny(bundleName, path, type) {
        return new Promise((resolve) => {
            this.getBundle(bundleName).load(path, type, (err, asset) => {
                if (err) {
                    console.log(err);
                    resolve(null);
                    return;
                }
                resolve(asset);
            });
        });
    }
};
GameTools = GameTools_1 = __decorate([
    ccclass
], GameTools);
exports.default = GameTools;
