"use client";
import { useChatBotPage } from "../hooks/use-chat-bot-page";
import { ChatInput } from "../components/chat-input/chat-input";
import { ChatBubbles } from "../components/chat-bubbles/chat-bubbles";

function ChatPage() {
  const {
    handleSendMessage,
  } = useChatBotPage();

  return (
    <div className="flex flex-col h-screen   p-4 w-full ">
      <ChatBubbles />

      <div className="flex gap-2 flex-1 items-center">
        <ChatInput onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
