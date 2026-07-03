export default class LoadManager {
    curLoadItems: any[];
    curFinishNum: number;
    finishHandler: (() => void) | null;
    nextProgressValue: number;
    constructor(dirs: {
        [k: string]: any;
    }, singles: {
        [k: string]: any;
    }, finish?: (() => void) | null);
    GetLoadPercent(): number;
    UpdateCurProgressValue(): void;
    LoadFinishOne(): void;
}
