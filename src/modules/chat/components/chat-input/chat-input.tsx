import { ButtonPrimary } from "@/components/common/button-primary";
import { Input } from "@/components/ui/input";
import { wsClient } from "@/lib/ws-client";
import React from "react";
import { useState } from "react";

const handleSendMessage = (value: string) => {
    wsClient.sendMessage(
        "send_message",
        {
            message: value,
        },
    );
};

const handleWriting = (isWriting: boolean) => {
    wsClient.sendMessage("on_writting", {
        writting: isWriting,
    });
};


const ChatInputComponent = () => {

    const [message, setMessage] = useState("");


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
                onFocus={() => handleWriting(true)}
                onBlur={() => handleWriting(false)}
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