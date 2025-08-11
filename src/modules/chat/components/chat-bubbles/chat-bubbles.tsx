import { ChatBubble } from "../chat-bubble/chat-bubble"

import { useChatBubbles } from './use-chat-bubbles';

export const ChatBubbles = () => {

    const {
        messages,
        scrollRef
    } = useChatBubbles();


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