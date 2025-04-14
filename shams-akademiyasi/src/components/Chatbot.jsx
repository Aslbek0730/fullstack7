import { useState, useRef, useEffect } from 'react';

const responses = {
  greeting: "Salom! Shams Akademiyasining botimiz siz bilan tanishishdan xursandman. Nima yordam bera olishim mumkin? 😊",
  courses: "Bizda ko'plab kurslar mavjud. Ular shaxsiy kompyuterlar, robototexnika va yaratilikka qarshi. Bularni bizning kurslar sahifasida topishingiz mumkin. Qaysi kurslar sizga qiziqadi? 🤖",
  tests: "Testlar juda qiziqarli! Siz savol javoblar bilan ishlay olasiz va tez orada natijalar ko'rishingiz mumkin. Qo'llab-quvvatlanishingiz mumkinmi? 📝",
  library: "Bizning kitobxonamizda ko'plab ajoyib kitoblar mavjud. Ular dasturlash va yaratilikka qarshi. Ular hammasi bizning kitobxonamizda topishingiz mumkin. Qaysi kitob sizga qiziqadi? 🤖",
  platform: "Shams Akademiyasi juda foydali! Faqatgina kursni tanlang, o'z maqsadlaringizga qarab o'rganing va yaratishni ko'rganing! Nima yordam bera olishim mumkin? 💡",
  default: "I'm not sure I understand. Could you ask me about courses, tests, or the library? I'm here to help! 😊"
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: responses.greeting, isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let response = responses.default;
      const lowerInput = inputValue.toLowerCase();

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = responses.greeting;
      } else if (lowerInput.includes('course')) {
        response = responses.courses;
      } else if (lowerInput.includes('test')) {
        response = responses.tests;
      } else if (lowerInput.includes('library') || lowerInput.includes('book')) {
        response = responses.library;
      } else if (lowerInput.includes('how') && lowerInput.includes('use')) {
        response = responses.platform;
      }

      setMessages(prev => [...prev, { text: response, isBot: true }]);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors duration-200 group"
        aria-label="Open chat"
      >
        <span className="text-2xl">🤖</span>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Can I help you?
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Shams Academy Assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-900'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 