export default class TipGroup extends cc.Component {
    CombatBoost: cc.Prefab;
    static instance: TipGroup | null;
    prev_node: cc.Node;
    txt: cc.Prefab;
    protected onLoad(): void;
    setText(type: number, txt: string): void;
    setFightNum(type: number, num: number): void;
}
