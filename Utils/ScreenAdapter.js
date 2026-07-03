"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let ScreenAdapter = class ScreenAdapter extends cc.Component {
    minpos = 0;
    maxpos = 0;
    start() {
    }
    onLoad() {
        const w = cc.winSize.width;
        const h = cc.winSize.height;
        const widget = this.node.getComponent(cc.Widget);
        if (widget) {
            widget.top = h <= 1334 ? this.minpos + 10 : this.minpos + 10;
        }
    }
};
__decorate([
    property({ type: cc.Integer })
], ScreenAdapter.prototype, "minpos", void 0);
__decorate([
    property({ type: cc.Integer })
], ScreenAdapter.prototype, "maxpos", void 0);
ScreenAdapter = __decorate([
    ccclass
], ScreenAdapter);
exports.default = ScreenAdapter;
