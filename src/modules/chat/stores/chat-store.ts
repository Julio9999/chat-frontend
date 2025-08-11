import type { ChatMessage } from "@/interfaces/chat/chat-interfaces";
import { create, type StateCreator } from "zustand";

interface ChatState {
    messages: ChatMessage[];

    setMessages: (message: ChatMessage[]) => void;
    addMessage: (message: ChatMessage) => void;

    clearMessages: () => void;

}

const StoreApi: StateCreator<ChatState> = (set) => ({
    messages: [],

    setMessages: (messages: ChatMessage[]) => set({ messages }),
    addMessage: (message: ChatMessage) => set((state) => ({messages: [...state.messages, message]})),
    clearMessages: () => set({ messages: [] }),
})

export const useChatStore = create<ChatState>()(StoreApi);