import AIState from "AIState";
export default class AIBase extends cc.Component {
    aiStates: AIState[];
    __state_id: number;
    AddAiState(state: AIState): void;
    SwitchState(id: number): void;
    protected update(dt: number): void;
    GetMonster(): any;
    GetTeamer(): any;
    GetAiStateById(id: number): AIState;
    GetSkill(): any;
}
