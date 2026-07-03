"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandGet100 = exports.ATKTYPE = exports.EventConst = void 0;
const { ccclass, property } = cc._decorator;
var EventConst;
(function (EventConst) {
    EventConst["EV_REFRESH_BUILD_DATA"] = "EV_REFRESH_BUILD_DATA";
    EventConst["EV_REFRESH_DISCIPLE_DATA"] = "EV_REFRESH_DISCIPLE_DATA";
    EventConst["Coin"] = "Coin";
    EventConst["Jewel"] = "Jewel";
    EventConst["Gold"] = "Gold";
    EventConst["EV_UNLOCK_NEW_DISCIPLE"] = "EV_UNLOCK_NEW_DISCIPLE";
    EventConst["EV_UNLOCK_NEW_BUILDER"] = "EV_UNLOCK_NEW_BUILDER";
    EventConst["GAME_BG_TOUCH_START"] = "GAME_BACKG_TOUCH_START";
    EventConst["GAME_BG_TOUCH_END"] = "GAME_BACKG_TOUCH_END";
    EventConst["GAME_BG_TOUCH_CANCEL"] = "GAME_BG_TOUCH_CANCEL";
    EventConst["GAME_BG_TOUCH_WHEEL"] = "GAME_BG_TOUCH_WHEEL";
    EventConst["GAME_BG_TOUCH_MOVE"] = "GAME_BG_TOUCH_MOVE";
    EventConst["GAME_CHESS_MOVE"] = "GAME_CHESS_MOVE";
    EventConst["GAME_CHESS_END"] = "GAME_CHESS_END";
    EventConst["Game_Fight_initSkill"] = "Game_Fight_initSkill";
    EventConst["Game_Fight_changeMp"] = "Game_Fight_changeMp";
    EventConst["Game_Fight_changeHp"] = "Game_Fight_changeHp";
    EventConst["Game_Fight_skill"] = "Game_Fight_skill";
    EventConst["Game_FIght_allTeamCure"] = "Game_FIght_allTeamCure";
    EventConst["GameStart"] = "GameStart";
    EventConst["Game_Up"] = "Game_Up";
    EventConst["Game_Guide"] = "Game_Guide";
    EventConst["Game_Build"] = "Game_Build";
    EventConst["Shop_Ref"] = "Shop_Ref";
    EventConst["Maps"] = "Maps";
    EventConst["Landmark"] = "Landmark";
    EventConst["UnlockRoam"] = "UnlockRoam";
    EventConst["initChessPos"] = "initChessPos";
    EventConst["initUpNum"] = "initUpNum";
    EventConst["initTips"] = "initTips";
    EventConst["CanUpEquip"] = "CanUpEquip";
    EventConst["CanUpSkill"] = "CanUpSkill";
    EventConst["initFight"] = "initFight";
    EventConst["playChapter"] = "playChapter";
    EventConst["playPlace"] = "playPlace";
    EventConst["SaveManager"] = "SaveManager";
    EventConst["NETWORK_STATUS_CHANGE"] = "NETWORK_STATUS_CHANGE";
})(EventConst || (exports.EventConst = EventConst = {}));
exports.ATKTYPE = {
    MELEE: "近战",
    RANGED: "远程"
};
function RandGet100() {
    return Math.floor(100 * Math.random());
}
exports.RandGet100 = RandGet100;
let EventConstComp = class EventConstComp extends cc.Component {
    text = "hello";
    label = null;
    start() {
    }
};
__decorate([
    property
], EventConstComp.prototype, "text", void 0);
__decorate([
    property(cc.Label)
], EventConstComp.prototype, "label", void 0);
EventConstComp = __decorate([
    ccclass
], EventConstComp);
exports.default = EventConstComp;
