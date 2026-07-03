import AIState from "AIState";
export default class AIMonsterWait extends AIState {
    __ownerMonster: any;
    LeaveState(): void;
    GotoState(): void;
    constructor(aiBase: any, __id: number);
    protected start(): void;
}
