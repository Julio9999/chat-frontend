interface Props {
  msg: string;
  timestamp: number;
}

export const ChatBubble = ({ msg, timestamp }: Props) => {
  const date = new Date(timestamp);

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
    <div className="bg-zinc-800 text-white p-3 rounded-md max-w-md">
      <p className="text-sm">{msg}</p>
      <div className="text-xs text-zinc-400 mt-1">
        {formattedDate} · {formattedTime}
      </div>
    </div>
  );
};
