"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("HttpClient");
const SdkManager_1 = require("SdkManager");
const SaveManager_1 = require("SaveManager");
const GameSystem_1 = require("GameSystem");
const TipGroup_1 = require("TipGroup");
const EventConst_1 = require("EventConst");
const UIManager_1 = require("UIManager");
const PanelConst_1 = require("PanelConst");
const GameNetwork_1 = require("GameNetwork");
class WxManager extends SdkManager_1.default {
    recordTime = null;
    rewardNum = 0;
    interstitialAd = null;
    recorder = null;
    appbox = null;
    bannerAd = null;
    index = 0;
    bannerCount = 0;
    bannerNum = 0;
    recorderTime = 0;
    recordvidoe = null;
    bannerRepeat = 5;
    _noShareGroup = false;
    count = 0;
    BannerShow() {
    }
    isHaveShare() { return true; }
    ClickShare(success, fail) {
        wx.shareAppMessage({
            title: "贫僧西行路途艰险，缺个同道道友，速速前来组队取经！",
            desc: "贫僧快被妖怪抓走啦，速来搭救，组队躺赢闯西游",
            imageUrl: "", query: this.shareInviteQuery(),
            success() { console.log("分享成功"); success(); },
            fail() { console.log("分享失败"); fail(); },
        });
    }
    share() {
        wx.shareAppMessage({
            title: "贫僧西行路途艰险，缺个同道道友，速速前来组队取经！",
            imageUrl: "",
            query: this.shareInviteQuery(),
            success() { console.log("分享成功"); },
            fail() { console.log("分享失败"); },
        });
    }
    customer() { wx.openCustomerServiceConversation(); }
    postReset() { wx.getOpenDataContext().postMessage({ type: "postReset" }); }
    static cocosToWXPixel(node) {
        const cw = cc.game.canvas.width;
        const ch = cc.game.canvas.height;
        const sw = cc.winSize.width;
        const sh = cc.winSize.height;
        const w = node.width;
        const h = node.height;
        const wp = node.convertToWorldSpace(cc.v2(0, h));
        return cc.rect(cw / sw * wp.x, (1 - wp.y / sh) * ch, cw / sw * w, ch / sh * h);
    }
    async login1() {
        let wxcode = await this.getWxLoginCode();
        const launch = wx.getLaunchOptionsSync();
        console.log("启动参数：", launch);
        const query = launch.query || {};
        let invite = query['i'];
        console.log("登录用户名:", wxcode);
        let resp = await HttpClient_1.default.async_post("/api/login", { code: wxcode });
        console.log("登录响应:", resp);
        if (!resp) {
            console.log("登录响应为空:", resp);
            return false;
        }
        const info = JSON.parse(resp);
        if (!info.success) {
            console.log("登录失败:", info);
            TipGroup_1.default.instance.setText(-1, info.error);
            return false;
        }
        console.log("登录成功:", info);
        const info2 = { invite: invite, playerId: info.playerId, token: info.token };
        localStorage.setItem("westj_login", JSON.stringify(info2));
        return true;
    }
    AppBoxAd() {
    }
    setTranscends() {
        const ctx = wx.getOpenDataContext();
        ctx.canvas.width = 200;
        ctx.canvas.height = 150;
        ctx.postMessage({ type: "transcend", open: "0", width: 200, height: 150, score: 0 });
    }
    hideTranscends() {
        wx.getOpenDataContext().postMessage({ type: "transcend", open: "1", width: 200, height: 150, score: 0 });
    }
    MoreGame() {
        if (wx.navigateToMiniProgram)
            wx.navigateToMiniProgram();
        else
            wx.showModal({ title: "提示", content: "当前客户端版本过低，无法使用该功能，请升级客户端或关闭后重启更新。" });
        wx.onMoreGamesModalClose((r) => console.log("modal closed", r));
        wx.onNavigateToMiniProgram((r) => { console.log(r.errCode); console.log(r.errMsg); });
        if ("ios" !== wx.getSystemInfoSync().platform) {
            wx.showMoreGamesModal({ appLaunchOptions: [], success(r) { console.log("success", r.errMsg); }, fail(r) { console.log("fail", r.errMsg); } });
        }
    }
    vibrate() { wx.vibrateShort({}); }
    showLoading() { wx.showLoading({ title: "加载中", mask: true }); }
    showShare() { wx.showShareMenu({ withShareTicket: true }); }
    InterstitialShow() {
        if (this.interstitialAd)
            this.interstitialAd.show().catch((e) => console.error(e));
    }
    recorderAd() {
        if (this.recorder == null) {
            this.recorder = wx.getGameRecorderManager();
            this.recorder.onStop((res) => { this.recordvidoe = res.videoPath; GameSystem_1.default.isdorecorder = false; cc.systemEvent.emit(EventConst_1.EventConst.SaveManager); });
            this.recorder.onStart(() => { console.log("开始录屏"); GameSystem_1.default.isdorecorder = true; cc.systemEvent.emit(EventConst_1.EventConst.SaveManager); });
        }
    }
    controlKey() {
    }
    async getWxLoginCode() {
        return new Promise((resolve) => {
            wx.login({
                success: async (res) => {
                    if (!res.code) {
                        console.error("wx.login 失败：", res.errMsg);
                        return;
                    }
                    console.log("拿到 code：", res.code);
                    resolve(res.code);
                },
                fail: (err) => {
                    console.error("wx.login 调用失败：", err);
                    resolve(null);
                }
            });
        });
    }
    BannerAd() {
    }
    async RewardedAd() {
        let res = await GameNetwork_1.default.getInstance().requestAdUnit("reward", "wx");
        console.log(res);
        if (!res.data.success) {
            console.log("请求广告失败");
            return;
        }
        let adunit = res.data.adUnitId;
        return wx.createRewardedVideoAd({ adUnitId: adunit });
    }
    onShareListen() {
        wx.onShareAppMessage(() => ({
            title: "贫僧西行路途艰险，缺个同道道友，速速前来组队取经！",
            query: this.shareInviteQuery(),
            success() { console.log("分享成功"); },
            fail(e) { console.log("分享失败", e); },
        }));
    }
    goOtherGame() { wx.navigateToMiniProgram({ appId: "xxxxxxxxxxxxxxxxxxx" }); }
    InterstitialAd() {
    }
    setUserData() { }
    AppBoxShow() { this.AppBoxAd(); this.appbox.load().then(() => this.appbox.show()); }
    toOtherGame(appId, eventKey, cb) {
        this.logEvent(eventKey, { appid: appId, range: "all" });
        wx.navigateToMiniProgram({
            appId,
            success: () => {
                if (cb) {
                    cb();
                    this.logEvent(eventKey, { appid: appId, range: "success" });
                }
            },
        });
    }
    onShow() {
        console.log("打印场景值");
        const opt = wx.getLaunchOptionsSync();
        console.log("LaunchOption.scene..." + opt.scene);
        wx.onShow((res) => { console.log("res.onShow() " + res.scene); });
    }
    onHideListen() { wx.onHide(() => { console.log("wx.onHide()"); }); }
    saveApp(success, fail) {
        wx.saveAppToDesktop({ success() { success(); }, fail() { fail(); }, complete() { } });
    }
    getMenuButtonBottom() {
        return wx.getMenuButtonBoundingClientRect().bottom / cc.view.getFrameSize().height * cc.winSize.height;
    }
    BannerHide() {
        if (this.bannerAd != null)
            this.bannerAd.hide();
    }
    recorderstop() {
        if (this.recordTime)
            clearTimeout(this.recordTime);
        console.log("录屏结束");
        this.recorder.stop();
        if ((new Date().getTime() - this.recorderTime) / 1000 < 3) {
            TipGroup_1.default.instance.setText(-1, "录屏时间小于3秒。");
        }
        else {
            UIManager_1.default.Instance.ShowUI(PanelConst_1.default.ShareRecorder);
        }
    }
    hideLoading() { wx.hideLoading(); }
    login(cb) {
        SaveManager_1.default.init();
        cb();
        this.onShareListen();
        this.showShare();
    }
    shareRecorder(success, fail) {
        wx.shareAppMessage({
            channel: "video", title: "贫僧西行路途艰险，缺个同道道友，速速前来组队取经！",
            desc: "贫僧快被妖怪抓走啦，速来搭救，组队躺赢闯西游", imageUrl: "",
            query: this.shareInviteQuery(),
            extra: { videoPath: this.recordvidoe, videoTopics: ["西游", "无敌唐三葬", "黑神话"], createChallenge: false },
            success() { success(); }, fail() { fail(); },
        });
    }
    async RewardedShow() {
        const rewardedAd = await this.RewardedAd();
        return new Promise((resolve, reject) => {
            const onClose = (res) => {
                if (res.isEnded) {
                    console.log("成功");
                    resolve(true);
                }
                else {
                    console.log("失败");
                    resolve(false);
                }
                rewardedAd.offClose(onClose);
                rewardedAd.offError(onError);
            };
            const onError = (err) => {
                console.log("rewardad" + err.errCode + " : " + err.errMsg);
                reject(false);
                rewardedAd.offError(onError);
            };
            rewardedAd.load().then(() => rewardedAd.show()).catch((e) => console.log(e.errMsg));
            rewardedAd.onClose(onClose);
            rewardedAd.onError(onError);
        });
    }
    hideWXOpen() { wx.getOpenDataContext().postMessage({ type: "hideWXOpen" }); }
    recorderstart() {
        console.log("开始录屏");
        this.recorderTime = new Date().getTime();
        this.recorder.start({ duration: 300 });
        let count = 0;
        this.recordTime = setTimeout(() => {
            if (++count >= 170) {
                clearTimeout(this.recordTime);
                this.recorder.stop();
            }
        }, 1000, 180);
    }
}
exports.default = WxManager;
