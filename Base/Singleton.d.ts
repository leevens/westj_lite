export default class Singleton {
    static rootNode: cc.Node | null;
    static GetManagerRoot(): cc.Node;
    static RegistSingleTon<T extends cc.Component>(compClass: {
        new (): T;
    } | string): T | undefined;
}
