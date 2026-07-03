interface IGameMessage {
    type: string | number;
    [key: string]: any;
}
interface IGameObserver {
    notify(msg: IGameMessage): boolean;
}
export default class GameManager {
    static observers: IGameObserver[];
    curpannel: any;
    static sendMessage(msg: IGameMessage): void;
    static sendSimpleMessage(type: string | number): void;
    static registObserver(observer: IGameObserver): void;
}
export {};
