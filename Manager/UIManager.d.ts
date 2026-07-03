export default class UIManager extends cc.Component {
    panelStack: any[];
    UseGoldEffectContentSkeleton: sp.Skeleton;
    FightContent: cc.Node;
    internum: number;
    bannerNode: cc.Node;
    static Instance: UIManager | null;
    UseGoldEffectContent: cc.Node;
    panelRoot: cc.Node;
    GetPanelByType(name: string): any;
    showMsgBox(msg: string): Promise<any>;
    HideUI(name: string): any;
    ChangeCoin(n: number): void;
    ChangeGold(n: number): void;
    AddPanelStack(panel: any): void;
    ShowInter(): void;
    Check(name: string): any;
    showUseGoldEffect(): Promise<void>;
    AddCoin(n: number): void;
    ShowUI(name: string): Promise<any>;
    ChangeJewel(n: number): void;
    GetJewel(n: number): void;
    OnTouchMove(): void;
    GetClass(name: string): any;
    protected onLoad(): void;
}
