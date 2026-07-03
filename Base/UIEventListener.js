"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UIEventListener_1;
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let UIEventListener = UIEventListener_1 = class UIEventListener extends cc.Component {
    touchLongEvents = [];
    touchCancelEvents = [];
    touchMoveEvents = [];
    touchEvents = [];
    touchStartEvents = [];
    touchSliderEvents = [];
    isDowning = false;
    isSliderY = false;
    touchAudio = null;
    isSliderEffect = false;
    downTimer = 0;
    sliderEffSpeed = 0;
    rawScale = 0;
    clickInterval = .1;
    clickTime = null;
    longDownEffTime = .3;
    initScale = 1;
    touchAnim = false;
    addTouchCancelEvent(t) {
        this.touchCancelEvents = [],
            this.touchCancelEvents.push(t);
    }
    addTouchStartEvent(t) {
        this.touchStartEvents = [],
            this.touchStartEvents.push(t);
    }
    onLoad() {
        this.rawScale = this.node.scale,
            this.node.on("touchstart", this.touchStart.bind(this), this.node),
            this.node.on("touchend", this.touchEnd.bind(this), this.node),
            this.node.on("touchcancel", this.touchCancel.bind(this), this.node),
            this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove.bind(this), this.node);
    }
    addTouchEvent(t) {
        this.touchEvents = [],
            this.touchEvents.push(t);
    }
    touchStart() {
        !this.enabled || (this.initScale = this.node.scale, this.isSliderEffect = false, this.touchAnim && (this.node.scale = this.initScale - .05), this.isDowning = true, this.downTimer = 0, this.touchStartEvents.length > 0 && cc.Component.EventHandler.emitEvents(this.touchStartEvents));
    }
    static Get(t, e) {
        void 0 === e && (e = false);
        var a = t.getComponent(UIEventListener_1);
        return a || (a = t.addComponent(UIEventListener_1)),
            a.touchAnim = e,
            a;
    }
    touchEnd() {
        if (this.isDowning = false, !this.enabled || (this.touchAnim && (this.node.scale = this.initScale), !this.isSliderEffect)) {
            var t = new Date, e = 1e3 * this.clickInterval;
            t.getTime() - this.clickTime < e || (this.clickTime = t.getTime(), this.touchEvents.length > 0 && cc.Component.EventHandler.emitEvents(this.touchEvents, this.node));
        }
    }
    touchCancel() {
        !this.enabled || (this.isDowning = false, this.touchAnim && (this.node.scale = this.initScale), this.touchCancelEvents.length > 0 && cc.Component.EventHandler.emitEvents(this.touchCancelEvents));
    }
    touchMove(t) {
        if (!this.enabled || (this.touchMoveEvents.length > 0 && cc.Component.EventHandler.emitEvents(this.touchMoveEvents, this.node.name), !this.isSliderEffect)) {
            var e = t.getDelta();
            (this.isSliderY ? this.sliderEffSpeed > 0 ? e.y >= this.sliderEffSpeed : e.y <= this.sliderEffSpeed : this.sliderEffSpeed > 0 ? e.x >= this.sliderEffSpeed : e.x <= this.sliderEffSpeed) && this.touchSliderEvents.length > 0 && (this.isSliderEffect = true, cc.Component.EventHandler.emitEvents(this.touchSliderEvents, this.node.name));
        }
    }
    onDestroy() {
        this.node.targetOff(this.node);
    }
    addTouchLongEvent(t) {
        this.touchLongEvents = [],
            this.touchLongEvents.push(t);
    }
    update() {
        this.isDowning && (this.downTimer += cc.director.getDeltaTime(), this.downTimer >= this.longDownEffTime && (this.touchLongEvents.length > 0 && cc.Component.EventHandler.emitEvents(this.touchLongEvents, this.node.name), this.isDowning = false));
    }
    addMoveEvent(t) {
        this.touchMoveEvents.push(t);
    }
};
__decorate([
    property({
        type: cc.Component.EventHandler,
        displayName: "触摸回调"
    })
], UIEventListener.prototype, "touchEvents", void 0);
__decorate([
    property({
        type: cc.AudioClip,
        displayName: "触摸音"
    })
], UIEventListener.prototype, "touchAudio", void 0);
__decorate([
    property({
        type: cc.Float,
        displayName: "点击间隔"
    })
], UIEventListener.prototype, "clickInterval", void 0);
__decorate([
    property({
        displayName: "触摸动画"
    })
], UIEventListener.prototype, "touchAnim", void 0);
UIEventListener = UIEventListener_1 = __decorate([
    ccclass
], UIEventListener);
exports.default = UIEventListener;
