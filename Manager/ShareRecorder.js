"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoinOutputDataManager_1 = require("CoinOutputDataManager");
const SoundManager_1 = require("SoundManager");
const GameTools_1 = require("GameTools");
const TipGroup_1 = require("TipGroup");
const UIBase_1 = require("UIBase");
const UIManager_1 = require("UIManager");
const { ccclass, property } = cc._decorator;
let ShareRecorder = class ShareRecorder extends UIBase_1.default {
    reward = null;
    ClickOff() {
        SoundManager_1.SoundManager.instance.play(SoundManager_1.Sound.Click);
        this.CloseThis();
    }
    start() { }
    ClickGet() {
        SoundManager_1.SoundManager.instance.play(SoundManager_1.Sound.Click);
        GameTools_1.default.getSdk().shareRecorder(async () => {
            const output = await CoinOutputDataManager_1.default.Instance.GetOutPut();
            const coinAmount = 600 * output;
            UIManager_1.default.Instance.ChangeCoin(coinAmount);
            this.CloseThis();
        }, () => {
            TipGroup_1.default.instance.setText(-1, "分享失败");
        });
    }
    async onEnable() {
        super.onEnable();
        const output = await CoinOutputDataManager_1.default.Instance.GetOutPut();
        const coinAmount = 600 * output;
        this.reward.string = "" + GameTools_1.default.refSetCoin(coinAmount);
    }
};
__decorate([
    property(cc.Label)
], ShareRecorder.prototype, "reward", void 0);
ShareRecorder = __decorate([
    ccclass
], ShareRecorder);
exports.default = ShareRecorder;
