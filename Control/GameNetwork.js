"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventConst_1 = require("EventConst");
let GAME_SERVER_URL = 'ws://westj.the9.fun/ws/game';
class GameNetwork {
    static instance = new GameNetwork();
    pendingRequests = new Map();
    reconnectInvite = '';
    reconnectTimer = null;
    onMessage = null;
    ws = null;
    reconnectPlayerId = '';
    heartbeatTimer = null;
    reconnectToken = '';
    seq = 0;
    disconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameNetwork();
        }
        return this.instance;
    }
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            this.send({
                type: 'h',
                data: {}
            });
        }, 30000);
    }
    setPlayerData(name, value) {
        this.send({
            type: 'w',
            data: {
                name,
                value
            }
        });
    }
    request(message, timeout = 5000) {
        return new Promise((resolve, reject) => {
            if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
                reject(new Error('WebSocket未连接'));
                return;
            }
            const seq = ++this.seq;
            message.seq = seq;
            const timeoutTimer = setTimeout(() => {
                this.pendingRequests.delete(seq);
                reject();
            }, timeout);
            this.pendingRequests.set(seq, (response) => {
                clearTimeout(timeoutTimer);
                resolve(response);
            });
            this.ws.send(JSON.stringify(message));
        });
    }
    send(message) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            message.seq = ++this.seq;
            this.ws.send(JSON.stringify(message));
        }
    }
    logEvent(_args) {
        this.send({ type: 'event', data: _args });
    }
    async requestAdUnit(type, platform) {
        return this.request({
            type: 'ad',
            data: {
                type,
                platform,
            }
        });
    }
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }
    constructor() {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            GAME_SERVER_URL = GAME_SERVER_URL.replace("ws://", "wss://");
        }
    }
    scheduleReconnect() {
        if (this.reconnectTimer)
            return;
        console.log('3秒后尝试重连...');
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            if (this.reconnectPlayerId && this.reconnectToken) {
                this.connect(this.reconnectPlayerId, this.reconnectToken, this.reconnectInvite);
            }
        }, 3000);
    }
    addPlayerData(name, value) {
        this.send({
            type: 'a',
            data: {
                name,
                value
            }
        });
    }
    connect(playerId, token, invite) {
        this.reconnectPlayerId = playerId;
        this.reconnectToken = token;
        this.reconnectInvite = invite;
        return new Promise((resolve) => {
            this.ws = new WebSocket(GAME_SERVER_URL);
            this.ws.onopen = () => {
                this.send({
                    type: 'login',
                    data: { playerId, token, invite }
                });
            };
            this.ws.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.seq && this.pendingRequests.has(message.seq)) {
                    const resolve2 = this.pendingRequests.get(message.seq);
                    this.pendingRequests.delete(message.seq);
                    resolve2(message);
                    return;
                }
                if (message.type === 'login_success') {
                    this.startHeartbeat();
                    cc.systemEvent.emit(EventConst_1.EventConst.NETWORK_STATUS_CHANGE, true);
                    resolve(true);
                }
                else if (message.type === 'login_fail') {
                    console.error('登录失败:', message);
                    resolve(false);
                }
                else {
                    if (this.onMessage)
                        this.onMessage(message);
                    if (!message.seq) {
                        cc.systemEvent.emit(message.type, message);
                    }
                }
            };
            this.ws.onclose = (code) => {
                console.log('连接断开', code);
                this.stopHeartbeat();
                if (code.code == 3001) {
                    console.log("保存的token无效了");
                    localStorage.removeItem("westj_login");
                }
                else if (code.code < 2000) {
                    this.scheduleReconnect();
                }
                cc.systemEvent.emit(EventConst_1.EventConst.NETWORK_STATUS_CHANGE, false, code);
            };
            this.ws.onerror = (error) => {
                console.error('WebSocket错误:', error);
                resolve(false);
            };
        });
    }
    async requestPlayerData() {
        return this.request({
            type: 'r',
            data: {}
        });
    }
    retryConnect() {
        if (this.reconnectPlayerId && this.reconnectToken) {
            this.connect(this.reconnectPlayerId, this.reconnectToken, this.reconnectInvite);
        }
    }
}
exports.default = GameNetwork;
