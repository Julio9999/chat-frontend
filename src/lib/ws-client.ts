type EventName = string;
type EventHandler = (payload: unknown) => void;

export class WSClient {
  private socket: WebSocket | null = null;
  private url: string = "";
  private userId: number | null = null;

  private eventListeners: Map<EventName, Set<EventHandler>> = new Map();

  private reconnectTimeout: number = 3000;
  private shouldReconnect: boolean = true;
  private reconnectTimer?: ReturnType<typeof setTimeout>;

  connect(url: string, userId: number) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;
    this.userId = userId;
    this.url = url;
    this.shouldReconnect = true;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("[WSClient] Conectado");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const eventName = data.event as EventName;
      const payload = data.payload;

      const handlers = this.eventListeners.get(eventName);
      if (handlers) {
        handlers.forEach((cb) => cb(payload));
      }
    };

    this.socket.onerror = (event) => {
      if (
        this.socket.readyState !== WebSocket.CLOSING &&
        this.socket.readyState !== WebSocket.CLOSED
      ) {
        console.error("[WSClient] Error", event);
      }
    };
    this.socket.onclose = () => {
      console.log("[WSClient] Cerrado");
      if (this.shouldReconnect) {
        this.reconnectTimer = setTimeout(() => {
          console.log("[WSClient] Reintentando conexión...");
          this.connect(this.url, this.userId);
        }, this.reconnectTimeout);
      }
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.socket?.close();
  }

  sendMessage(event: EventName, payload: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ event, payload, userId: this.userId }));
    } else {
      console.warn("[WSClient] Socket no está abierto, mensaje no enviado", {
        event,
        payload,
      });
    }
  }

  on(event: EventName, cb: EventHandler) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(cb);
  }

  off(event: EventName, cb: EventHandler) {
    this.eventListeners.get(event)?.delete(cb);
  }
}

export const wsClient = new WSClient();
