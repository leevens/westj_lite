export default class UIBase extends cc.Component {
    mask: cc.Node;
    foreMask: cc.Node;
    openAnimHandler: (() => void) | null;
    closeAnimHandler: (() => void) | null;
    isScaleAnim: boolean;
    isAnim: boolean;
    animRoot: cc.Node;
    isdestoy: boolean;
    CloseWithScaleAnim(): void;
    OpenWithScaleAnim(): void;
    protected onEnable(): void;
    Destroy(): void;
    CloseThis(): void;
}
