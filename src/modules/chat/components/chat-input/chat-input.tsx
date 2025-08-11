import { ButtonPrimary } from "@/components/common/button-primary";
import { Input } from "@/components/ui/input";
import { wsClient } from "@/lib/ws-client";
import React from "react";
import { useState } from "react";


const ChatInputComponent = () => {

    const [message, setMessage] = useState("");

    const handleSendMessage = (value: string) => {
        wsClient.sendMessage({
            event: "send_message",
            payload: {
                userId: 1,
                message: value,
            },
        });
    };

    console.log("ChatInputComponent rendered");

    return (
        <>
            <Input
                className="flex-1 bg-white  border-zinc-700 focus-visible:ring-zinc-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim() !== "") {
                        handleSendMessage(message)
                        setMessage("")
                    }
                }}
            />
            <ButtonPrimary
                onClick={() => {
                    handleSendMessage(message)
                    setMessage("")
                }}
            >
                Enviar
            </ButtonPrimary>
        </>
    )
}

export const ChatInput = React.memo(ChatInputComponent);