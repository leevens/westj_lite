export default class PoolManager {
    private _pool;
    private _used;
    initCount: number;
    private _maxCount;
    prefab: cc.Prefab;
    maxCount: number;
    constructor(prefab: cc.Prefab, initCount: number, maxCount: number);
    restor(node: cc.Node): void;
    getState(): string;
    get(): cc.Node | null;
    restoreAll(): void;
}
