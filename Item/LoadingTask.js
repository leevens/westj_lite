"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameTools_1 = require("GameTools");
class LoadingTask {
    curLoadDirs = "";
    totalCount = 1;
    completeCount = 0;
    curLoadManager;
    LoadFinish() {
        this.curLoadManager.LoadFinishOne();
    }
    StartLoadSignleRes(path, type) {
        this.curLoadDirs = path;
        GameTools_1.default.bundle.load(path, type, () => {
            this.LoadFinish();
        });
    }
    constructor(loadManager) {
        this.curLoadManager = loadManager;
    }
    StartLoadDir(dir, type) {
        this.curLoadDirs = dir;
        GameTools_1.default.bundle.loadDir(dir, type, (completed, total) => {
            this.completeCount = completed;
            this.totalCount = total;
        }, () => {
            this.LoadFinish();
        });
    }
}
exports.default = LoadingTask;
