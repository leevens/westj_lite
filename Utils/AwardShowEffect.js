"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let AwardShowEffect = class AwardShowEffect extends cc.Component {
    startpos = new cc.Vec2();
    onEnable() {
        this.node.scale = 0;
        this.node.stopAllActions();
        if (!(this.startpos.x == 0 && this.startpos.y == 0)) {
            this.node.setPosition(this.startpos);
        }
        cc.tween(this.node)
            .call(() => {
            this.node.scale = 0;
            this.node.opacity = 0;
        })
            .to(0.3, { scale: 1.5, opacity: 255 })
            .by(0.3, { y: -100, scale: -0.5 }, { easing: "backOut" })
            .start();
    }
    start() {
    }
};
__decorate([
    property({ displayName: "原始坐标" })
], AwardShowEffect.prototype, "startpos", void 0);
AwardShowEffect = __decorate([
    ccclass
], AwardShowEffect);
exports.default = AwardShowEffect;
