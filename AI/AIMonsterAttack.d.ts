import AIState from "AIState";
export default class AIMonsterDefault extends AIState {
    __ownerMonster: any;
    isover: boolean;
    time: number;
    state: number;
    DoAttackXXWX(): void;
    LeaveState(): void;
    Update(dt: number): void;
    initialAttack(): void;
    GotoState(): void;
    constructor(aiBase: any, __id: number);
    DoAttack(): void;
}
