import AIState from "AIState";
export default class AIMonsterIdle extends AIState {
    __ownerMonster: any;
    constructor(aiBase: any, __id: number);
    Update(): void;
    GotoState(): void;
    LeaveState(): void;
}
