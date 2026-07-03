export declare enum EventConst {
    EV_REFRESH_BUILD_DATA = "EV_REFRESH_BUILD_DATA",
    EV_REFRESH_DISCIPLE_DATA = "EV_REFRESH_DISCIPLE_DATA",
    EV_UNLOCK_NEW_DISCIPLE = "EV_UNLOCK_NEW_DISCIPLE",
    EV_UNLOCK_NEW_BUILDER = "EV_UNLOCK_NEW_BUILDER",
    GAME_BG_TOUCH_START = "GAME_BACKG_TOUCH_START",
    GAME_BG_TOUCH_END = "GAME_BACKG_TOUCH_END",
    GAME_BG_TOUCH_CANCEL = "GAME_BG_TOUCH_CANCEL",
    GAME_BG_TOUCH_WHEEL = "GAME_BG_TOUCH_WHEEL",
    GAME_BG_TOUCH_MOVE = "GAME_BG_TOUCH_MOVE",
    GAME_CHESS_MOVE = "GAME_CHESS_MOVE",
    GAME_CHESS_END = "GAME_CHESS_END",
    Game_Fight_initSkill = "Game_Fight_initSkill",
    Game_Fight_changeMp = "Game_Fight_changeMp",
    Game_Fight_changeHp = "Game_Fight_changeHp",
    Game_Fight_skill = "Game_Fight_skill",
    Game_FIght_allTeamCure = "Game_FIght_allTeamCure",
    GameStart = "GameStart",
    Game_Up = "Game_Up",
    Game_Guide = "Game_Guide",
    Game_Build = "Game_Build",
    Shop_Ref = "Shop_Ref",
    Maps = "Maps",
    Landmark = "Landmark",
    UnlockRoam = "UnlockRoam",
    initChessPos = "initChessPos",
    initUpNum = "initUpNum",
    initTips = "initTips",
    CanUpEquip = "CanUpEquip",
    CanUpSkill = "CanUpSkill",
    initFight = "initFight",
    playChapter = "playChapter",
    playPlace = "playPlace",
    SaveManager = "SaveManager",
    NETWORK_STATUS_CHANGE = "NETWORK_STATUS_CHANGE"
}
export declare const ATKTYPE: {
    MELEE: string;
    RANGED: string;
};
export declare function RandGet100(): number;
export default class EventConstComp extends cc.Component {
    text: string;
    label: cc.Label | null;
    protected start(): void;
}
