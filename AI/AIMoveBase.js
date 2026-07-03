"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DiscipleControl_1 = require("DiscipleControl");
const AIState_1 = require("AIState");
class AIMoveBase extends AIState_1.default {
    pathPoses = new Array();
    nextMoveIndex = 0;
    curTween;
    curDisciple;
    GetMoveSpeed() {
        return 0;
    }
    LeaveState() {
        super.LeaveState();
        this.StopMove();
    }
    EndMove() { }
    constructor(aiBase, __id) {
        super(aiBase, __id);
        this.curDisciple = aiBase.getComponent(DiscipleControl_1.default);
    }
    MoveLogic() {
        if (this.nextMoveIndex >= this.pathPoses.length) {
            this.EndMove();
        }
        else {
            const target = this.pathPoses[this.nextMoveIndex];
            const cur = this.__baseState.node.getPosition();
            if (cur.x > target.x) {
                this.__baseState.node.getChildByName("Sp").scaleX = 1;
            }
            else if (cur.x < target.x) {
                this.__baseState.node.getChildByName("Sp").scaleX = -1;
            }
            const dur = cc.Vec2.distance(this.__baseState.node.getPosition(), target) / this.GetMoveSpeed();
            if (1 == this.curDisciple.speed) {
                if ("move" != this.curDisciple.Spine.animation) {
                    this.curDisciple.Spine.setAnimation(0, "move", true);
                }
            }
            else {
                if ("run" != this.curDisciple.Spine.animation) {
                    this.curDisciple.Spine.setAnimation(0, "run", true);
                }
            }
            const self = this;
            this.curTween = cc.tween(this.__baseState.node).to(dur, {
                position: cc.v3(target.x, target.y, 0)
            }).call(function () {
                self.MoveLogic();
            }).start();
            this.nextMoveIndex += 1;
        }
    }
    SetPath(path) {
        this.nextMoveIndex = 0;
        this.pathPoses = new Array();
        this.pathPoses = path;
    }
    GotoState() {
        super.GotoState();
    }
    StopMove() {
        if (this.curTween) {
            this.curTween.stop();
            if ("idle" != this.curDisciple.Spine.animation) {
                this.curDisciple.Spine.setAnimation(0, "idle", true);
            }
        }
    }
}
exports.default = AIMoveBase;
