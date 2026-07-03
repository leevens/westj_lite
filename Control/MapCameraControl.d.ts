export default class MapCameraControl extends cc.Component {
    limitArea: any;
    renderWidth: any;
    zoomSpeed: any;
    moveSpeed: any;
    maxRatio: any;
    renderHeight: any;
    curCamera: any;
    moveNode: any;
    chess: any;
    onDestroy(): void;
    OnTouchCancel(): void;
    onLoad(): void;
    SetPosition(t: any): void;
    GetMoveSpeed(): number;
    MoveCamera(t: any, e: any): void;
    LimitCamera(): void;
    OnTouchStart(): void;
    start(): void;
    OnChessEnd(): void;
    OnTouchEnd(): void;
    SetRatio(t: any): void;
    OnRoleMove(t: any): void;
    GetRatio(): any;
    OnMouseWheel(t: any): void;
    OnTouchMove(t: any): void;
    update(): void;
}
