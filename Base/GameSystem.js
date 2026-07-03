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
    static drugnum = [];
    static team = [];
    static shopboxtime = [];
    static petexp2 = [];
    static roamboxisget = [];
    static petlevel2 = [];
    static award = [];
    static shopboxnum = [];
    static unlockartifacts = [];
    static goods = [];
    static guide = [1, 0];
    static landmark = [];
    static discipleLv = [];
    static drugboxnum = [];
    static drugover = [];
    static intensifyLv = [];
    static everyday = [];
    static roambox = [];
    static skilllevel = [1, 0, 0, 0, 0];
    static reftime = [];
    static buildlv = [];
    static artifactslist = [];
    static onlineisget = [0, 0, 0, 0];
    static drugtime = [];
    static pack = [];
    static SkillLJ = null;
    static rewardItem = null;
    static raiseditem = null;
    static CombatBoost = null;
    static isjumpguide = false;
    static fightTxt = null;
    static maxlevel = 1;
    static FlameEffect = null;
    static Eddy = null;
    static isaddColorSign = false;
    static channel = "blank";
    static adaward_nexttime = 0;
    static day = 0;
    static resetTime = 0;
    static signisget = false;
    static disater = 100;
    static tier = 0;
    static devil = 0;
    static speed = 1;
    static yehuo = null;
    static artifacts = null;
    static wzlxHit = null;
    static userid = "";
    static saveTime = 0;
    static BaneMatrix = null;
    static equipitem = null;
    static PersistentHeal = null;
    static buttet = null;
    static StarEffect = null;
    static petIndex = 1;
    static meteor = null;
    static interTime = 0;
    static reincarncount = 0;
    static addTime = 0;
    static disciple = null;
    static spectrum = null;
    static serverTime = 0;
    static HealingMatrix = null;
    static GuideMonster = null;
    static Speed = false;
    static maxtier = 0;
    static music = true;
    static resume = 0;
    static SkillHC = null;
    static dicetime = 0;
    static coin = 0;
    static maxartifacts = 0;
    static isShowVideoAd = true;
    static _tipTxt = null;
    static everydaycount = 0;
    static danMadicine = null;
    static level = 1;
    static dicenum = 0;
    static gold = 0;
    static isAddToDesktop = false;
    static drugcount = 0;
    static isShowInterAd = true;
    static SkillSp = null;
    static online = 0;
    static sound = true;
    static MoonEffect = null;
    static goodsitem = {};
    static isShowBannerAd = true;
    static ThunderEffect = null;
    static WindEffect = null;
    static resetcount = 1;
    static customs = 0;
    static automatic = false;
    static Fireball = null;
    static doMove = true;
    static CoinIcon = null;
    static shopref = 0;
    static sex = 0;
    static todayTime = 0;
    static openid = "";
    static monster = null;
    static packitem = null;
    static islogin = false;
    static SectText = null;
    static Flamepalm = null;
    static makecount = 0;
    static shopcount = 0;
    static reincarn = 0;
    static intensivecount = 0;
    static Knife = null;
    static realmexp = 0;
    static doBreak = false;
    static star = null;
    static maxcustoms = 0;
    static nowartifacts = 0;
    static isdorecorder = false;
    static jewel = 0;
    static roamexp = 0;
    static OutputCoin = null;
    static roamboxitem = null;
    static isFirstLoad = true;
    static pos = 0;
    static HeatHalo = null;
    static buycount = 0;
    static mopup = 1;
    static tick = true;
    static roamcount = 0;
    static splashAdCount = 5;
    static getTier() { return this.tier; }
    static setResetCount(v) { this.resetcount = v; SaveManager_1.default.writeData("RESETCOUNT", this.resetcount); }
    static setGoods(v) { this.goods = v; SaveManager_1.default.writeData("GOODS", this.goods); }
    static setDrugBoxNum(v) { this.drugboxnum = v; SaveManager_1.default.writeData("DRUGBOXNUM", this.drugboxnum); }
    static initEveryDay() {
        const arr = [];
        for (let i = 0; i < 12; i++)
            arr.push({ state: 0, time: 0 });
        return arr;
    }
    static setShopRefCount(reset) {
        if (reset === undefined)
            reset = false;
        if (reset)
            this.shopref = 4;
        else
            this.shopref -= 1;
        SaveManager_1.default.writeData("SHOPREF", this.shopref);
    }
    static getCoin() { return SaveManager_1.default.readInt("COIN", 0); }
    static setDisciple(v) {
        this.discipleLv = v;
        SaveManager_1.default.writeData("DISCIPLELV", this.discipleLv);
        cc.systemEvent.emit(EventConst_1.EventConst.Game_Guide);
    }
    static setMaxCustoms(v) { this.maxcustoms = v; SaveManager_1.default.writeData("MAXCUSTOMS", this.maxcustoms); }
    static addJewel(v) { SaveManager_1.default.addData("JEWEL", v); }
    static setAutomatic() { this.automatic = !this.automatic; SaveManager_1.default.writeData("AUTOMATIC", this.automatic); }
    static setShopBoxNum(v) { this.shopboxnum = v; SaveManager_1.default.writeData("SHOPBOXNUM", this.shopboxnum); }
    static getMaxTier() { return this.maxtier; }
    static setOnlineIsGet(idx) { this.onlineisget[idx] = 1; SaveManager_1.default.writeData("ONLINEISGET", this.onlineisget); }
    static getEveryDay() { return this.everyday; }
    static getMaxArtifacts() { return this.maxartifacts; }
    static getMakeCount() { return this.makecount; }
    static setPack(v) { this.pack = v; SaveManager_1.default.writeData("PACK", this.pack); }
    static getRealmExp() { return this.realmexp; }
    static getaddColorSign() { return this.isaddColorSign; }
    static getGoods() { return this.goods; }
    static addCoin(v) { SaveManager_1.default.addData("COIN", v); }
    static setisAddToDesktop() { this.isAddToDesktop = true; SaveManager_1.default.writeData("ISADDTODESKTOP", this.isAddToDesktop); }
    static getPetLevel() { return this.petlevel2; }
    static getPos() { return this.pos; }
    static getSound() { return this.sound; }
    static initLandMark() {
        const arr = [];
        for (let i = 0; i < 12; i++)
            arr.push(0);
        return arr;
    }
    static addAdCount() {
        SaveManager_1.default.writeData("ADCOUNT", this.getAdCount() + 1);
    }
    static setaddColorSign() { this.isaddColorSign = true; SaveManager_1.default.writeData("ISADDCOLORSIGN", this.isaddColorSign); }
    static getRoamBox() { return this.roambox; }
    static setDrugCount(v) { this.drugcount += v; SaveManager_1.default.writeData("DRUGCOUNT", this.drugcount); }
    static setPetIndex(v) { this.petIndex = v; SaveManager_1.default.writeData("PETINDEX", this.petIndex); }
    static setEveryDayCount() { this.everydaycount++; SaveManager_1.default.writeData("EVERYDAYCOUNT", this.everydaycount); }
    static getGuide() { return this.guide; }
    static getRefTime() { return this.reftime; }
    static setPetLevel(idx, v) { this.petlevel2[idx] = v; SaveManager_1.default.writeData("PETLEVEL2", this.petlevel2); }
    static setUnlockArtifacts() { this.unlockartifacts.push(); SaveManager_1.default.writeData("UNLOCKARTIFACTS", this.unlockartifacts); }
    static setRoamBoxIsGet(v) { this.roamboxisget = v; SaveManager_1.default.writeData("ROAMBOXISGET", this.roamboxisget); }
    static getBuyCount() { return this.buycount; }
    static setIsFristLoad() { SaveManager_1.default.writeData("ISFRISTLOAD", false); }
    static setMakeCount() { this.makecount++; SaveManager_1.default.writeData("MAKECOUNT", this.makecount); }
    static getArtifactslist() { return this.artifactslist; }
    static getAdNextTime() { return this.adaward_nexttime; }
    static getRoamExp() { return this.roamexp; }
    static setMopUp(v) { this.mopup = v; SaveManager_1.default.writeData("MOPUP", this.mopup); }
    static getLandmark() { return this.landmark; }
    static setArtifactslist(v) { this.artifactslist = v; SaveManager_1.default.writeData("ARTIFACTSLIST", this.artifactslist); }
    static getMopUp() { return this.mopup; }
    static getBuildLv() { return this.buildlv; }
    static setRoamBox(v) { this.roambox = v; SaveManager_1.default.writeData("ROAMBOX", this.roambox); }
    static getDiceNum() { return this.dicenum; }
    static getUnlockArtifacts() { return this.unlockartifacts; }
    static setMaxTier(v) { this.maxtier = v; SaveManager_1.default.writeData("MAXTIER", this.maxtier); }
    static setPetExp(idx, v) { this.petexp2[idx] += v; SaveManager_1.default.writeData("PETEXP2", this.petexp2); }
    static setTeam(v) { this.team = v; SaveManager_1.default.writeData("TEAM", this.team); }
    static getPetIndex() { return this.petIndex; }
    static getAward() { return this.award; }
    static getGold() { return SaveManager_1.default.readInt("GOLD", 0); }
    static setGuide(v) { this.guide = v; SaveManager_1.default.writeData("GUIDE", this.guide); }
    static setShopBoxTime(v) { this.shopboxtime = v; SaveManager_1.default.writeData("SHOPBOXTIME", this.shopboxtime); }
    static setSignIsGet() { this.signisget = true; SaveManager_1.default.writeData("SIGNISGET", this.signisget); }
    static getSignIsGet() { return this.signisget; }
    static initGoods() {
        const arr = [];
        for (let i = 0; i < 12; i++)
            arr.push(1);
        return arr;
    }
    static LoadGameDate() {
        this.saveTime = SaveManager_1.default.readInt("SAVETIME", 0);
        this.todayTime = SaveManager_1.default.readInt("TOADYTIME", 0);
        this.team = SaveManager_1.default.readobjArray("TEAM", this.initTeam());
        this.petIndex = SaveManager_1.default.readInt("PETINDEX", 1);
        this.level = SaveManager_1.default.readInt("LEVEL", 1);
        this.maxlevel = SaveManager_1.default.readInt("MAXLEVEL", 1);
        this.sex = SaveManager_1.default.readInt("SEX", 0);
        this.isFirstLoad = SaveManager_1.default.readBool("ISFRISTLOAD", true);
        this.devil = SaveManager_1.default.readInt("DEVIL", 0);
        this.buycount = SaveManager_1.default.readInt("BUYCOUNT", 0);
        this.maxartifacts = SaveManager_1.default.readInt("MAXARTIFACTS", 0);
        this.artifactslist = SaveManager_1.default.readintArray("ARTIFACTSLIST", this.initArtifacts());
        this.unlockartifacts = SaveManager_1.default.readintArray("UNLOCKARTIFACTS", []);
        this.nowartifacts = SaveManager_1.default.readInt("NOWARTIFACTS", 0);
        this.petlevel2 = SaveManager_1.default.readintArray("PETLEVEL2", [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
        this.petexp2 = SaveManager_1.default.readintArray("PETEXP2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.customs = SaveManager_1.default.readInt("CUSTOMS", 1);
        this.maxcustoms = SaveManager_1.default.readInt("MAXCUSTOMS", 1);
        this.guide = SaveManager_1.default.readintArray("GUIDE", [1, 0]);
        this.everyday = SaveManager_1.default.readEveryDay("EVERYDAY", this.initEveryDay());
        this.everydaycount = SaveManager_1.default.readInt("EVERYDAYCOUNT", 0);
        this.award = SaveManager_1.default.readintArray("AWARD", this.initAward());
        this.roamcount = SaveManager_1.default.readInt("ROAMCOUNT", 0);
        this.intensivecount = SaveManager_1.default.readInt("INTENSIVECOUNT", 0);
        this.makecount = SaveManager_1.default.readInt("MAKECOUNT", 0);
        this.shopcount = SaveManager_1.default.readInt("SHOPCOUNT", 0);
        this.tier = SaveManager_1.default.readInt("TIER", 1);
        this.maxtier = SaveManager_1.default.readInt("MAXTIER", 1);
        this.resume = SaveManager_1.default.readInt("RESUME", 0);
        this.buildlv = SaveManager_1.default.readintArray("BUILDLV", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        this.resetcount = SaveManager_1.default.readInt("RESETCOUNT", 1);
        this.mopup = SaveManager_1.default.readInt("MOPUP", 1);
        this.music = SaveManager_1.default.readBool("MUSIC", true);
        this.sound = SaveManager_1.default.readBool("SOUND", true);
        this.goods = SaveManager_1.default.readintArray("GOODS", this.initGoods());
        this.shopref = SaveManager_1.default.readInt("SHOPREF", 4);
        this.shopboxnum = SaveManager_1.default.readintArray("SHOPBOXNUM", [2, 2]);
        this.shopboxtime = SaveManager_1.default.readintArray("SHOPBOXTIME", [0, 0]);
        this.reftime = SaveManager_1.default.readintArray("REFTIME", [0, 0, 0, 0]);
        this.goodsitem = SaveManager_1.default.readObject("GOODSITEM", {});
        this.pack = SaveManager_1.default.readpack("PACK", []);
        this.reincarn = SaveManager_1.default.readInt("REINCARN", 0);
        this.reincarncount = SaveManager_1.default.readInt("REINCARNCOUNT", 3);
        this.automatic = SaveManager_1.default.readBool("AUTOMATIC", false);
        this.Speed = SaveManager_1.default.readBool("SPEED", false);
        this.online = SaveManager_1.default.readInt("ONLINE", 0);
        this.onlineisget = SaveManager_1.default.readintArray("ONLINEISGET", [0, 0, 0, 0]);
        this.day = SaveManager_1.default.readInt("DAY", 0);
        this.signisget = SaveManager_1.default.readBool("SIGNISGET", false);
        this.dicenum = SaveManager_1.default.readInt("DICENUM", 10);
        this.dicetime = SaveManager_1.default.readInt("DICETIME", 0);
        this.pos = SaveManager_1.default.readInt("POS", 2);
        this.roamexp = SaveManager_1.default.readInt("ROAMEXP", 0);
        this.roambox = SaveManager_1.default.readintArray("ROAMBOX", []);
        this.roamboxisget = SaveManager_1.default.readintArray("ROAMBOXISGET", []);
        this.landmark = SaveManager_1.default.readintArray("LANDMARK", this.initLandMark());
        this.drugnum = SaveManager_1.default.readintArray("DRUGNUM", [0, 0, 0, 0, 0, 0]);
        this.drugtime = SaveManager_1.default.readintArray("DRUGTIME", [0, 0, 0, 0, 0, 0]);
        this.drugboxnum = SaveManager_1.default.readintArray("DRUGBOXNUM", [0, 0, 0, 0, 0, 0]);
        this.drugover = SaveManager_1.default.readintArray("DRUGOVER", [0, 0, 0, 0, 0, 0]);
        this.drugcount = SaveManager_1.default.readInt("DRUGCOUNT", 0);
        this.realmexp = SaveManager_1.default.readInt("REALMEXP", 0);
        this.intensifyLv = SaveManager_1.default.readintArray("INTENSIFYLV", [0, 0, 0, 0, 0]);
        this.skilllevel = SaveManager_1.default.readintArray("SKILLLEVEL", [1, 0, 0, 0, 0]);
        this.discipleLv = SaveManager_1.default.readDisciple("DISCIPLELV", this.initDisciple());
        this.isAddToDesktop = SaveManager_1.default.readBool("ISADDTODESKTOP", false);
        this.isaddColorSign = SaveManager_1.default.readBool("ISADDCOLORSIGN", false);
        this.adaward_nexttime = SaveManager_1.default.readInt("ADNEXTTIME", 0);
        const now = new Date();
        GameSystem_1.serverTime = now.getTime();
        const todayStart = new Date(this.serverTime).setHours(0, 0, 0, 0);
        if (this.todayTime < todayStart) {
            this.todayTime = todayStart;
            SaveManager_1.default.writeData("TOADYTIME", this.todayTime);
            this.resetcount = 1;
            SaveManager_1.default.writeData("RESETCOUNT", this.resetcount);
            this.mopup = 1;
            SaveManager_1.default.writeData("MOPUP", this.mopup);
            this.shopboxnum = [2, 2];
            SaveManager_1.default.writeData("SHOPBOXNUM", this.shopboxnum);
            this.reftime = [0, 0, 0, 0];
            SaveManager_1.default.writeData("REFTIME", this.reftime);
            this.reincarncount = 3;
            SaveManager_1.default.writeData("REINCARNCOUNT", this.reincarncount);
            this.everyday = this.initEveryDay();
            SaveManager_1.default.writeData("EVERYDAY", this.everyday);
            this.setShopRefCount(true);
            this.online = 0;
            SaveManager_1.default.writeData("ONLINE", this.online);
            this.onlineisget = [0, 0, 0, 0];
            SaveManager_1.default.writeData("ONLINEISGET", this.onlineisget);
            this.day += 1;
            SaveManager_1.default.writeData("DAY", this.day);
            this.signisget = false;
            SaveManager_1.default.writeData("SIGNISGET", this.signisget);
            SaveManager_1.default.writeData("ADCOUNT", 0);
        }
        SaveManager_1.default.writeData("ENC", 1);
    }
    static getMaxCustoms() { return this.maxcustoms; }
    static getSpeed() { return this.Speed; }
    static setDrugNum(v) { this.drugnum = v; SaveManager_1.default.writeData("DRUGNUM", this.drugnum); }
    static getNowArtifacts() { return this.nowartifacts; }
    static getDiceTime() { return this.dicetime; }
    static setRoamCount() { this.roamcount++; SaveManager_1.default.writeData("ROAMCOUNT", this.roamcount); }
    static getIsFirst() { return this.isFirstLoad; }
    static setRealmExp(v) { this.realmexp += v; SaveManager_1.default.writeData("REALMEXP", this.realmexp); }
    static getDrugTime() { return this.drugtime; }
    static getPlayerId() { return SaveManager_1.default.readString("_id", ""); }
    static getRoamCount() { return this.roamcount; }
    static setDiceTime(v) { this.dicetime = v; SaveManager_1.default.writeData("DICETIME", this.dicetime); }
    static setAdNextTime(v) { this.adaward_nexttime = v; SaveManager_1.default.writeData("ADNEXTTIME", this.adaward_nexttime); }
    static getDay() { return this.day; }
    static getOnlineIsGet() { return this.onlineisget; }
    static getIntensiveCount() { return this.intensivecount; }
    static setReincarn(v) { this.reincarn = v; this.setResume(); SaveManager_1.default.writeData("REINCARN", this.reincarn); }
    static getShopBoxTime() { return this.shopboxtime; }
    static setRoamExp(v) { this.roamexp += v; SaveManager_1.default.writeData("ROAMEXP", this.roamexp); }
    static setDiceNum(v) { this.dicenum += v; SaveManager_1.default.writeData("DICENUM", this.dicenum); }
    static getPack() { return this.pack; }
    static getOffTime() { return this.saveTime; }
    static getShopBoxNum() { return this.shopboxnum; }
    static setIntensiveCount() { this.intensivecount++; SaveManager_1.default.writeData("INTENSIVECOUNT", this.intensivecount); }
    static setSex(v) { this.sex = v; SaveManager_1.default.writeData("SEX", this.sex); }
    static getOnline() { return this.online; }
    static setOnline(v) { this.online = v; SaveManager_1.default.writeData("ONLINE", this.online); }
    static getDrugOver() { return this.drugover; }
    static setEveryDay(v) { this.everyday = v; SaveManager_1.default.writeData("EVERYDAY", this.everyday); }
    static getInviteNum() { return SaveManager_1.default.readInt("INVITE_NUM", 0); }
    static getEveryDayCount() { return this.everydaycount; }
    static setRefTime(v) { this.reftime = v; SaveManager_1.default.writeData("REFTIME", this.reftime); }
    static setMusic(v) { this.music = v; SaveManager_1.default.writeData("MUSIC", this.music); }
    static getInviteFinish() { return SaveManager_1.default.readInt("INVITE_FINISH", 0); }
    static setIntensify(idx) { this.intensifyLv[idx] += 1; SaveManager_1.default.writeData("INTENSIFYLV", this.intensifyLv); }
    static initAward() {
        const arr = [];
        for (let i = 0; i < 15; i++)
            arr.push(1);
        return arr;
    }
    static setBuyCount(reset) {
        if (reset === undefined)
            reset = false;
        if (reset)
            this.buycount = 0;
        else
            this.buycount += 1;
        SaveManager_1.default.writeData("BUYCOUNT", this.buycount);
    }
    static getGoodsItem() { return this.goodsitem; }
    static getAdCount() { return SaveManager_1.default.readInt("ADCOUNT", 0); }
    static setSound(v) {
        this.sound = v;
    }
    static setGoodsItem(v) { this.goodsitem = v; SaveManager_1.default.writeData("GOODSITEM", this.goodsitem); }
    static setAward(v) { this.award = v; SaveManager_1.default.writeData("AWARD", this.award); }
    static getisAddToDesktop() { return this.isAddToDesktop; }
    static initArtifacts() {
        const arr = [];
        for (let i = 0; i < 12; i++)
            arr.push(0);
        return arr;
    }
    static setLevel(v) {
        if (v)
            this.level = v;
        else
            this.level += 1;
        SaveManager_1.default.writeData("LEVEL", this.level);
        if (this.level > this.getMaxLevel())
            this.setMaxLevel(this.level);
        cc.systemEvent.emit(EventConst_1.EventConst.Game_Guide);
    }
    static initSkillLevel() { this.skilllevel = [1, 0, 0, 0, 0]; SaveManager_1.default.writeData("SKILLLEVEL", this.skilllevel); }
    static setReincarnCount(v) { this.reincarncount = v; this.setResume(); SaveManager_1.default.writeData("REINCARNCOUNT", this.reincarn); }
    static getSex() { return this.sex; }
    static getRoamBoxIsGet() { return this.roamboxisget; }
    static getPetExp() { return this.petexp2; }
    static getMaxLevel() { return this.maxlevel; }
    static setMaxLevel(v) { this.maxlevel = v; SaveManager_1.default.writeData("MAXLEVEL", this.maxlevel); }
    static initTeam() {
        const arr = [];
        for (let i = 0; i < 6; i++) {
            if (i === 0)
                arr.push({ type: 0, id: 0 });
            else if (i === 1)
                arr.push({ type: 1, id: -1 });
            else
                arr.push({ type: 2, id: -1 });
        }
        return arr;
    }
    static setResume() { this.resume += 1; SaveManager_1.default.writeData("RESUME", this.resume); }
    static getIntensify() { return this.intensifyLv; }
    static SaveGameDate() {
    }
    static initDisciple() {
        const arr = [];
        for (let i = 0; i < 4; i++)
            arr.push({ level: 1, skill1: 1, skill2: 0, skill3: 0, unlock: false, state: false });
        return arr;
    }
    static setOffTime() { const now = new Date(); this.saveTime = now.getTime(); SaveManager_1.default.writeData("SAVETIME", this.saveTime); }
    static setMaxArtifacts(v) { this.maxartifacts = v; SaveManager_1.default.writeData("MAXARTIFACTS", this.maxartifacts); }
    static setLandmark(idx) { this.landmark[idx] += 1; SaveManager_1.default.writeData("LANDMARK", this.landmark); }
    static setShopCount() { this.shopcount++; SaveManager_1.default.writeData("SHOPCOUNT", this.shopcount); }
    static getShopRefCount() { return this.shopref; }
    static setNowArtifacts(v) { this.nowartifacts = v; SaveManager_1.default.writeData("NOWARTIFACTS", this.nowartifacts); }
    static getDrugNum() { return this.drugnum; }
    static setTier(v) { this.tier = v; SaveManager_1.default.writeData("TIER", this.tier); }
    static setSkillLevel(idx) { this.skilllevel[idx] += 1; SaveManager_1.default.writeData("SKILLLEVEL", this.skilllevel); }
    static getReincarn() { return this.reincarn; }
    static setDrugOver(v) { this.drugover = v; SaveManager_1.default.writeData("DRUGOVER", this.drugover); }
    static setDrugTime(v) { this.drugtime = v; SaveManager_1.default.writeData("DRUGTIME", this.drugtime); }
    static getLevel() { return this.level; }
    static setBuildLv(v) { this.buildlv = v; SaveManager_1.default.writeData("BUILDLV", this.buildlv); }
    static getResetCount() { return this.resetcount; }
    static getTeam() { return this.team; }
    static getReincarnCount() { return this.reincarncount; }
    static getDrugBoxNum() { return this.drugboxnum; }
    static _clearGameData() { cc.sys.localStorage.clear(); }
    static setCustoms(v) { this.customs = v; SaveManager_1.default.writeData("CUSTOMS", this.customs); cc.systemEvent.emit(EventConst_1.EventConst.Game_Guide); }
    static getResume() { return this.resume; }
    static getSkillLevel() { return this.skilllevel; }
    static getDisciple() { return this.discipleLv; }
    static getDevil() { return this.devil; }
    static getShopCount() { return this.shopcount; }
    static getMusic() { return this.music; }
    static Plate() { }
    static addGold(v) { SaveManager_1.default.addData("GOLD", v); }
    static setSpeed(v) { this.Speed = v; SaveManager_1.default.writeData("SPEED", this.Speed); }
    static getCustoms() { return this.customs; }
    static setDevil(v) { this.devil = v; SaveManager_1.default.writeData("DEVIL", this.devil); }
    static getJewel() { return SaveManager_1.default.readInt("JEWEL", 0); }
    static getAutomatic() { return this.automatic; }
    static setIsFirst() { this.isFirstLoad = false; SaveManager_1.default.writeData("ISFRISTLOAD", this.isFirstLoad); }
    static getDrugCount() { return this.drugcount; }
    static setPos(v) { this.pos = v; SaveManager_1.default.writeData("POS", this.pos); }
};
GameSystem = GameSystem_1 = __decorate([
    ccclass
], GameSystem);
exports.default = GameSystem;
