"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TipText_1;
Object.defineProperty(exports, "__esModule", { value: true });
const GameSystem_1 = require("GameSystem");
const { ccclass, property } = cc._decorator;
let TipText = class TipText extends cc.Component {
    static { TipText_1 = this; }
    list = [];
    txt = null;
    tiptxt = null;
    static prev_node = null;
    setText(t, e) {
        this.txt.node.active = false,
            this.tiptxt.node.active = false,
            0 == t || 1 == t || 2 == t || 3 == t || 4 == t ?
                (this.node.width = 650, this.txt.node.active = true,
                    this.txt.spriteFrame = this.list[t]) :
                -1 == t
                    && (this.tiptxt.node.active = true,
                        this.tiptxt.string = e),
            this.Tween();
    }
    start() {
    }
    Tween() {
        var t = this;
        let start_offset = 100;
        let nodeheight = 40;
        if (TipText_1.prev_node && TipText_1.prev_node.y < start_offset + nodeheight) {
            start_offset = TipText_1.prev_node.y - nodeheight;
        }
        t.node.y = start_offset;
        cc.tween(this.node).call(function () {
            t.node.opacity = 0;
        }).by(2, {
            y: 300
        }).call(function () {
            t.restore();
        }).start();
        cc.tween(this.node).to(.3, {
            opacity: 255
        }).start(),
            cc.tween(this.node).delay(1.7).to(.3, {
                opacity: 0
            }).start();
        TipText_1.prev_node = this.node;
    }
    restore() {
        if (TipText_1.prev_node == this.node) {
            TipText_1.prev_node = null;
        }
        GameSystem_1.default._tipTxt.restor(this.node);
    }
};
__decorate([
    property(cc.Sprite)
], TipText.prototype, "txt", void 0);
__decorate([
    property(cc.Label)
], TipText.prototype, "tiptxt", void 0);
TipText = TipText_1 = __decorate([
    ccclass
], TipText);
exports.default = TipText;
