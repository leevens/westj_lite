"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monster_1 = require("Monster");
const AIState_1 = require("AIState");
class AIMonsterIdle extends AIState_1.default {
    __ownerMonster;
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.__ownerMonster = aiBase.getComponent(Monster_1.default);
    }
    Update() { }
    GotoState() {
        super.GotoState();
        const self = this;
        cc.tween(this.__ownerMonster.node).by(0.3, { x: -400 }).call(function () {
            self.__ownerMonster.StartFight();
            self.__ownerMonster.SwitchState(Monster_1.default.STATE_MOVE);
        }).start();
    }
    LeaveState() {
        super.LeaveState();
    }
}
exports.default = AIMonsterIdle;
