"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameSystem_1 = require("GameSystem");
const { ccclass, property } = cc._decorator;
let SkillUI = class SkillUI extends cc.Component {
    Sp = null;
    init(t) {
        var e = this;
        this.node.opacity = 255;
        var n = "skill" + t;
        this.Sp.setAnimation(0, n, false);
        this.Sp.setCompleteListener(function () {
            GameSystem_1.default.SkillSp.restor(e.node);
        });
        cc.tween(this.node).delay(1.5).to(.5, { opacity: 255 }).start();
    }
    start() {
    }
};
__decorate([
    property(sp.Skeleton)
], SkillUI.prototype, "Sp", void 0);
SkillUI = __decorate([
    ccclass
], SkillUI);
exports.default = SkillUI;
