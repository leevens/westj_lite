"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const SoundManager_1 = require("SoundManager");
const GameTools_1 = require("GameTools");
const { ccclass } = cc._decorator;
let ShareButton = class ShareButton extends cc.Component {
    start() {
    }
    onLoad() {
        this.node.active = GameTools_1.default.getSdk().isHaveShare();
    }
    ClickShare() {
        SoundManager_1.SoundManager.instance.play(SoundManager_1.Sound.Click);
        GameTools_1.default.getSdk().share();
    }
};
ShareButton = __decorate([
    ccclass
], ShareButton);
exports.default = ShareButton;
