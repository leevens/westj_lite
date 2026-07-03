"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monster_1 = require("Monster");
const GameSystem_1 = require("GameSystem");
const AIState_1 = require("AIState");
class AIMonsterMove extends AIState_1.default {
    __ownerMonster;
    LeaveState() {
        super.LeaveState();
    }
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.__ownerMonster = aiBase.getComponent(Monster_1.default);
    }
    GotoState() {
        super.GotoState();
        this.__ownerMonster.target = null;
        this.GetTarget();
    }
    Update(dt) {
        super.Update(dt);
        if (this.__ownerMonster.target) {
            if (this.__ownerMonster.target.isDie()) {
                this.GetTarget();
            }
            else {
                const curPos = this.__ownerMonster.node.getPosition();
                const worldTarget = this.__ownerMonster.target.node.parent.convertToWorldSpaceAR(this.__ownerMonster.target.node.getPosition());
                const localTarget = this.__ownerMonster.node.parent.convertToNodeSpaceAR(worldTarget);
                const dist = curPos.sub(localTarget).mag();
                const radians = cc.v2(curPos.sub(localTarget)).signAngle(cc.v2(1, 0));
                const degrees = radians / Math.PI * 180;
                this.__ownerMonster.cursor.angle = -degrees;
                const dir = cc.v2(-Math.cos(radians), Math.sin(radians));
                dir.normalizeSelf();
                if (dist <= this.__ownerMonster.role.range) {
                    this.ToFight();
                }
                else {
                    this.__ownerMonster.node.x += dt * dir.x * GameSystem_1.default.speed * this.__ownerMonster.moveSpeed;
                    this.__ownerMonster.node.y += dt * dir.y * GameSystem_1.default.speed * this.__ownerMonster.moveSpeed;
                }
            }
        }
        else {
            this.GetTarget();
        }
    }
    ToFight() {
        if (this.__baseState.__state_id != Monster_1.default.STATE_DIE
            && this.__baseState.__state_id != Monster_1.default.STATE_IDLE) {
            this.__baseState.SwitchState(Monster_1.default.STATE_ATTACK);
        }
    }
    GetTarget() {
        this.__ownerMonster.GetTeamer();
    }
}
exports.default = AIMonsterMove;
