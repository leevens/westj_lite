"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BulletEffect_1 = require("BulletEffect");
const Monster_1 = require("Monster");
const GameSystem_1 = require("GameSystem");
const AIState_1 = require("AIState");
const EventConst_1 = require("EventConst");
class AIMonsterDefault extends AIState_1.default {
    __ownerMonster;
    isover = false;
    time = 0;
    state = 0;
    DoAttackXXWX() {
        if (this.__ownerMonster.target) {
            let atk = 0;
            if (this.__ownerMonster.AtkAddition > 1) {
                atk = this.__ownerMonster.GetBaseAtkValue() * this.__ownerMonster.AtkAddition;
                this.__ownerMonster.AtkAddition = 1;
            }
            else {
                atk = this.__ownerMonster.GetBaseAtkValue();
            }
            let crit = false;
            if ((0, EventConst_1.RandGet100)() < this.__ownerMonster.role.crit) {
                atk *= 2;
                crit = true;
            }
            if (this.__ownerMonster.Suck > 0) {
                this.__ownerMonster.Cure(atk * this.__ownerMonster.Suck);
                this.__ownerMonster.Suck = 0;
            }
            const killed = this.__ownerMonster.target.doAttack(atk, this.__ownerMonster.role.hit, crit, this.__ownerMonster.role.AttackType == EventConst_1.ATKTYPE.MELEE);
            if (this.__ownerMonster.target.discipId - 2 == 0) {
                this.__ownerMonster.target.Counter(this.__ownerMonster);
            }
            if (killed) {
                this.isover = true;
            }
            else if (this.__ownerMonster.role.hp > 0) {
                this.initialAttack();
            }
            else {
                this.__ownerMonster.SwitchState(Monster_1.default.STATE_DIE);
            }
        }
    }
    LeaveState() {
        super.LeaveState();
    }
    Update(dt) {
        super.Update(dt);
        if (this.time < this.__ownerMonster.role.AttackSpeed && 0 == this.state) {
            this.time += dt * GameSystem_1.default.speed;
        }
        if (this.time >= this.__ownerMonster.role.AttackSpeed && 0 == this.state) {
            this.DoAttack();
        }
    }
    initialAttack() {
        this.state = 0;
        const curPos = this.__ownerMonster.node.getPosition();
        const worldPos = this.__ownerMonster.target.node.parent.convertToWorldSpaceAR(this.__ownerMonster.target.node.getPosition());
        const localPos = this.__ownerMonster.node.parent.convertToNodeSpaceAR(worldPos);
        if (curPos.sub(localPos).mag() > this.__ownerMonster.role.range) {
            this.__ownerMonster.SwitchStateToMove();
        }
    }
    GotoState() {
        super.GotoState();
        this.state = 0;
        this.isover = false;
    }
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.isover = false;
        this.__ownerMonster = aiBase.getComponent(Monster_1.default);
    }
    DoAttack() {
        const self = this;
        if (this.__ownerMonster.target.isDie() && this.__baseState.__state_id != Monster_1.default.STATE_SKILL) {
            this.__ownerMonster.SwitchStateToMove();
            this.state = 0;
            this.time = 0;
            return;
        }
        this.state = 1;
        if (this.__ownerMonster.role.AttackType == EventConst_1.ATKTYPE.MELEE) {
            const dur = 0.1 / GameSystem_1.default.speed;
            const diff = this.__ownerMonster.node.position.sub(this.__ownerMonster.target.node.position);
            cc.tween(this.__ownerMonster.Content)
                .call(function () {
                if (2 != self.__id)
                    self.__ownerMonster.node.stopAllActions();
            })
                .by(dur, { position: cc.v3(-diff.x / 5, -diff.y / 5, 0) })
                .call(function () {
                if (2 == self.__id) {
                    self.time = 0;
                    self.DoAttackXXWX();
                }
                else {
                    self.__ownerMonster.node.stopAllActions();
                }
            })
                .by(dur, { position: cc.v3(diff.x / 5, diff.y / 5, 0) })
                .call(function () {
                if (self.isover) {
                    if (self.__ownerMonster.role.hp > 0) {
                        self.__ownerMonster.SwitchStateToMove();
                    }
                    else {
                        self.__ownerMonster.SwitchState(Monster_1.default.STATE_DIE);
                    }
                    self.state = 0;
                    self.time = 0;
                }
            })
                .start();
        }
        else {
            const dur = 0.1 / GameSystem_1.default.speed;
            const diff = this.__ownerMonster.node.position.sub(this.__ownerMonster.target.node.position);
            cc.tween(this.__ownerMonster.Content)
                .call(function () {
                if (2 != self.__id)
                    self.__ownerMonster.node.stopAllActions();
            })
                .by(dur, { position: cc.v3(-diff.x / 8, -diff.y / 8, 0) })
                .call(function () {
                if (2 == self.__id) {
                    self.time = 0;
                    const bulletNode = self.__ownerMonster.curpannel.Createbuttet();
                    const worldPos = self.__ownerMonster.node.convertToWorldSpaceAR(self.__ownerMonster.Content.getPosition());
                    const localPos = self.__ownerMonster.node.parent.convertToNodeSpaceAR(worldPos);
                    bulletNode.setPosition(localPos);
                    bulletNode.getComponent(BulletEffect_1.default).init(0, 2, self.__ownerMonster, self.__ownerMonster.target, function () {
                        self.DoAttackXXWX();
                        if (self.isover) {
                            if (self.__ownerMonster.role.hp > 0) {
                                self.__ownerMonster.SwitchStateToMove();
                            }
                            else {
                                self.__ownerMonster.SwitchState(Monster_1.default.STATE_DIE);
                            }
                            self.state = 0;
                            self.time = 0;
                        }
                    });
                }
                else {
                    self.__ownerMonster.node.stopAllActions();
                }
            })
                .by(dur, { position: cc.v3(diff.x / 8, diff.y / 8, 0) })
                .call(function () {
                if (self.isover) {
                    if (self.__ownerMonster.role.hp > 0) {
                        self.__ownerMonster.SwitchStateToMove();
                    }
                    else {
                        self.__ownerMonster.SwitchState(Monster_1.default.STATE_DIE);
                    }
                    self.state = 0;
                    self.time = 0;
                }
            })
                .start();
        }
    }
}
exports.default = AIMonsterDefault;
