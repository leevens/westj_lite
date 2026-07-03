"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameManager {
    static observers = [];
    curpannel;
    static sendMessage(msg) {
        for (let i = 0, n = this.observers.length; i < n; i++) {
            if (this.observers[i].notify(msg)) {
                break;
            }
        }
    }
    static sendSimpleMessage(type) {
        this.sendMessage({ type: type });
    }
    static registObserver(observer) {
        this.observers.push(observer);
    }
}
exports.default = GameManager;
