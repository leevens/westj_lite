import AIState from "AIState";
export default class AIMonsterSkill extends AIState {
    maxtime: number;
    time: number;
    __ownerMonster: any;
    constructor(aiBase: any, __id: number);
    GotoState(): void;
    Update(dt: number): void;
    LeaveState(): void;
}
