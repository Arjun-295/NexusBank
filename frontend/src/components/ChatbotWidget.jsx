import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '../services/chatApi';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your Omni Bank AI Assistant. You can ask me about your recent transactions, spending habits, or financial health." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Send to backend with history (excluding the first greeting message for context limits if desired, but we'll send it all)
      const data = await chatApi.sendMessage(userMessage, updatedMessages);
      
      // Add AI response to UI
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error connecting to my servers. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 h-[500px] bg-surface rounded-2xl shadow-2xl flex flex-col border border-outline-variant overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-primary p-4 flex justify-between items-center text-on-primary">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
              <h3 className="font-label-lg font-semibold">Omni AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-on-primary/80 hover:text-on-primary transition-colors"
            >
              <span className="material-symbols-outlined" data-icon="close">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-surface-container/30 space-y-4">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-on-primary rounded-br-sm' 
                      : 'bg-white text-on-surface border border-outline-variant shadow-sm rounded-bl-sm'
                  }`}
                >
                  <p className="font-body-md whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-on-surface border border-outline-variant shadow-sm p-4 rounded-2xl rounded-bl-sm flex space-x-2">
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-surface border-t border-outline-variant">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your finances..."
                className="flex-1 bg-surface-container rounded-full px-4 py-2 font-body-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isLoading}
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary text-on-primary p-2 rounded-full flex items-center justify-center disabled:opacity-50 hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined" data-icon="send">send</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-3xl" data-icon="chat">chat</span>
        </button>
      )}
    </div>
  );
}
