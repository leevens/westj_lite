"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Monster_1 = require("Monster");
const GameSystem_1 = require("GameSystem");
const AIState_1 = require("AIState");
class AIMonsterSkill extends AIState_1.default {
    maxtime = 0;
    time = 0;
    __ownerMonster;
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.__ownerMonster = aiBase.getComponent(Monster_1.default);
    }
    GotoState() {
        super.GotoState();
        this.time = 1 == this.__ownerMonster.skilltype ? this.__ownerMonster.skill.release : this.__ownerMonster.fatality.release;
        this.maxtime = this.time;
        this.__ownerMonster.do.active = true;
        this.__ownerMonster.dopro.fillRange = 0;
        if (1 == this.__ownerMonster.skilltype) {
            this.__ownerMonster.doSkillSp.node.active = true;
            this.__ownerMonster.doSkillSp.setAnimation(0, "eff_loading", true);
        }
    }
    Update(dt) {
        super.Update(dt);
        const self = this;
        if (this.time > 0) {
            this.time -= dt * GameSystem_1.default.speed;
            this.__ownerMonster.dopro.fillRange = this.maxtime - this.time / this.maxtime;
            if (this.time <= 0) {
                if (1 == this.__ownerMonster.skilltype) {
                    this.__ownerMonster.doSkillSp.setAnimation(0, "eff_Sskill_eff", true);
                    this.__ownerMonster.doSkillSp.setCompleteListener(function () {
                        if ("eff_Sskill_eff" == self.__ownerMonster.doSkillSp.animation) {
                            self.__ownerMonster.doSkillSp.node.active = false;
                        }
                    });
                }
                this.__ownerMonster.doAtkSkill();
            }
        }
    }
    LeaveState() {
        super.LeaveState();
        if (1 == this.__ownerMonster.skilltype) {
            this.__ownerMonster.skillcd = 0;
        }
        else {
            this.__ownerMonster.fatalitycd = 0;
        }
        this.__ownerMonster.release = false;
        this.__ownerMonster.do.active = false;
    }
}
exports.default = AIMonsterSkill;
