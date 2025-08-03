import { useEffect, useRef, useState, useCallback } from 'react';

type MessageHandler = (event: MessageEvent) => void;

interface UseWebSocketOptions {
  onMessage?: MessageHandler;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  autoReconnect?: boolean;
  reconnectInterval?: number;
}

export function useWebSocket(
  url: string,
  options: UseWebSocketOptions = {}
) {
  const {
    onMessage,
    onOpen,
    onClose,
    onError,
    autoReconnect = false,
    reconnectInterval = 3000,
  } = options;

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      setIsConnected(true);
      onOpen?.();
    };

    socket.onmessage = (event) => {
      onMessage?.(event);
    };

    socket.onerror = (event) => {
      onError?.(event);
    };

    socket.onclose = () => {
      setIsConnected(false);
      onClose?.();

      if (autoReconnect) {
        reconnectTimeoutRef.current = window.setTimeout(connect, reconnectInterval);
      }
    };
  }, [url, autoReconnect, reconnectInterval, onOpen, onClose, onError, onMessage]);

  useEffect(() => {
    connect();
    return () => {
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = useCallback((data: unknown) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn('No WebSocket connection.');
    }
  }, []);

  return { sendMessage, isConnected };
}
