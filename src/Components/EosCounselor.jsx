import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages/eoscounselor.css';
import { sendMessageToEosWithOpenAI } from '../services/chatservice';

export default function EosCounselor() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I'm Eos, your AI Career Counselor. I'm here to help you navigate your career journey. What would you like to explore today?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  const allSuggestions = [
    "How can I prepare for interviews?",
    "What courses should I take for web development?",
    "What are the most in-demand tech skills right now?",
    "How do I build a strong portfolio?",
    "What certifications should I get?",
    "How can I switch careers into tech?",
    "What soft skills do employers value most?",
    "How do I negotiate a better salary?",
    "What's the difference between frontend and backend development?",
    "How do I get my first tech job without experience?",
    "What programming language should I learn first?",
    "How can I improve my resume?",
    "What are some good remote job opportunities?",
    "How do I network effectively in my industry?",
    "Should I pursue a computer science degree?",
    "What's the job outlook for data scientists?",
    "How do I stay updated with tech trends?",
    "What are the best platforms to learn coding?",
    "How important is GitHub for my career?"
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newUserMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToEosWithOpenAI([
        ...messages,
        newUserMessage
      ]);

      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: response.reply }
      ]);
    } catch (error) {
      console.error('EosCounselor error:', error);
      setMessages(prev => [
        ...prev,
        { 
          sender: 'ai', 
          text: "I'm having some technical difficulties right now, but I'm still here to help! Try asking me about career paths, skills development, or job search strategies." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRefreshSuggestions = () => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    setSuggestions(shuffled.slice(0, 6));
  };

  const handleSuggestionClick = (text) => {
    setUserInput(text);
  };

  useEffect(() => {
    handleRefreshSuggestions();
  }, []);

  return (
    <main className="ai-counselor-main">
      <section className="ai-counselor-container">
        <header className="ai-header">
          <div className="ai-header-content">
            <button className="back-btn" onClick={() => navigate('/home')}>
              <span className="icon">←</span>
            </button>
            <h1 className="title">✨ Eos</h1>
          </div>
          <p className="subtitle">Your AI Career Counselor</p>
        </header>

        <section className="chat-section">
          <div className="chat-box custom-scrollbar">
            {messages.map((msg, i) => (
              <article
                key={i}
                className={`message ${msg.sender}`}
              >
                {msg.sender === 'ai' && <div className="avatar">🤖</div>}
                <div className={`bubble ${msg.sender}`}>{msg.text}</div>
              </article>
            ))}

            {isLoading && (
              <article className="message ai">
                <div className="avatar">🤖</div>
                <div className="typing-bubble">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </article>
            )}
            <div ref={chatEndRef} />
          </div>

          <section className="input-section">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your career goals..."
              className="chat-input"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !userInput.trim()}
              className="send-btn"
            >
              ➤
            </button>
          </section>
        </section>

        <aside className="suggestions">
          <div className="suggestions-header">
            <h3>💡 Try asking:</h3>
            <button onClick={handleRefreshSuggestions} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
          <div className="suggestion-grid">
            {suggestions.map((text, i) => (
              <div
                key={i}
                onClick={() => handleSuggestionClick(text)}
                className="suggestion-card"
              >
                {text}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}