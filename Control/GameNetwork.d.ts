export interface GameMessage {
    type: string;
    data: any;
    seq?: number;
}
export default class GameNetwork {
    private static instance;
    private pendingRequests;
    private reconnectInvite;
    private reconnectTimer;
    onMessage: ((message: GameMessage) => void) | null;
    private ws;
    private reconnectPlayerId;
    private heartbeatTimer;
    private reconnectToken;
    private seq;
    disconnect(): void;
    static getInstance(): GameNetwork;
    private startHeartbeat;
    setPlayerData(name: string, value: any): void;
    request(message: GameMessage, timeout?: number): Promise<GameMessage>;
    send(message: GameMessage): void;
    logEvent(_args: any[]): void;
    requestAdUnit(type: string, platform: string): Promise<any>;
    private stopHeartbeat;
    private constructor();
    private scheduleReconnect;
    addPlayerData(name: string, value: any): void;
    connect(playerId: string, token: string, invite: string): Promise<boolean>;
    requestPlayerData(): Promise<any>;
    retryConnect(): void;
}
