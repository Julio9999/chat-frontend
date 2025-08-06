import { useWebSocket } from "@/hooks/use-web-socket";
import type { ChatMessage } from "@/interfaces/chat/chat-interfaces";
import { getAllMessages, saveMessage } from "@/utils/db";
import { useEffect, useState } from "react";

export const useChatBotPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { sendMessage } = useWebSocket(import.meta.env.VITE_WSS_URL, {
    onMessage: async (e) => {
      const data = JSON.parse(e.data);
      const id = new Date().getTime();
      const newMessage: ChatMessage = {
        id,
        message: data.message,
        timestamp: Date.now(),
      };
      setMessages((current) => [...current, newMessage]);
      await saveMessage(data);
    },
  });

  useEffect(() => {
    getAllMessages().then((msgs) => setMessages(msgs));
  }, []);

  const handleSendMessage = () => {
    sendMessage({
      event: "send_message",
      payload: {
        userId: 1,
        message: message,
      },
    });
    setMessage("")
  };

  return {
    message,
    setMessage,
    messages,
    handleSendMessage,
    clearMessages: () => setMessages([]),
  };
};
