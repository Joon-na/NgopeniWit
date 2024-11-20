import React, { useState } from "react";
import {
  ArrowRight,
  X,
  Send,
  Loader2,
  Sprout,
} from "lucide-react";
import { fetchAIResponse } from "../services/fetchAIResponse";

export default function AIChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const aiResponse = await fetchAIResponse(input); // Panggil fungsi dari service
      const aiMessage = {
        role: "ai",
        content: aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        role: "ai",
        content: "Maaf, saya mengalami kesalahan. Silakan coba lagi.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bottom-6 right-6 bg-[#318161] text-white py-3 px-6 rounded-full shadow-lg hover:bg-[#265a4a] transition-all duration-300 flex items-center gap-4 group"
        style={{
          minWidth: "300px",
          maxWidth: "400px",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Sprout size={24} />
          </div>
          <div className="text-left">
            <p className="text-sm font-light">
              Butuh bantuan tentang budidaya?
            </p>
            <p className="font-semibold">Tanyakan di sini!</p>
          </div>
        </div>
        <ArrowRight className="ml-auto transform group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Chat Overlay */}
      {isOpen && (
        <div className="fixed z-50 bottom-24 right-6 w-96 h-[440px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
          <div className="bg-gradient-to-r from-[#318161] to-[#265a4a] text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Asisten AI
                </h2>
                <p className="text-sm opacity-80 mt-1">
                  Siap membantu budidaya tanaman Anda!
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center flex flex-col justify-center items-center text-gray-600 mt-8">
                <div className="w-40">
                  <img src="/images/logo.svg" alt="logo" />
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <p className="font-medium">Kami siap membantu Anda dengan:</p>
                  <ul className="space-y-1 text-left max-w-[250px] mx-auto">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#318161]" />
                      Tips perawatan tanaman
                    </li>
                    <li className="flex items-center gap- 2">
                      <div className="w-2 h-2 rounded-full bg-[#318161]" />
                      Solusi masalah tanaman
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#318161]" />
                      Jadwal perawatan
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#318161]" />
                      Rekomendasi tanaman
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-2xl max-w-[80%] ${
                    message.role === "user"
                      ? "bg-[#318161] text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                  }`}
                >
                  {message.content} {/* This will now be plain text without markdown */}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan Anda di sini..."
                className="flex-1 p-3 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#318161]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-3 bg-[#318161] text-white rounded-full hover:bg-[#265a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}