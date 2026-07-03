"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatus = void 0;
const EventConst_1 = require("EventConst");
const GameTools_1 = require("GameTools");
const { ccclass, property } = cc._decorator;
let NetworkStatus = class NetworkStatus extends cc.Component {
    msgNode = null;
    retryNode = null;
    loadingNode = null;
    start() {
        cc.systemEvent.on(EventConst_1.EventConst.NETWORK_STATUS_CHANGE, this.networkStatusChange, this);
    }
    onDestroy() {
        cc.systemEvent.off(EventConst_1.EventConst.NETWORK_STATUS_CHANGE, this.networkStatusChange, this);
    }
    async RetryConnect(target) {
        console.log("ReconnectBtn", target);
        await GameTools_1.default.getSdk().reconnect();
    }
    networkStatusChange(status, code) {
        this.loadingNode.active = !status;
        if (!status) {
            if (code.code >= 4000) {
                this.msgNode.string = `连接断开，原因：${code.reason}`;
                this.retryNode.active = true;
            }
            else {
                this.msgNode.string = `连接断开，重连中.....`;
                this.retryNode.active = false;
            }
        }
    }
};
exports.NetworkStatus = NetworkStatus;
__decorate([
    property({ type: cc.Label, displayName: "服务器断开提示节点" })
], NetworkStatus.prototype, "msgNode", void 0);
__decorate([
    property({ type: cc.Node, displayName: "服务器断开提示节点" })
], NetworkStatus.prototype, "retryNode", void 0);
__decorate([
    property({ type: cc.Node, displayName: "服务器重连加载节点" })
], NetworkStatus.prototype, "loadingNode", void 0);
exports.NetworkStatus = NetworkStatus = __decorate([
    ccclass
], NetworkStatus);
