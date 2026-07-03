"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventConst_1 = require("EventConst");
const { ccclass } = cc._decorator;
const l = ccclass;
let BackgroundTouch = class BackgroundTouch extends cc.Component {
    start() {
        this.node.on(cc.Node.EventType.TOUCH_START, function (t) {
            cc.systemEvent.emit(EventConst_1.EventConst.GAME_BG_TOUCH_START, t);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (t) {
            cc.systemEvent.emit(EventConst_1.EventConst.GAME_BG_TOUCH_END, t);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
            cc.systemEvent.emit(EventConst_1.EventConst.GAME_BG_TOUCH_MOVE, t);
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function (t) {
            cc.systemEvent.emit(EventConst_1.EventConst.GAME_BG_TOUCH_WHEEL, t);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
            cc.systemEvent.emit(EventConst_1.EventConst.GAME_BG_TOUCH_CANCEL, t);
        }, this);
    }
};
BackgroundTouch = __decorate([
    ccclass
], BackgroundTouch);
exports.default = BackgroundTouch;
