export default class PathAreaDiagonal extends cc.Component {
    pointSize: cc.Size;
    mapData: number[][];
    curCamera: cc.Camera | null;
    pointBord: number;
    curTileMap: cc.TiledMap | null;
    GetPathDDDDDDDDDDDDD(startNode: cc.Node, screenPos: cc.Vec2, parent?: cc.Node | null): cc.Vec2[];
    GetPathPointByStartTilPos(startNode: cc.Node, endIdx: cc.Vec2, parent?: cc.Node | null): cc.Vec2[];
    protected onLoad(): void;
    GetRandomPath(startNode: cc.Node, parent?: cc.Node | null): cc.Vec2[];
    GetLocalPosByIndex(row: number, col: number): cc.Vec2;
    IsPathAtPoint(layer: any, x: number, y: number): boolean;
    GetIsObstacleByPosNode(pos: cc.Vec2, parent: cc.Node): boolean;
    InitArea(): void;
    FuckWxGetPathPointByLocalPosition(t: cc.Vec2): cc.Vec2;
    GetPathPointByNode(node: cc.Node): cc.Vec2;
    GetPathPointByStartEndNode(startNode: cc.Node, endNode: cc.Node, parent?: cc.Node | null): cc.Vec2[];
}
