"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameTools_1 = require("GameTools");
const PathFind_1 = require("PathFind");
const { ccclass, property } = cc._decorator;
let PathAreaDiagonal = class PathAreaDiagonal extends cc.Component {
    pointSize = new cc.Size(30, 15);
    mapData = [];
    curCamera = null;
    pointBord = 0;
    curTileMap = null;
    GetPathDDDDDDDDDDDDD(startNode, screenPos, parent = null) {
        const startPos = this.GetPathPointByNode(startNode);
        const localEnd = GameTools_1.default.Screen2CoordPos(screenPos, this.node, this.curCamera);
        const endIdx = this.FuckWxGetPathPointByLocalPosition(localEnd);
        const result = [];
        const path = PathFind_1.default.search(this.mapData, startPos, endIdx);
        const p = parent == null ? startNode.parent : parent;
        if (path) {
            const count = path.length;
            for (let i = 1; i < count - 1; i++) {
                const pt = path[i];
                const local = this.GetLocalPosByIndex(pt.y, pt.x);
                const world = this.node.convertToWorldSpaceAR(local);
                const nodePos = p.convertToNodeSpaceAR(world);
                result.push(nodePos);
            }
            const endPos = GameTools_1.default.ConvertTargetPointToCoor(localEnd, this.node, p);
            result.push(endPos);
        }
        else {
            console.log("寻路没有找到路径 可能没有可走的路径 或者起点终点位置一样了 或者位置不在地图上 这里逻辑是在原地");
            console.log("startPos : ", startPos);
            console.log("endPos : ", endIdx);
            result.push(GameTools_1.default.ConvertTargetToCurLocal(startNode, p));
        }
        return result;
    }
    GetPathPointByStartTilPos(startNode, endIdx, parent = null) {
        const startPos = this.GetPathPointByNode(startNode);
        const result = [];
        const path = PathFind_1.default.search(this.mapData, startPos, endIdx);
        const p = parent == null ? startNode.parent : parent;
        if (path) {
            const count = path.length;
            for (let i = 1; i < count - 1; i++) {
                const pt = path[i];
                const local = this.GetLocalPosByIndex(pt.y, pt.x);
                const world = this.node.convertToWorldSpaceAR(local);
                const nodePos = p.convertToNodeSpaceAR(world);
                result.push(nodePos);
            }
        }
        else {
        }
        const endLocal = this.GetLocalPosByIndex(endIdx.y, endIdx.x);
        const endWorld = GameTools_1.default.ConvertTargetPointToCoor(endLocal, this.node, p);
        result.push(endWorld);
        return result;
    }
    onLoad() {
        this.curTileMap = this.node.getComponentInChildren(cc.TiledMap);
        this.InitArea();
        this.pointBord = (Math.sqrt(5) * this.pointSize.height) / 2;
    }
    GetRandomPath(startNode, parent = null) {
        const rows = this.mapData.length;
        const cols = this.mapData[0].length;
        const valid = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (this.mapData[i][j] != 0)
                    valid.push({ x: i, y: j });
            }
        }
        const len = valid.length;
        if (len > 0) {
            const pick = valid[Math.floor(Math.random() * len)];
            return this.GetPathPointByStartTilPos(startNode, cc.v2(pick.y, pick.x), parent);
        }
        return [GameTools_1.default.ConvertTargetToCurLocal(startNode, parent)];
    }
    GetLocalPosByIndex(row, col) {
        const x = ((col - row) * this.pointSize.width) / 2;
        const y = -((row + col + 1) * this.pointSize.height) / 2;
        return cc.v2(x, y);
    }
    IsPathAtPoint(layer, x, y) {
        let isPath = false;
        try {
            const props = this.curTileMap.getPropertiesForGID(layer.getTileGIDAt(x, y));
            if (props && props.path_bool) {
                isPath = true;
            }
        }
        catch (e) { }
        return isPath;
    }
    GetIsObstacleByPosNode(pos, parent) {
        const local = GameTools_1.default.ConvertTargetPointToCoor(pos, parent, this.node);
        const idx = this.FuckWxGetPathPointByLocalPosition(local);
        if (idx.y >= this.mapData.length || idx.x >= this.mapData[0].length) {
            console.log("该点不在地图上！！！！：", pos, parent);
            return true;
        }
        return this.mapData[idx.y][idx.x] == 0;
    }
    InitArea() {
        const tileMap = this.curTileMap;
        const layer = tileMap.getLayer("path");
        const size = tileMap.getMapSize();
        this.mapData = GameTools_1.default.GetTwoArray(size.height, size.width, 0);
        for (let y = 0; y < size.height; y++) {
            for (let x = 0; x < size.width; x++) {
                if (this.IsPathAtPoint(layer, x, y)) {
                    this.mapData[y][x] = 1;
                }
            }
        }
        tileMap.node.active = false;
    }
    FuckWxGetPathPointByLocalPosition(t) {
        const ratio = this.pointSize.height / this.pointSize.width;
        const nx = t.x;
        const ny = t.y;
        const p1 = new cc.Vec2((ratio * nx - ny) / (2 * ratio), (ny - ratio * nx) / 2);
        if (p1.y > 0)
            return cc.v2(9999999, 9999999);
        const d1 = Math.sqrt(Math.pow(p1.x, 2) + Math.pow(p1.y, 2));
        const p2 = new cc.Vec2((ratio * nx + ny) / (2 * ratio), (ratio * nx + ny) / 2);
        if (p2.y > 0)
            return cc.v2(9999999, 9999999);
        const d2 = Math.sqrt(Math.pow(p2.x, 2) + Math.pow(p2.y, 2));
        let col = d1 / this.pointBord;
        col = col == this.mapData[0].length ? col - 1 : Math.floor(col);
        let row = d2 / this.pointBord;
        row = row == this.mapData.length ? row - 1 : Math.floor(row);
        if (row >= this.mapData.length || col >= this.mapData[0].length)
            return cc.v2(9999999, 9999999);
        return new cc.Vec2(col, row);
    }
    GetPathPointByNode(node) {
        const localPos = GameTools_1.default.ConvertTargetToCurLocal(node, this.node);
        return this.FuckWxGetPathPointByLocalPosition(localPos);
    }
    GetPathPointByStartEndNode(startNode, endNode, parent = null) {
        const startPos = this.GetPathPointByNode(startNode);
        const endPos = this.GetPathPointByNode(endNode);
        const result = [];
        const path = PathFind_1.default.search(this.mapData, startPos, endPos);
        const p = parent == null ? startNode.parent : parent;
        if (path) {
            const count = path.length;
            for (let i = 1; i < count - 1; i++) {
                const pt = path[i];
                const local = this.GetLocalPosByIndex(pt.y, pt.x);
                const world = this.node.convertToWorldSpaceAR(local);
                const nodePos = p.convertToNodeSpaceAR(world);
                result.push(nodePos);
            }
        }
        else {
            console.log("寻路没有找到路径 可能没有可走的路径 有可能是起点终点位置一样了 或者位置不在地图上 这里逻辑是会直接走向目标点");
            console.log("startPos : ", startPos);
            console.log("endPos : ", endPos);
        }
        const finalPos = GameTools_1.default.ConvertTargetToCurLocal(endNode, p);
        result.push(finalPos);
        return result;
    }
};
__decorate([
    property({ type: cc.Camera, displayName: "相机" })
], PathAreaDiagonal.prototype, "curCamera", void 0);
PathAreaDiagonal = __decorate([
    ccclass
], PathAreaDiagonal);
exports.default = PathAreaDiagonal;
