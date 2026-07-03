export default class UIManager extends cc.Component {
    panelStack: any[];

    FightContent: cc.Node;
    internum: number;
    bannerNode: cc.Node;
    static Instance: UIManager | null;
    panelRoot: cc.Node;
    GetPanelByType(name: string): any;
    showMsgBox(msg: string): Promise<any>;
    HideUI(name: string): any;

    AddPanelStack(panel: any): void;
    ShowInter(): void;
    Check(name: string): any;

    ShowUI(name: string): Promise<any>;


    OnTouchMove(): void;
    GetClass(name: string): any;
    protected onLoad(): void;
}
