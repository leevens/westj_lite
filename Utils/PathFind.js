"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AStarNode {
    H = 0;
    get F() {
        return this.G + this.H;
    }
    G = 0;
    y = 0;
    x = 0;
    parent = null;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class PathFind {
    static search0(grid, startNode, endNode) {
        let iter = 0;
        const open = [];
        const closed = [];
        const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0], [-1, 1], [1, 1], [1, -1], [-1, -1]];
        open.push(startNode);
        const rows = grid.length;
        const cols = grid[0].length;
        while (open.length > 0 && !(++iter > 1e4)) {
            const lowIdx = this.findLowerFPointIndex(open);
            const cur = open[lowIdx];
            open.splice(lowIdx, 1);
            closed.push(cur);
            for (let d = 0; d < dirs.length; d++) {
                const offset = dirs[d];
                const nx = cur.x + offset[0];
                const ny = cur.y + offset[1];
                if (nx < 0 || nx >= cols || ny < 0 || ny >= rows)
                    continue;
                if (grid[ny][nx] == 0)
                    continue;
                if (closed.some(p => nx == p.x && ny == p.y))
                    continue;
                let existIdx = -1;
                const inOpen = open.some((p, i) => {
                    if (nx == p.x && ny == p.y) {
                        existIdx = i;
                        return true;
                    }
                    return false;
                });
                if (inOpen) {
                    const diag = Math.abs(offset[0]) == 1 && Math.abs(offset[1]) == 1;
                    const g = diag ? cur.G + 1.41 * grid[ny][nx] : cur.G + grid[ny][nx];
                    if (g < open[existIdx].G) {
                        open[existIdx].G = g;
                        open[existIdx].parent = cur;
                    }
                }
                else {
                    const next = new AStarNode(nx, ny);
                    next.parent = cur;
                    const diag = Math.abs(offset[0]) == 1 && Math.abs(offset[1]) == 1;
                    next.G = diag ? cur.G + 1.41 * grid[ny][nx] : cur.G + grid[ny][nx];
                    next.H = Math.abs(nx - endNode.x) + Math.abs(ny - endNode.y);
                    open.push(next);
                    if (nx == endNode.x && ny == endNode.y) {
                        return this.findPath(next);
                    }
                }
            }
        }
        return undefined;
    }
    static search(grid, start, end) {
        return this.search0(grid, new AStarNode(start.x, start.y), new AStarNode(end.x, end.y));
    }
    static findPath(tail) {
        const out = [];
        let cur = tail;
        do {
            out.push(cc.v2(cur.x, cur.y));
            cur = cur.parent;
        } while (cur != null);
        return out.reverse();
    }
    static findLowerFPointIndex(list) {
        let minF = 0;
        let minIdx = 0;
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            if (p.F < minF || minF == 0) {
                minF = p.F;
                minIdx = i;
            }
        }
        return minIdx;
    }
    static test() {
        const start = new cc.Vec2(1, 1);
        const end = new cc.Vec2(1, 23);
        const grid = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 0, 0],
            [0, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 1, 9, 9, 0],
            [0, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 1, 1, 1, 1, 1, 9, 9, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 0, 0, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 0, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 0, 9, 9, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 1, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 0, 9, 0, 9, 9, 0, 9, 9, 9, 9, 9, 9, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 0, 9, 9, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0],
            [0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 9, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        const path = PathFind.search(grid, start, end);
        if (path)
            console.log("path !!!!:", path);
    }
}
exports.default = PathFind;
