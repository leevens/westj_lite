"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameTools_1 = require("GameTools");
const { ccclass } = cc._decorator;
let CustomTouchArea = class CustomTouchArea extends cc.Component {
    updateArea() {
        var t = this.node.getComponent(cc.Widget);
        if (t) {
            t.updateAlignment();
            var e = this.node.position, n = this.node.getAnchorPoint();
            t.isAlignTop = t.isAlignBottom = t.isAlignLeft = t.isAlignRight = true;
            var a = cc.winSize.width, o = cc.winSize.height, i = GameTools_1.default.getSdk().getMenuButtonBottom(), s = cc.rect(0, 0, a, o - i);
            t.top = o - s.y - s.height,
                t.bottom = s.y,
                t.left = s.x,
                t.right = a - s.x - s.width,
                t.updateAlignment();
            var l = this.node.position, c = n.x - (l.x - e.x) / this.node.width, u = n.y - (l.y - e.y) / this.node.height;
            this.node.setAnchorPoint(c, u);
        }
    }
    onDisable() {
        cc.view.off("canvas-resize", this.updateArea, this);
    }
    onEnable() {
        this.updateArea(),
            cc.view.on("canvas-resize", this.updateArea, this);
    }
};
CustomTouchArea = __decorate([
    ccclass
], CustomTouchArea);
exports.default = CustomTouchArea;
