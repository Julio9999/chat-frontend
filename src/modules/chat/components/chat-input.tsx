import { ButtonPrimary } from "@/components/common/button-primary";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
    onClick: (value: string) => void;
}

export const ChatInput = ({onClick}: Props) => {

    const [message, setMessage] = useState("");

    return (
        <>
            <Input
                className="flex-1 bg-white  border-zinc-700 focus-visible:ring-zinc-500"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim() !== "") {
                        onClick(message)
                        setMessage("")
                    }
                }}
            />
            <ButtonPrimary
                onClick={() => {
                    onClick(message)
                    setMessage("")
                }}
            >
                Enviar
            </ButtonPrimary>
        </>
    )
}
