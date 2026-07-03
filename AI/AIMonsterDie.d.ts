import AIState from "AIState";
export default class AIMonsterDie extends AIState {
    __ownerMonster: any;
    constructor(aiBase: any, __id: number);
    GotoState(): void;
    LeaveState(): void;
    protected start(): void;
}
