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

    const handleMessage = useCallback(async (e: MessageEvent) => {
        const data = JSON.parse(e.data);
        const id = new Date().getTime();
        const newMessage: ChatMessage = {
            id,
            message: data.message,
            timestamp: Date.now(),
        };
        addMessage(newMessage);
        await IndexedDBClient.saveMessage(data);
    }, [addMessage])

    useEffect(() => {
        const div = scrollRef.current;
        if (!div) return;
        div.scrollTop = div.scrollHeight;
    }, [messages]);

    useEffect(() => {
        wsClient.addListener(handleMessage);
        return () => {
            wsClient.removeListener(handleMessage);
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