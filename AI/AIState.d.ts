export type IAiStateOwner = any;
export default class AIState {
    __baseState: any;
    __id: number;
    constructor(aiBase: any, id: number);
    GotoState(...args: any[]): void;
    Update(dt?: number): void;
    LeaveState(): void;
}
