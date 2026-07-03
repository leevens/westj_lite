"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AIState {
    __baseState;
    __id;
    constructor(aiBase, id) {
        this.__baseState = aiBase;
        this.__id = id;
    }
    GotoState(...args) {
    }
    Update(dt) {
    }
    LeaveState() {
        this.__baseState.node.stopAllActions();
    }
}
exports.default = AIState;
