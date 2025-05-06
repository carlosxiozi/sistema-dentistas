interface ChatInputProps {
  preguntas: { pregunta: string; respuesta: string }[];
  onPreguntaSeleccionada: (pregunta: string, respuesta: string) => void;
}

export default function ChatInput({ preguntas, onPreguntaSeleccionada }: ChatInputProps) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value);
    if (!isNaN(index)) {
      const item = preguntas[index];
      onPreguntaSeleccionada(item.pregunta, item.respuesta);
    }
  };

  return (
    <div>
      <select
        onChange={handleSelectChange}
        className="block md:hidden w-full bg-white dark:bg-gray-700 text-black dark:text-white border rounded p-2"
        defaultValue=""
      >
        <option value="" disabled>
          Selecciona una pregunta frecuente
        </option>
        {preguntas.map((item, index) => (
          <option key={index} value={index}>
            {item.pregunta}
          </option>
        ))}
      </select>

      {/* BOTONES SOLO EN DESKTOP */}
      <div
        className="
          hidden md:flex 
          flex-wrap 
          gap-2 
        "
      >
        {preguntas.map((item, index) => (
          <button
            key={index}
            onClick={() => onPreguntaSeleccionada(item.pregunta, item.respuesta)}
            className="
              bg-blue-500 hover:bg-blue-600 text-white 
              text-sm 
              px-3 py-2 
              rounded-lg 
              transition
            "
          >
            {item.pregunta}
          </button>
        ))}
      </div>
    </div>
  );
}
