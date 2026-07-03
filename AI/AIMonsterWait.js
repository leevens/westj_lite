"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monster_1 = require("Monster");
const AIState_1 = require("AIState");
class AIMonsterWait extends AIState_1.default {
    __ownerMonster;
    LeaveState() {
        super.LeaveState();
    }
    GotoState() {
        super.GotoState();
    }
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.__ownerMonster = aiBase.getComponent(Monster_1.default);
    }
    start() { }
}
exports.default = AIMonsterWait;
