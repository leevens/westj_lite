import SdkManager from "SdkManager";
export default class GameTools {
    static normalUnits: string[];
    static artNumberUnits: string[];
    static units: string[];
    static sceneBundle: cc.AssetManager.Bundle | null;
    static ResBundle1: cc.AssetManager.Bundle | null;
    static Jsonbundle: cc.AssetManager.Bundle | null;
    static ResBundle2: cc.AssetManager.Bundle | null;
    static bundle: cc.AssetManager.Bundle | null;
    static sdkInstance: SdkManager | null;
    static getHowPoint(val: number, scale: number): number;
    static refSetCoin(val: number): string;
    static ConvertTargetPointToCoor(point: cc.Vec2, from: cc.Node, to: cc.Node): cc.Vec2;
    static ConvertNumberToAscii(val: number, units?: string[], withPlus?: boolean): string;
    static loadAudioClip(bundleName: string, path: string): Promise<cc.AudioClip | null>;
    static GetMinAngleValue(a: number, b: number): number[];
    static loadJson(bundleName: string, path: string): Promise<any>;
    static GetTwoArray<T>(rows: number, cols: number, fill: T): T[][];
    static randomMinToMax(min: number, max: number): number;
    static GetUpDirLocalVect(target: cc.Node, ref?: cc.Node | null): cc.Vec2;
    static parseCompressedJson(raw: any[]): any[];
    static ConvertTargetToCurLocal(target: cc.Node, cur: cc.Node): cc.Vec2;
    static get0Time(): number;
    static LoadFont(bundleName: string, path: string): Promise<cc.Font | null>;
    static LoadSpinData(bundleName: string, path: string): Promise<sp.SkeletonData | null>;
    static GetNumFromArray<T>(arr: T[] | undefined, item: T): number;
    static getSdk(): SdkManager;
    static GetOneArray<T>(len: number, fill: T): T[];
    static hour_min_secTimeFuncion(sec: number): string;
    static IsPosInCanvas(node: cc.Node): boolean;
    static nowToZero(): number;
    static GameResume(): void;
    static getBundle(name: string): cc.AssetManager.Bundle | null;
    static RemoveFromArray<T>(arr: T[] | undefined, item: T): void;
    static GetRes<T>(bundleName: string, path: string, type: {
        new (): T;
    }): T | null;
    static Screen2CoordPos(screen: cc.Vec2, target: cc.Node, camera: cc.Camera): cc.Vec2;
    static isWxGame(): boolean;
    static loadPrefab(bundleName: string, path: string): Promise<cc.Prefab | null>;
    static cocosToWX(node: cc.Node): cc.Rect;
    static ConvertTargetCameraToCur(target: cc.Node, camera: cc.Camera, cur: cc.Node, cur2: cc.Camera): cc.Vec2;
    static sec_to_timefunction(sec: number): string;
    static IsGamePause(): boolean;
    static ConvertNumberToUit(val: number, units?: string[]): string;
    static GetCloseInRectByPos(p: cc.Vec2, r: cc.Rect): cc.Vec2;
    static GetComponentInParent<T extends cc.Component>(node: cc.Node, compType: {
        new (): T;
    } | string): T | null;
    static GamePause(): void;
    static loadImage(bundleName: string, path: string): Promise<cc.SpriteFrame | null>;
    static GetResJson(bundleName: string, path: string): Promise<any[]>;
    static LoadAny<T>(bundleName: string, path: string, type: {
        new (): T;
    }): Promise<T | null>;
}
