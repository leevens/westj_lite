"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SaveManager_1 = require("SaveManager");
const GameSystem_1 = require("GameSystem");
const HttpClient_1 = require("HttpClient");
const GameNetwork_1 = require("GameNetwork");
const EventConst_1 = require("EventConst");
const TipGroup_1 = require("TipGroup");
const UIManager_1 = require("UIManager");
const PanelConst_1 = require("PanelConst");
class SdkManager {
    BannerAd() { }
    shareInviteQuery() {
        return "i=" + GameSystem_1.default.getPlayerId();
    }
    CleanData() { }
    onShow() { }
    isHaveAddToDesktop() {
        return false;
    }
    addColorSign(..._args) { }
    logEvent(..._args) {
        GameNetwork_1.default.getInstance().logEvent(_args);
    }
    async reconnect() {
        return new Promise((resolve, reject) => {
            cc.systemEvent.once(EventConst_1.EventConst.NETWORK_STATUS_CHANGE, async (status, code) => {
                if (status) {
                    let playerData = await GameNetwork_1.default.getInstance().requestPlayerData();
                    if (!playerData || !playerData.data) {
                        console.log("重新请求玩家数据失败:", playerData);
                        return false;
                    }
                    resolve(true);
                }
            });
            GameNetwork_1.default.getInstance().retryConnect();
        });
    }
    showShare() { }
    InterstitialShow() { }
    async RewardedShow() {
        TipGroup_1.default.instance.setText(-1, "暂无广告,直接完成");
        return true;
    }
    controlKey() {
    }
    SendEvent(..._args) { }
    InterstitialAd() { }
    toOtherGame(appId, eventKey, cb) { }
    BannerHide() { }
    postReset() { }
    BannerShow() { }
    isHaveShare() {
        return false;
    }
    async login2() {
        let loginInfo = localStorage.getItem("westj_login");
        if (!loginInfo) {
            console.log("没有登录信息,!!!");
            return false;
        }
        const info = JSON.parse(loginInfo);
        let { playerId, token, invite } = info;
        let ret = await GameNetwork_1.default.getInstance().connect(playerId, token, invite);
        if (!ret) {
            console.log("游戏登录失败:", info);
            return false;
        }
        let playerData = await GameNetwork_1.default.getInstance().requestPlayerData();
        if (!playerData || !playerData.data) {
            return false;
        }
        SaveManager_1.default.init(playerData.data);
        return true;
    }
    ChannelCallBack() {
        return "blank";
    }
    goOtherGame() { }
    login(cb = null, failed = null) {
        this.async_login().then((ret) => {
            if (ret) {
                cb();
            }
            else {
                failed();
            }
        });
    }
    recorderstop() { }
    
    recorderstart() { }
    shareRecorder(success, fail) { }
    share(cb = null) {
        let currentUrl = window.location.href;
        let url = currentUrl.indexOf("?") == -1 ? currentUrl + "?" + this.shareInviteQuery() : currentUrl + "&" + this.shareInviteQuery();
        console.log("分享URL:", url);
        this.copyToClipboard(url);
        TipGroup_1.default.instance.setText(-1, "分享链接已复制到剪切板");
        if (cb != null)
            cb();
    }
    loadData() {
    }
    async login1() {
        console.log("#########默认登录#########");
        let username = "user" + Math.floor(Math.random() * 1000000);
        let password = "123456";
        let urlParams = new URLSearchParams(window.location.search);
        let usernameParam = urlParams.get('u');
        if (usernameParam) {
            username = usernameParam;
        }
        let passwordParam = urlParams.get('p');
        if (passwordParam) {
            password = passwordParam;
        }
        let invite = urlParams.get('i');
        let resp = await HttpClient_1.default.async_post("/api/login", { username, password });
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
        const info2 = { invite: invite, playerId: info.playerId, token: info.token };
        localStorage.setItem("logintoken", JSON.stringify(info2));
        return true;
    }
    onShareListen() { }
    BannerShow1() { }
    RewardedAd() { }
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            console.log("复制成功！");
        }
        catch (err) {
            console.error("复制失败:", err);
            alert("复制失败，请手动复制");
        }
    }
    isShowAddColorSign(t) { }
    addToFavorites(t, e) { }
    async async_login() {
        let loginInfo = localStorage.getItem("logintoken");
        if (!loginInfo) {
            console.log("没有登录信息,从头开始登录22", loginInfo);
            let ret = await this.login1();
            if (!ret) {
                console.log("login1 失败");
                return false;
            }
        }
        return await this.login2();
    }
    exit() { }
    getMenuButtonBottom() {
        return 0;
    }
    onHideListen() { }
}
exports.default = SdkManager;
