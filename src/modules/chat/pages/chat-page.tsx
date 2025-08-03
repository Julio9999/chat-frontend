"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChatBotPage } from "../hooks/use-chat-bot-page";

function ChatPage() {
  const {
    message,
    setMessage,
    messages,
    handleSendMessage,
  } = useChatBotPage();

  return (
    <div className="flex flex-col h-screen  text-white p-4 w-full ">
      <div className="overflow-auto w-full max-h-[80vh]  flex flex-col gap-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-zinc-800 text-white p-2 rounded-md"
          >
            {msg?.message || JSON.stringify(msg)}
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-1 items-center">
        <Input
          className="flex-1 bg-zinc-800 text-white border-zinc-700 focus-visible:ring-zinc-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim() !== "") {
              handleSendMessage()
            }
              
          }}
        />
        <Button
          className="bg-blue-600 hover:bg-blue-500"
          onClick={() =>
            handleSendMessage()
          }
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}

export default ChatPage;
