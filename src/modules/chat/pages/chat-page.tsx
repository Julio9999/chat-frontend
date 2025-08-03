import { useEffect, useState } from "react";
import { useWebSocket } from "@/hooks/use-web-socket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllMessages, saveMessage } from "@/utils/db";

function ChatPage() {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ message: string, id: number }[]>([]);

  const {
    sendMessage,
  } = useWebSocket('ws://localhost:3000/ws', {
    onMessage: async (e) => {
      const data = JSON.parse(e.data);
      const id = new Date().getTime(); // Generate a unique ID based on timestamp
      setMessages(current => [...current, { message: data.message, id }]);
      await saveMessage(data);
    }
  })

  useEffect(() => {
    getAllMessages().then(messages => {
      const messagesFromDb = messages?.map(item => ({ message: item.message, id: item.id }))
      setMessages(messagesFromDb)
    })
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex-1 overflow-auto space-y-2 mb-4">
        {messages.map((msg) => (
          <div className="bg-gray-100 p-2 rounded" key={msg.id}>
            {msg?.message || JSON.stringify(msg)}
          </div>
        ))}
      </div>

      <Input value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={() =>
        sendMessage({
          "event": "send_message",
          "payload": {
            "userId": 1,
            "message": message
          }
        })}>
        Send Ping
      </Button>
    </div>
  )
}

export default ChatPage;
