interface ChatMessagesProps {
  mensajes: { sender: string; content: string; timestamp: string }[];
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({ mensajes, bottomRef }: ChatMessagesProps) {
  return (
    <div className="flex flex-col space-y-2">
      {mensajes.map((msg, idx) => (
        <div
          key={idx}
          className={`max-w-xs p-3 rounded-lg ${
            msg.sender === "paciente" ? "bg-green-200 self-end" : "bg-gray-300 self-start"
          }`}
        >
          <p className="text-sm">{msg.content}</p>
          <p className="text-[10px] text-gray-600 text-right">{msg.timestamp}</p>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
