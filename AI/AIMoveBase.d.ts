import AIState from "AIState";
export default class AIMoveBase extends AIState {
    pathPoses: any[];
    nextMoveIndex: number;
    curTween: any;
    curDisciple: any;
    GetMoveSpeed(): number;
    LeaveState(): void;
    EndMove(): void;
    constructor(aiBase: any, __id: number);
    MoveLogic(): void;
    SetPath(path: any[]): void;
    GotoState(): void;
    StopMove(): void;
}
