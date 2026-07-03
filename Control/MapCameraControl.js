"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventConst_1 = require("EventConst");
const GameTools_1 = require("GameTools");
const { ccclass, property } = cc._decorator;
const c = ccclass;
const u = property;
let MapCameraControl = class MapCameraControl extends cc.Component {
    limitArea = null;
    renderWidth = 0;
    zoomSpeed = .1;
    moveSpeed = -.5;
    maxRatio = 2;
    renderHeight = 0;
    curCamera = null;
    moveNode = null;
    chess = null;
    onDestroy() { }
    OnTouchCancel() { }
    onLoad() {
        cc.systemEvent.on(EventConst_1.EventConst.GAME_BG_TOUCH_START, this.OnTouchStart, this);
        cc.systemEvent.on(EventConst_1.EventConst.GAME_BG_TOUCH_CANCEL, this.OnTouchCancel, this);
        cc.systemEvent.on(EventConst_1.EventConst.GAME_BG_TOUCH_MOVE, this.OnTouchMove, this);
        cc.systemEvent.on(EventConst_1.EventConst.GAME_BG_TOUCH_END, this.OnTouchEnd, this);
        cc.systemEvent.on(EventConst_1.EventConst.GAME_CHESS_MOVE, this.OnRoleMove, this);
        cc.systemEvent.on(EventConst_1.EventConst.GAME_CHESS_END, this.OnChessEnd, this);
        cc.systemEvent.on(EventConst_1.EventConst.initChessPos, this.SetPosition, this);
        var t = cc.find("Canvas");
        this.renderHeight = t.height;
        this.renderWidth = t.width;
        this.moveNode = this.node.getChildByName("moveNode");
    }
    SetPosition(t) {
        this.moveNode.setPosition(t);
        this.LimitCamera();
    }
    GetMoveSpeed() {
        return this.moveSpeed / this.GetRatio();
    }
    MoveCamera(t, e) {
        var n = this.limitArea.width;
        var a = (this.limitArea.height, this.renderWidth / this.GetRatio());
        var o = (this.renderHeight, this.GetRatio(), -n / 2 + a / 2);
        var i = n / 2 - a / 2;
        var r = t.x;
        r = (r = r < o ? o : r) > i ? i : r;
        cc.tween(this.moveNode).to(.3, { x: r }).call(function () {
            e();
        }).start();
    }
    LimitCamera() {
        var t = this.limitArea.width;
        var e = this.limitArea.height;
        var n = this.renderWidth / this.GetRatio();
        var a = this.renderHeight / this.GetRatio();
        var o = -t / 2 + n / 2;
        var i = t / 2 - n / 2;
        var r = -e / 2 + a / 2;
        var l = e / 2 - a / 2;
        var c = GameTools_1.default.ConvertTargetToCurLocal(this.moveNode, this.limitArea);
        var u = c.x;
        u = (u = u < o ? o : u) > i ? i : u;
        var p = c.y;
        p = (p = p < r ? r : p) > l ? l : p;
        var h = cc.v2(u, p);
        h = GameTools_1.default.ConvertTargetPointToCoor(h, this.limitArea, this.moveNode.parent);
        this.moveNode.setPosition(h);
    }
    OnTouchStart() { }
    start() {
        var t = this;
        this.scheduleOnce(function () {
            t.LimitCamera();
        }, 0);
    }
    OnChessEnd() {
        this.chess = null;
    }
    OnTouchEnd() { }
    SetRatio(t) {
        t = (t = t < 1 ? 1 : t) > this.maxRatio ? this.maxRatio : t;
        this.curCamera.zoomRatio = t;
        this.LimitCamera();
    }
    OnRoleMove(t) {
        this.chess = t;
    }
    GetRatio() {
        return this.curCamera.zoomRatio;
    }
    OnMouseWheel(t) {
        var e = this.GetRatio() + t.getScrollY() * this.zoomSpeed * cc.director.getDeltaTime() * .3;
        this.SetRatio(e);
    }
    OnTouchMove(t) {
        var e = t.getTouches();
        if (1 == e.length) {
            var n = e[0].getDelta();
            var a = this.moveNode.getPosition();
            var o = n.mul(this.GetMoveSpeed());
            var i = a.add(o);
            this.SetPosition(i);
        }
        else if (e.length > 1) {
            var r, s = e[0], l = e[1];
            var c = s.getLocation(), u = l.getLocation();
            var p = s.getDelta(), h = l.getDelta();
            r = c.x > u.x ? p.x - h.x : h.x - p.x;
            var f = this.GetRatio() + r * this.zoomSpeed * cc.director.getDeltaTime();
            this.SetRatio(f);
        }
    }
    update() {
        this.chess && this.SetPosition(this.chess.getPosition());
    }
};
__decorate([
    property({ type: cc.Node, displayName: "相机限制区域" })
], MapCameraControl.prototype, "limitArea", void 0);
__decorate([
    property({ type: cc.Camera, displayName: "相机" })
], MapCameraControl.prototype, "curCamera", void 0);
MapCameraControl = __decorate([
    ccclass
], MapCameraControl);
exports.default = MapCameraControl;
