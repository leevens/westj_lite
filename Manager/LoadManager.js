"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoadingTask_1 = require("LoadingTask");
class LoadManager {
    curLoadItems = [];
    curFinishNum = 0;
    finishHandler = null;
    nextProgressValue = 0;
    constructor(dirs, singles, finish = null) {
        this.finishHandler = finish;
        for (const k in dirs) {
            const item = new LoadingTask_1.default(this);
            item.StartLoadDir(k, dirs[k]);
            this.curLoadItems.push(item);
        }
        for (const k in singles) {
            const item = new LoadingTask_1.default(this);
            item.StartLoadSignleRes(k, dirs[k]);
            this.curLoadItems.push(item);
        }
        if (this.curLoadItems.length <= 0 && this.finishHandler) {
            this.finishHandler();
        }
    }
    GetLoadPercent() {
        const total = this.curLoadItems.length;
        let all = 0;
        let done = 0;
        for (let i = 0; i < total; i++) {
            const it = this.curLoadItems[i];
            all += it.totalCount;
            done += it.completeCount;
        }
        let ratio = done / all;
        ratio *= 100;
        return Math.floor(ratio);
    }
    UpdateCurProgressValue() {
        const total = this.curLoadItems.length;
        if (this.curFinishNum >= total - 1) {
            this.nextProgressValue = 100;
        }
        else {
            this.nextProgressValue = ((this.curFinishNum + 1) / total) * 100;
        }
    }
    LoadFinishOne() {
        this.curFinishNum += 1;
        this.UpdateCurProgressValue();
        if (this.curFinishNum >= this.curLoadItems.length) {
            this.finishHandler && this.finishHandler();
        }
    }
}
exports.default = LoadManager;
