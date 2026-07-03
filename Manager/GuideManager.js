"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameManager_1 = require("GameManager");
class GuideManager {
    static instance = null;
    notify(msg) {
        console.log(msg);
        return false;
    }
    static getInstance() {
        if (!GuideManager.instance) {
            GuideManager.instance = new GuideManager();
            GameManager_1.default.registObserver(GuideManager.instance);
        }
        return GuideManager.instance;
    }
}
exports.default = GuideManager;
