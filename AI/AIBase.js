"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass } = cc._decorator;
let AIBase = class AIBase extends cc.Component {
    aiStates = new Array();
    __state_id = 999999;
    AddAiState(state) {
        if (this.aiStates.length != state.__id) {
            console.log("###################添加动ai狀態出错，请检查添加动画顺序", [state.__id, this.aiStates.length]);
        }
        this.aiStates.push(state);
    }
    SwitchState(id) {
        if (this.__state_id != id) {
            const oldState = this.GetAiStateById(this.__state_id);
            const newState = this.GetAiStateById(id);
            if (oldState != null)
                oldState.LeaveState();
            this.__state_id = id;
            if (newState != null)
                newState.GotoState();
        }
    }
    update(dt) {
        const state = this.GetAiStateById(this.__state_id);
        if (state)
            state.Update(dt);
    }
    GetMonster() {
        return null;
    }
    GetTeamer() {
        return null;
    }
    GetAiStateById(id) {
        if (id < this.aiStates.length) {
            return this.aiStates[id];
        }
        return null;
    }
    GetSkill() {
        return null;
    }
};
AIBase = __decorate([
    ccclass
], AIBase);
exports.default = AIBase;
