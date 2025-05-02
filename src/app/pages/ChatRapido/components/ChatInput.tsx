interface ChatInputProps {
  preguntas: { pregunta: string; respuesta: string }[];
  onPreguntaSeleccionada: (pregunta: string, respuesta: string) => void;
}

export default function ChatInput({ preguntas, onPreguntaSeleccionada }: ChatInputProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {preguntas.map((item, index) => (
        <button
          key={index}
          onClick={() => onPreguntaSeleccionada(item.pregunta, item.respuesta)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg transition"
        >
          {item.pregunta}
        </button>
      ))}
    </div>
  );
}
