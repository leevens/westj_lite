import AIState from "AIState";
export default class AIMonsterMove extends AIState {
    __ownerMonster: any;
    LeaveState(): void;
    constructor(aiBase: any, __id: number);
    GotoState(): void;
    Update(dt: number): void;
    ToFight(): void;
    GetTarget(): void;
}
