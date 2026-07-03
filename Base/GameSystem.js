"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GameSystem_1;
Object.defineProperty(exports, "__esModule", { value: true });
const SaveManager_1 = require("SaveManager");
const EventConst_1 = require("EventConst");
const { ccclass } = cc._decorator;
let GameSystem = class GameSystem extends cc.Component {
    static { GameSystem_1 = this; }
  

     

    static SaveGameDate() {
    }

};
GameSystem = GameSystem_1 = __decorate([
    ccclass
], GameSystem);
exports.default = GameSystem;
