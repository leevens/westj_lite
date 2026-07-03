"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameSystem_1 = require("GameSystem");
const ServerRecorder_1 = require("ServerRecorder");
class SaveManager {
    static recordVersion = 1;
    static readRecrder = null;
    static readObject(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static writeToAnotherRecorder(t, e) {
    }
    static readBool(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static flush() {
    }
    static writeData(t, e) {
        if (!this.readRecrder) {
            console.log("未初始化存档管理器", t, e);
            return;
        }
        this.readRecrder.writeData(t, e);
    }
    static writeDatas(t) {
        if (!this.readRecrder) {
            console.log("未初始化存档管理器", t);
            return;
        }
        this.readRecrder.writeDatas(t);
    }
    static readDisciple(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static readpack(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
        return n;
    }
    static readobjArray(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
        return n;
    }
    static readString(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static readArray(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static readInt(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static readintArray(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static addData(t, e) {
        if (!this.readRecrder) {
            console.log("未初始化存档管理器", t, e);
            return;
        }
        this.readRecrder.addData(t, e);
    }
    static readEveryDay(t, e) {
        const n = this.readRecrder.readData(t);
        if (n === undefined)
            return e;
        return n;
    }
    static init(data = null) {
        if (!data) {
            console.log("！！！！！！！！！！！本地存档数据:");
        }
        else {
            this.readRecrder = new ServerRecorder_1.default(data);
        }
        GameSystem_1.default.LoadGameDate();
    }
}
exports.default = SaveManager;
