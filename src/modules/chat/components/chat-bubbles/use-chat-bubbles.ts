import { useCallback, useEffect, useRef } from "react";
import { useChatStore } from "../../stores/chat-store";
import { IndexedDBClient } from "@/utils/db";
import useFetch from "@/hooks/use-fetch/use-fetch";
import type { ChatMessage } from "@/interfaces/chat/chat-interfaces";
import { wsClient } from "@/lib/ws-client";

export const useChatBubbles = () => {
    const setMessages = useChatStore(store => store.setMessages);
    const addMessage = useChatStore(store => store.addMessage);

    const messages = useChatStore(store => store.messages);

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleMessage = useCallback(async (message: string) => {
        const id = new Date().getTime();
        const newMessage: ChatMessage = {
            id,
            message,
            timestamp: Date.now(),
        };
        addMessage(newMessage);
        await IndexedDBClient.saveMessage(newMessage);
    }, [addMessage])

    useEffect(() => {
        const div = scrollRef.current;
        if (!div) return;
        div.scrollTop = div.scrollHeight;
    }, [messages]);

    useEffect(() => {
        wsClient.on("on_new_message", handleMessage);
        return () => {
            wsClient.off("on_new_message",handleMessage);
        };
    }, [handleMessage]);

    useFetch({
        fetcher: () => IndexedDBClient.getAllMessages(),
        onSuccess: (data) => {
            setMessages(data);
        },
    })

    return {
        scrollRef,
        messages,
    }
}