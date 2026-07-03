"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass } = cc._decorator;
let Singleton = class Singleton {
    static rootNode = null;
    static GetManagerRoot() {
        if (!this.rootNode) {
            this.rootNode = cc.find("Manager");
        }
        return this.rootNode;
    }
    static RegistSingleTon(compClass) {
        const root = this.GetManagerRoot();
        let inst;
        try {
            inst = root.addComponent(compClass);
        }
        catch (err) {
            console.log("manager名字错误 不存在对应的脚本" + compClass);
        }
        return inst;
    }
};
Singleton = __decorate([
    ccclass
], Singleton);
exports.default = Singleton;
