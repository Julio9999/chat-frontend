import { useEffect, useRef } from "react";
import { useWebSocket } from "@/hooks/use-web-socket";
import type { ChatMessage } from "@/interfaces/chat/chat-interfaces";
import { getAllMessages, saveMessage } from "@/utils/db";
import { useChatStore } from '../stores/chat-store';

export const useChatBotPage = () => {
  
  const scrollRef = useRef<HTMLDivElement>(null);


  const setMessages = useChatStore(store => store.setMessages);
  const addMessage = useChatStore(store => store.addMessage);
  const clearMessages = useChatStore(store => store.clearMessages);

  const messages = useChatStore(store => store.messages);


  const { sendMessage } = useWebSocket(import.meta.env.VITE_WSS_URL, {
    onMessage: async (e) => {
      const data = JSON.parse(e.data);
      const id = new Date().getTime();
      const newMessage: ChatMessage = {
        id,
        message: data.message,
        timestamp: Date.now(),
      };
      addMessage(newMessage);
      await saveMessage(data);
    },
  });

  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;
    div.scrollTop = div.scrollHeight;
  }, [messages]);

  useEffect(() => {
    getAllMessages().then((msgs) => setMessages(msgs));
  }, []);

  const handleSendMessage = (value: string) => {
    sendMessage({
      event: "send_message",
      payload: {
        userId: 1,
        message: value,
      },
    });
  };

  return {
    messages,
    scrollRef,
    handleSendMessage,
    clearMessages
  };
};
