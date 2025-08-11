import { ChatInput } from "../components/chat-input/chat-input";
import { ChatBubbles } from "../components/chat-bubbles/chat-bubbles";

function ChatPage() {


  return (
    <div className="flex flex-col h-screen   p-4 w-full ">
      <ChatBubbles />

      <div className="flex gap-2 flex-1 items-center">
        <ChatInput  />
      </div>
    </div>
  );
}

export default ChatPage;
