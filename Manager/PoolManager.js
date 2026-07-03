"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PoolManager {
    _pool = new cc.NodePool();
    _used = [];
    initCount;
    _maxCount = 0;
    prefab;
    maxCount;
    constructor(prefab, initCount, maxCount) {
        this.prefab = prefab;
        this.initCount = initCount;
        this.maxCount = maxCount;
        for (let i = 0; i < this.initCount; ++i) {
            const node = cc.instantiate(this.prefab);
            this._pool.put(node);
        }
        if (maxCount) {
            this._maxCount = maxCount;
        }
    }
    restor(node) {
        this._pool.put(node);
        const idx = this._used.indexOf(node, 0);
        if (idx >= 0) {
            this._used.splice(idx, 1);
        }
    }
    getState() {
        return "poolsize: " + this._pool.size() + ", used: " + this._used.length + ", max: " + this._maxCount;
    }
    get() {
        let node = null;
        if (this._pool.size() > 0) {
            node = this._pool.get();
        }
        else if (this._maxCount == 0) {
            node = cc.instantiate(this.prefab);
        }
        else if (this._used.length < this._maxCount) {
            node = cc.instantiate(this.prefab);
        }
        if (node != null) {
            this._used.push(node);
        }
        return node;
    }
    restoreAll() {
        for (const node of this._used) {
            this._pool.put(node);
        }
        this._used.length = 0;
    }
}
exports.default = PoolManager;
