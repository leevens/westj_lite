"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monster_1 = require("Monster");
const AIState_1 = require("AIState");
class AIMonsterDie extends AIState_1.default {
    __ownerMonster;
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.__ownerMonster = aiBase.getComponent(Monster_1.default);
    }
    GotoState() {
        super.GotoState();
        this.__ownerMonster.Content.stopAllActions();
        this.__ownerMonster.Content.setPosition(cc.v2(0, 0));
        this.__ownerMonster.node.active = false;
    }
    LeaveState() {
        super.LeaveState();
    }
    start() { }
}
exports.default = AIMonsterDie;
