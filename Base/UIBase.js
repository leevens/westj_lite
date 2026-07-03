"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let UIBase = class UIBase extends cc.Component {
    mask = null;
    foreMask = null;
    openAnimHandler = null;
    closeAnimHandler = null;
    isScaleAnim = false;
    isAnim = false;
    animRoot = null;
    isdestoy = false;
    CloseWithScaleAnim() {
        if (this.foreMask)
            this.foreMask.active = true;
        this.animRoot.stopAllActions();
        cc.tween(this.animRoot)
            .to(0.3, { scale: 0 }, { easing: "backIn" })
            .call(() => {
            this.closeAnimHandler && this.closeAnimHandler();
            this.Destroy();
        })
            .start();
    }
    OpenWithScaleAnim() {
        this.animRoot.scale = 0;
        cc.tween(this.animRoot)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .call(() => {
            this.openAnimHandler && this.openAnimHandler();
        })
            .start();
    }
    onEnable() {
        this.isAnim = false;
        if (this.isScaleAnim && this.animRoot) {
            this.OpenWithScaleAnim();
        }
    }
    Destroy() {
        if (this.isdestoy)
            this.node.destroy();
        else
            this.node.active = false;
    }
    CloseThis() {
        if (this.isAnim)
            return;
        if (this.isScaleAnim && this.animRoot) {
            this.isAnim = true;
            this.CloseWithScaleAnim();
        }
        else {
            this.Destroy();
        }
    }
};
__decorate([
    property({ type: cc.Node, displayName: "底层遮罩" })
], UIBase.prototype, "mask", void 0);
__decorate([
    property({ type: cc.Node, displayName: "最上层遮罩" })
], UIBase.prototype, "foreMask", void 0);
__decorate([
    property({ displayName: "是否是大小变化动画" })
], UIBase.prototype, "isScaleAnim", void 0);
__decorate([
    property({ type: cc.Node, displayName: "动画节点" })
], UIBase.prototype, "animRoot", void 0);
__decorate([
    property({ displayName: "是否销毁" })
], UIBase.prototype, "isdestoy", void 0);
UIBase = __decorate([
    ccclass
], UIBase);
exports.default = UIBase;
