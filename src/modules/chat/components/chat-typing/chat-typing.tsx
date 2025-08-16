import { wsClient } from "@/lib/ws-client";
import { useEffect, useState } from "react"


export const ChatTyping = () => {
    const [isWritting, setIsWritting] = useState(false);

    const handleNewAlert = (e: { writting: boolean }) => {
        const writting = e.writting;
        setIsWritting(() => writting)
    }

    useEffect(() => {
        wsClient.on("on_writting", handleNewAlert);
        return () => {
            wsClient.off("on_writting", handleNewAlert);
        };
    }, []);

    return (
        <>
            {isWritting ?(
                <div className="flex gap-4 items-center justify-content-center">
                    <span>Alguien esta escribiendo algo</span>
                    <div className="flex items-center gap-1 h-4">
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-[bounce_1.4s_infinite]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-[bounce_1.4s_infinite] animation-delay-[0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full animate-[bounce_1.4s_infinite] animation-delay-[0.4s]"></span>
                    </div>
                </div>
            ) : <div className="h-6"></div>}
        </>
    )
}
