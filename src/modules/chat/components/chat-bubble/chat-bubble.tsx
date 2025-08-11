import React from "react";
import type { ChatMessage } from "@/interfaces/chat/chat-interfaces";
import { useVisibility } from "@/hooks/use-visibility/use-visibility";

const ChatBubbleComponent = ({ message, timestamp }: ChatMessage) => {
  const date = new Date(timestamp);
  
   const { ref, isVisible } = useVisibility({
    root: null, 
    rootMargin: "100px",
    threshold: 0.1,
  });

  const formattedTime = date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      ref={ref}
      style={{ minHeight: 60 }} // altura reservada para evitar saltos
      className="mb-2"
    >
      {isVisible && (
        <div className="bg-white border-black border text-white p-3 rounded-md ">
          <p className="text-sm text-zinc-800">{message}</p>
          <div className="text-xs text-zinc-400 mt-1">
            {formattedDate} · {formattedTime}
          </div>
        </div>
      )}
    </div>
  );
};

export const ChatBubble = React.memo(
  ChatBubbleComponent,
  (prevProps, nextProps) => prevProps.id === nextProps.id
);