"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UIManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
const GameSystem_1 = require("GameSystem");
const EventConst_1 = require("EventConst");
const GameTools_1 = require("GameTools");
const TipGroup_1 = require("TipGroup");
const UIBase_1 = require("UIBase");
const UIClass_1 = require("UIClass");
const PanelConst_1 = require("PanelConst");
const MessageDialog_1 = require("MessageDialog");
const { ccclass, property } = cc._decorator;
let UIManager = class UIManager extends cc.Component {
    static { UIManager_1 = this; }
    panelStack = [];
    UseGoldEffectContentSkeleton = null;
    FightContent = null;
    internum = 0;
    bannerNode = null;
    static Instance = null;
    UseGoldEffectContent = null;
    panelRoot = null;
    GetPanelByType(name) {
        const len = this.panelStack.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                if (this.panelStack[i].panelName == name)
                    return this.panelStack[i];
            }
            return null;
        }
        return null;
    }
    async showMsgBox(msg) {
        let panel = await this.ShowUI(PanelConst_1.default.MessageDialog);
        if (!panel) {
            console.log("没有找到MsgPanel");
            return;
        }
        let ret = await panel.getComponent(MessageDialog_1.default).showMsgBox(msg);
        return ret;
    }
    HideUI(name) {
        const existing = this.Check(name);
        if (existing) {
            existing.panelUI.CloseThis();
            return existing.panelUI;
        }
        console.log("没有找到该面板");
    }
    ChangeCoin(n) {
        GameSystem_1.default.addCoin(n);
        if (n > 0)
            TipGroup_1.default.instance.setText(-1, "灵气+" + GameTools_1.default.refSetCoin(n));
        cc.systemEvent.emit(EventConst_1.EventConst.Coin);
    }
    ChangeGold(n) {
        GameSystem_1.default.addGold(n);
        if (n > 0) {
            TipGroup_1.default.instance.setText(-1, "功德+" + GameTools_1.default.refSetCoin(n));
        }
        else {
            TipGroup_1.default.instance.setText(-1, "功德-" + GameTools_1.default.refSetCoin(-n));
        }
        cc.systemEvent.emit(EventConst_1.EventConst.Gold);
    }
    AddPanelStack(panel) {
        this.panelStack.push(panel);
    }
    ShowInter() {
        this.internum++;
        if (this.internum >= GameSystem_1.default.splashAdCount) {
            GameTools_1.default.getSdk().FuckWxPlatform("INTER");
        }
    }
    Check(name) {
        const len = this.panelStack.length;
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                if (this.panelStack[i].panelName == name)
                    return this.panelStack[i];
            }
            return false;
        }
        return false;
    }
    async showUseGoldEffect() {
        this.UseGoldEffectContent.active = true;
        this.UseGoldEffectContentSkeleton.setAnimation(0, "eff_Sskill_eff", false);
        this.UseGoldEffectContentSkeleton.setCompleteListener((trackEntry) => {
            this.UseGoldEffectContent.active = false;
        });
        setTimeout(() => {
            this.UseGoldEffectContent.active = false;
        }, 2000);
    }
    AddCoin(n) {
        GameSystem_1.default.addCoin(n);
        cc.systemEvent.emit(EventConst_1.EventConst.Coin);
    }
    async ShowUI(name) {
        const existing = this.Check(name);
        if (existing) {
            existing.panelUI.node.active = true;
            existing.panelUI.node.setSiblingIndex(99);
            return existing.panelUI;
        }
        let prefab = GameTools_1.default.GetRes("Bundle", "Prefabs/UI/" + name, cc.Prefab);
        if (prefab == null) {
            prefab = await GameTools_1.default.LoadAny("Bundle", "Prefabs/UI/" + name, cc.Prefab);
        }
        if (prefab) {
            const node = cc.instantiate(prefab);
            if (name == "NewResultPanel" || name == "ChallengeLosePanel") {
                this.FightContent.addChild(node);
            }
            else {
                this.panelRoot.addChild(node);
            }
            node.setPosition(cc.Vec2.ZERO);
            const ui = node.getComponent(UIBase_1.default);
            const wrapper = new UIClass_1.default(name, ui);
            this.AddPanelStack(wrapper);
            return wrapper.panelUI;
        }
    }
    ChangeJewel(n) {
        GameSystem_1.default.addJewel(n);
        if (n > 0)
            TipGroup_1.default.instance.setText(-1, "灵石+" + GameTools_1.default.refSetCoin(n));
        cc.systemEvent.emit(EventConst_1.EventConst.Jewel);
    }
    GetJewel(n) {
        GameSystem_1.default.addJewel(n);
        cc.systemEvent.emit(EventConst_1.EventConst.Jewel);
    }
    OnTouchMove() {
        console.log("接收事件");
    }
    GetClass(name) {
        const existing = this.Check(name);
        return existing ? existing.panelUI : null;
    }
    onLoad() {
        UIManager_1.Instance = this;
        this.panelRoot = this.node.getChildByName("Content");
    }
};
__decorate([
    property(sp.Skeleton)
], UIManager.prototype, "UseGoldEffectContentSkeleton", void 0);
__decorate([
    property(cc.Node)
], UIManager.prototype, "FightContent", void 0);
__decorate([
    property(cc.Node)
], UIManager.prototype, "bannerNode", void 0);
__decorate([
    property(cc.Node)
], UIManager.prototype, "UseGoldEffectContent", void 0);
UIManager = UIManager_1 = __decorate([
    ccclass
], UIManager);
exports.default = UIManager;
