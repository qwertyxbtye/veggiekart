import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../AppContext/Appcontext";

export const VeggieChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Tell me a dish and I'll list the veggies you need for it!",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);
  const { products } = useContext(AppContext);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    const dish = input.trim();
    if (!dish || isTyping) return;

    setMessages((prev) => [...prev, { type: "user", text: dish }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/chatbot/getvegetables",
        { dish },
        { withCredentials: true },
      );

      const { vegetables, note } = response.data;

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: note,
          vegetables,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I couldn't figure that one out. Try another dish?",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      {/* Floating toggle button */}
      <div className="fixed bottom-15 right-20 z-50 flex items-end gap-3">
        {/* Hint bubble — only shows when chat is closed */}
        {!isOpen && (
          <div className="relative bg-white border border-[#E5E3DB] rounded-xl px-3.5 py-2.5 shadow-md max-w-[180px] animate-bounce-slow">
            <p className="text-xs text-[#1A1A18] font-medium leading-snug">
              Confused what to buy? Ask our chatbot! 🥦
            </p>
            {/* little triangle pointer toward the button */}
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-[#E5E3DB] rotate-45"></div>
          </div>
        )}

        <div className="relative flex-shrink-0">
          {/* Pulsing ring — only shows when chat is closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#22392C] animate-ping opacity-40"></span>
          )}

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative w-14 h-14 rounded-full bg-[#22392C] hover:bg-[#2E4A38] text-white shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-105"
          >
            {isOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2c-1.8 0-2.8 1.2-3 3 1.8 0 3-1.2 3-3z"
                  fill="#8FBF6B"
                />
                <path
                  d="M12 2c1.8 0 2.8 1.2 3 3-1.8 0-3-1.2-3-3z"
                  fill="#7FB741"
                />
                <line
                  x1="12"
                  y1="5"
                  x2="12"
                  y2="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <rect
                  x="4"
                  y="7"
                  width="16"
                  height="13"
                  rx="4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                />
                <circle cx="9" cy="13.5" r="1.4" fill="currentColor" />
                <circle cx="15" cy="13.5" r="1.4" fill="currentColor" />
                <path
                  d="M9 16.5c.8.7 1.9 1 3 1s2.2-.3 3-1"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="none"
                />
                <line
                  x1="4"
                  y1="11"
                  x2="2"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <line
                  x1="20"
                  y1="11"
                  x2="22"
                  y2="11"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[340px] h-[460px] bg-white rounded-2xl border border-[#E5E3DB] shadow-xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-[#22392C] px-4 py-3.5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F0EAD8] flex items-center justify-center flex-shrink-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22392C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Veggie Assistant</p>
              <p className="text-[10px] text-[#F0EAD8]/70">
                Tell me what you're cooking
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAFAF8]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${
                    msg.type === "user"
                      ? "bg-[#22392C] text-white rounded-br-sm"
                      : "bg-white border border-[#E5E3DB] text-[#1A1A18] rounded-bl-sm"
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.vegetables && msg.vegetables.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.vegetables.map((veg, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#EDF5E7] text-[#22392C] px-2.5 py-1 rounded-full font-medium"
                        >
                          {veg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E5E3DB] rounded-xl rounded-bl-sm px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A988F] animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A988F] animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9A988F] animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[#E5E3DB] p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Vegetable biryani"
              className="flex-1 outline-none text-sm px-3 py-2 rounded-lg border border-[#E5E3DB] focus:border-[#22392C] transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-9 h-9 rounded-lg bg-[#22392C] hover:bg-[#2E4A38] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
