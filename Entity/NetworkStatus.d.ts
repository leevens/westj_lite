export declare class NetworkStatus extends cc.Component {
    msgNode: cc.Label;
    retryNode: cc.Node;
    loadingNode: cc.Node;
    start(): void;
    onDestroy(): void;
    RetryConnect(target: any): Promise<void>;
    networkStatusChange(status: boolean, code: any): void;
}
