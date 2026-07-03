export default class LoadingTask {
    curLoadDirs: string;
    totalCount: number;
    completeCount: number;
    curLoadManager: any;
    LoadFinish(): void;
    StartLoadSignleRes(path: string, type: any): void;
    constructor(loadManager: any);
    StartLoadDir(dir: string, type: any): void;
}
