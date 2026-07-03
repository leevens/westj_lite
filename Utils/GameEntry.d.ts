export default class GameEntry extends cc.Component {
    singleTons: string[];
    static curAllSignleBases: any[];
    InitSingleTon(): Promise<void>;
    start(): Promise<void>;
    StartGame(): Promise<void>;
    PlayGame(): Promise<void>;
    RegistSingleTon(): void;
}
