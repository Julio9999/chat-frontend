type MessageHandler = (event: MessageEvent) => void;
type OpenHandler = () => void;
type CloseHandler = (event: CloseEvent) => void;
type ErrorHandler = (event: Event) => void;

export class WSClient {

  private socket: WebSocket | null = null;
  private url: string = "";
  private listeners: Set<MessageHandler> = new Set();
  private openListeners: Set<OpenHandler> = new Set();
  private closeListeners: Set<CloseHandler> = new Set();
  private errorListeners: Set<ErrorHandler> = new Set();

  private reconnectTimeout: number = 3000; // ms
  private shouldReconnect: boolean = true;
  private reconnectTimer?: ReturnType<typeof setTimeout>;

  connect(url: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

    this.url = url;
    this.shouldReconnect = true;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.openListeners.forEach((cb) => cb());
      console.log("[WSClient] Conectado");
    };

    this.socket.onmessage = (event) => {
      this.listeners.forEach((cb) => cb(event));
    };

    this.socket.onerror = (event) => {
      this.errorListeners.forEach((cb) => cb(event));
      console.error("[WSClient] Error", event);
    };

    this.socket.onclose = (event) => {
      this.closeListeners.forEach((cb) => cb(event));
      console.log("[WSClient] Cerrado", event);

      if (this.shouldReconnect) {
        this.reconnectTimer = setTimeout(() => {
          console.log("[WSClient] Reintentando conexión...");
          this.connect(this.url);
        }, this.reconnectTimeout);
      }
    };
  }

  disconnect() {
    this.shouldReconnect = false;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.socket?.close();
  }

  sendMessage(msg: unknown) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    } else {
      console.warn(
        "[WSClient] Socket no está abierto, mensaje no enviado:",
        msg
      );
    }
  }

  addListener(cb: MessageHandler) {
    this.listeners.add(cb);
  }

  removeListener(cb: MessageHandler) {
    this.listeners.delete(cb);
  }

  addOpenListener(cb: OpenHandler) {
    this.openListeners.add(cb);
  }

  removeOpenListener(cb: OpenHandler) {
    this.openListeners.delete(cb);
  }

  addCloseListener(cb: CloseHandler) {
    this.closeListeners.add(cb);
  }

  removeCloseListener(cb: CloseHandler) {
    this.closeListeners.delete(cb);
  }

  addErrorListener(cb: ErrorHandler) {
    this.errorListeners.add(cb);
  }

  removeErrorListener(cb: ErrorHandler) {
    this.errorListeners.delete(cb);
  }
}

export const wsClient = new WSClient();
