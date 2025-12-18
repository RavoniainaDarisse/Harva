import React, { useState, useRef, useEffect } from 'react';
import { Send, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatBot = ({
  initialMessage = "Bienvenue",
  title = "ChatGPT"
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const inputRef = useRef(null);

  // =========================
  // SEND MESSAGE
  // =========================
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    if (showWelcome) {
      setIsAnimating(true);
      setTimeout(() => {
        setShowWelcome(false);
        setIsAnimating(false);
      }, 600);
    }

    const userMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // 🔹 BOT RESPONSE (mock – remplaçable par API)
    setTimeout(() => {
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "Je suis un chatbot. Cette réponse pourra venir d'une API IA.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [showWelcome]);

  return (
    <div className="flex h-screen text-white">
      <div className="flex flex-col flex-1">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          <h1 className="font-semibold text-xxl">{title}</h1>
          <Link to="/" className="p-2 rounded-lg hover:bg-gray-700">
            <ChevronLeft size={30} />
          </Link>
        </div>

        {/* CHAT CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {showWelcome ? (
            <div
              className={`flex items-center justify-center h-full transition-all duration-600 ${
                isAnimating
                  ? 'opacity-0 scale-95 translate-y-8'
                  : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              <div className="text-center">
                <div className="mb-40">
                  <div className="w-80 h-80 rounded-full border-[8px] border-[#FEFE90] shadow-[0_0_30px_10px_rgba(255,255,0,0.6)] mx-auto"></div>
                </div>
                <h2 className="mb-2 text-5xl font-semibold">
                  {initialMessage}
                </h2>
                <p className="text-gray-400">Posez votre question</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 p-4 px-[20%] animate-fade-in">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!message.isUser && (
                    <div className="flex items-end mr-2">
                      <div className="flex items-center justify-center w-8 h-8 font-bold bg-gray-700 rounded-full">
                        AI
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg ${
                      message.isUser
                        ? 'bg-[#FEFE90] text-black'
                        : 'bg-[#3a3a3a] text-gray-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className="mt-1 text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 bg-gray-700 shadow-lg rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 delay-100 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 delay-200 bg-gray-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* INPUT */}
        <div className="p-4">
          <div className="max-w-4xl mx-auto border border-gray-600 rounded-xl">
            <div className="flex gap-3 p-4 bg-[#333333]">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Écrivez un message..."
                rows={3}
                className="flex-1 bg-[#333333] text-white resize-none outline-none"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 mt-16 text-black bg-white rounded-full disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatBot;
