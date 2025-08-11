"use client";
import { useChatBotPage } from "../hooks/use-chat-bot-page";
import { ChatBubble } from "../components/chat-bubble";
import { ChatInput } from "../components/chat-input";

function ChatPage() {
  const {
    messages,
    scrollRef,
    handleSendMessage,
  } = useChatBotPage();

  return (
    <div className="flex flex-col h-screen   p-4 w-full ">
      <div className="overflow-auto w-full max-h-[80vh]  flex flex-col gap-2 pr-2" ref={scrollRef}>
        {messages.map((msg) => (
          <ChatBubble {...msg} key={msg.id} />
        ))}
      </div>

      <div className="flex gap-2 flex-1 items-center">
        <ChatInput onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatPage;
