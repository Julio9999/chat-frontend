import { useEffect, useRef } from "react";
import { useChatStore } from "../../stores/chat-store";
import { ChatBubble } from "../chat-bubble/chat-bubble"

export const ChatBubbles = () => {

    const messages = useChatStore(store => store.messages);

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const div = scrollRef.current;
        if (!div) return;
        div.scrollTop = div.scrollHeight;
    }, [messages]);

    return (
        <div
            className="overflow-auto w-full max-h-[80vh]  flex flex-col gap-2 pr-2"
            ref={scrollRef}
        >
            {messages.map((msg) => (
                <ChatBubble {...msg} key={msg.id} />
            ))}
        </div>
    )

}