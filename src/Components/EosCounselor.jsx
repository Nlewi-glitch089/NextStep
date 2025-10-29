import React, { useState, useRef, useEffect } from 'react';
import '../styles/pages/eoscounselor.css';
import { sendMessageToEosWithOpenAI } from '../services/chatservice';

export default function EosCounselor({ onNavigate }) {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages); // NEW: keep latest messages available in callbacks
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzedAssessment, setHasAnalyzedAssessment] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const chatEndRef = useRef(null);

  // NEW: track seen API replies to avoid duplicates
  const lastApiReplySetRef = useRef(new Set());

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

  // Analyze user's assessment results on component mount - ONLY ONCE
  useEffect(() => {
    if (isInitialized) return; // Prevent re-running

    const analyzeAssessmentResults = async () => {
      try {
        const userData = localStorage.getItem("userProfile");
        const surveyData = localStorage.getItem("surveyAnswers");
        
        // Skip if already analyzing or another request is in progress
        if (requestInProgress || isAnalyzing) {
          setIsInitialized(true);
          return;
        }

        if (userData && surveyData && !hasAnalyzedAssessment) {
          setIsAnalyzing(true);
          setRequestInProgress(true);

          const userProfile = JSON.parse(userData);
          const assessmentResults = JSON.parse(surveyData);
          
          // Only add greeting if messages are currently empty
          const initialGreeting = `Hello ${userProfile.fullName?.split(' ')[0] || 'there'}! I'm Eos, your AI Career Counselor. I've reviewed your career assessment results, and I'm excited to help you on your journey!`;
          setMessages(prev => (prev && prev.length > 0) ? prev : [{ sender: 'ai', text: initialGreeting }]);
          setIsLoading(true);
          
          // Generate personalized recommendations based on assessment
          const assessmentSummary = createAssessmentSummary(userProfile, assessmentResults);
          
          try {
            const response = await sendMessageToEosWithOpenAI([
              { 
                sender: 'system', 
                text: `You are Eos, an AI Career Counselor. Analyze this user's career assessment results and provide personalized recommendations. Be encouraging, specific, and actionable. Here's their data: ${assessmentSummary}` 
              },
              { 
                sender: 'user', 
                text: `Please analyze my career assessment results and give me personalized recommendations for my career journey.` 
              }
            ]);

            // create signature and skip if seen
            const replySignature = JSON.stringify({ reply: response.reply, resources: response.resources || [] });
            if (!lastApiReplySetRef.current.has(replySignature)) {
              lastApiReplySetRef.current.add(replySignature);

              // append message using functional update to avoid stale state
              setMessages(prev => {
                // final guard: avoid exact duplicate as last message
                const last = prev && prev.length ? prev[prev.length - 1] : null;
                if (last && last.sender === 'ai' && last.text === response.reply) {
                  return prev;
                }
                return [
                  ...prev,
                  { 
                    sender: 'ai', 
                    text: response.reply,
                    paragraphs: formatAIResponse(response.reply),
                    resources: getResourceLinks(response.reply + ' ' + assessmentSummary)
                  }
                ];
              });
            } // else skip duplicate
            
            setHasAnalyzedAssessment(true);
          } catch (error) {
            console.error('Error analyzing assessment:', error);
            setMessages(prev => [
              ...prev,
              { 
                sender: 'ai', 
                text: "I've reviewed your assessment! While I'm having some technical difficulties accessing my full analysis capabilities right now, I can still help you explore your career options. What specific aspect of your career journey would you like to discuss?"
              }
            ]);
          } finally {
            setIsLoading(false);
            setIsAnalyzing(false);
            setRequestInProgress(false);
          }
        } else if (!surveyData) {
          // User hasn't completed assessment yet
          setMessages([
            { 
              sender: 'ai', 
              text: "Hello! I'm Eos, your AI Career Counselor. I notice you haven't completed your career assessment yet. I'd love to give you personalized recommendations! Would you like to take the assessment first, or do you have specific career questions I can help with?" 
            }
          ]);
        } else {
          // Regular greeting for returning users
          setMessages([
            { 
              sender: 'ai', 
              text: "Welcome back! I'm here to continue helping with your career journey. What would you like to explore today?" 
            }
          ]);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setMessages([
          { 
            sender: 'ai', 
            text: "Hello! I'm Eos, your AI Career Counselor. I'm here to help you navigate your career journey. What would you like to explore today?" 
          }
        ]);
      } finally {
        setIsInitialized(true);
      }
    };

    analyzeAssessmentResults();
  }, []); // Empty dependency array to run only once

  // Create a comprehensive summary of user's assessment results
  const createAssessmentSummary = (userProfile, assessmentResults) => {
    const summary = {
      basicInfo: {
        name: userProfile.fullName,
        currentRole: userProfile.currentRole || assessmentResults.currentRole,
        careerGoal: userProfile.careerGoal || assessmentResults.careerGoal,
        experience: userProfile.experience || assessmentResults.experience
      },
      interests: assessmentResults.interests || [],
      techInterests: assessmentResults.techInterests || [],
      skills: assessmentResults.skills || userProfile.skills || [],
      softSkills: assessmentResults.softSkills || [],
      workEnvironment: assessmentResults.preferredWorkEnvironment || [],
      workValues: assessmentResults.workValues || [],
      careerPriorities: assessmentResults.careerPriorities || [],
      learningStyle: assessmentResults.learningStyle || []
    };

    return JSON.stringify(summary);
  };

  // Function to format AI response text with proper spacing
  const formatAIResponse = (text) => {
    // Split by periods followed by space, but keep the period
    const sentences = text.split(/(?<=\.)\s+/);
    
    // Group sentences into smaller paragraphs (2-3 sentences each)
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 2) {
      const paragraph = sentences.slice(i, i + 2).join(' ');
      if (paragraph.trim()) {
        paragraphs.push(paragraph.trim());
      }
    }
    
    return paragraphs;
  };

  // Enhanced resource links based on assessment results
  const getResourceLinks = (text) => {
    const resources = [];
    const lowerText = text.toLowerCase();

    // Assessment-specific resources
    if (lowerText.includes('frontend') || lowerText.includes('web design')) {
      resources.push({
        title: "Frontend Developer Roadmap",
        url: "https://roadmap.sh/frontend",
        description: "Complete learning path for frontend development"
      });
    }

    if (lowerText.includes('backend') || lowerText.includes('server')) {
      resources.push({
        title: "Backend Developer Roadmap",
        url: "https://roadmap.sh/backend",
        description: "Comprehensive backend development guide"
      });
    }

    if (lowerText.includes('data science') || lowerText.includes('machine learning')) {
      resources.push({
        title: "Kaggle Learn",
        url: "https://www.kaggle.com/learn",
        description: "Free micro-courses in data science and ML"
      });
    }

    // Career-specific resources
    if (lowerText.includes('interview') || lowerText.includes('prepare')) {
      resources.push({
        title: "Interview Preparation Guide",
        url: "https://www.indeed.com/career-advice/interviewing",
        description: "Comprehensive interview tips and practice questions"
      });
    }

    if (lowerText.includes('resume') || lowerText.includes('cv')) {
      resources.push({
        title: "Resume Builder & Templates",
        url: "https://www.canva.com/resumes/templates/",
        description: "Professional resume templates and writing tips"
      });
    }

    if (lowerText.includes('coding') || lowerText.includes('programming') || lowerText.includes('learn')) {
      resources.push({
        title: "FreeCodeCamp",
        url: "https://www.freecodecamp.org/",
        description: "Free coding bootcamp with certificates"
      });
    }

    if (lowerText.includes('portfolio') || lowerText.includes('github')) {
      resources.push({
        title: "GitHub Portfolio Guide",
        url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile",
        description: "Build an impressive GitHub profile"
      });
    }

    if (lowerText.includes('salary') || lowerText.includes('negotiate')) {
      resources.push({
        title: "Salary Negotiation Tips",
        url: "https://www.glassdoor.com/blog/salary-negotiation-tips/",
        description: "Professional salary negotiation strategies"
      });
    }

    if (lowerText.includes('skills') || lowerText.includes('tech')) {
      resources.push({
        title: "LinkedIn Learning",
        url: "https://www.linkedin.com/learning/",
        description: "Professional skill development courses"
      });
    }

    return resources.slice(0, 3); // Limit to 3 resources max
  };

  const handleSend = async () => {
    // stronger guard: block while requests are in progress
    if (!userInput.trim() || isLoading || isAnalyzing || requestInProgress) return;

    // Capture latest messages from ref to build context reliably
    const currentMessages = messagesRef.current.slice();
    const newUserMessage = { sender: 'user', text: userInput };
    // append user message immediately
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setRequestInProgress(true);

    try {
      const userData = localStorage.getItem("userProfile");
      const surveyData = localStorage.getItem("surveyAnswers");

      let contextualMessages = [...currentMessages, newUserMessage];

      if (userData && surveyData && hasAnalyzedAssessment) {
        const userProfile = JSON.parse(userData);
        const assessmentResults = JSON.parse(surveyData);
        const assessmentContext = `User context: ${userProfile.fullName}, ${userProfile.currentRole || 'Student'}, interested in ${assessmentResults.interests?.slice(0,3).join(', ') || 'tech'}, experience level: ${userProfile.experience || 'Entry Level'}`;
        // keep last N messages and prepend context
        contextualMessages = [
          { sender: 'system', text: assessmentContext },
          ...contextualMessages.slice(-6)
        ];
      }

      const response = await sendMessageToEosWithOpenAI(contextualMessages);

      const replySignature = JSON.stringify({ reply: response.reply, resources: response.resources || [] });

      // skip if signature already seen
      if (!lastApiReplySetRef.current.has(replySignature)) {
        lastApiReplySetRef.current.add(replySignature);

        setMessages(prev => {
          const last = prev && prev.length ? prev[prev.length - 1] : null;
          if (last && last.sender === 'ai' && last.text === response.reply) {
            return prev;
          }
          return [
            ...prev,
            {
              sender: 'ai',
              text: response.reply,
              paragraphs: formatAIResponse(response.reply),
              resources: getResourceLinks(response.reply + ' ' + userInput)
            }
          ];
        });
      }
    } catch (error) {
      console.error('EosCounselor error:', error);
      setMessages(prev => [
        ...prev,
        { 
          sender: 'ai', 
          text: "I'm having some technical difficulties right now, but I'm still here to help! Try asking me about career paths, skills development, or job search strategies.",
          paragraphs: ["I'm having some technical difficulties right now, but I'm still here to help!", "Try asking me about career paths, skills development, or job search strategies."],
          resources: []
        }
      ]);
    } finally {
      setIsLoading(false);
      setRequestInProgress(false);
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

  const handleBackToHome = () => {
    try {
      if (onNavigate) {
        onNavigate('home');
      }
    } catch (error) {
      console.error('Error navigating to home:', error);
    }
  };

  useEffect(() => {
    handleRefreshSuggestions();
  }, []);

  // Enhanced suggestions based on user's assessment - only run after initialization
  useEffect(() => {
    if (!isInitialized) return;

    const generatePersonalizedSuggestions = () => {
      try {
        const surveyData = localStorage.getItem("surveyAnswers");
        if (surveyData) {
          const assessmentResults = JSON.parse(surveyData);
          const personalizedSuggestions = [];

          // Add suggestions based on their interests
          if (assessmentResults.interests?.includes('Software Development')) {
            personalizedSuggestions.push("What programming languages should I focus on for software development?");
          }
          if (assessmentResults.interests?.includes('Data Science')) {
            personalizedSuggestions.push("How can I build a strong data science portfolio?");
          }
          if (assessmentResults.techInterests?.includes('Frontend Development')) {
            personalizedSuggestions.push("What's the best way to learn React and modern frontend frameworks?");
          }
          if (assessmentResults.workValues?.includes('Work-Life Balance')) {
            personalizedSuggestions.push("What tech companies are known for good work-life balance?");
          }
          if (assessmentResults.careerPriorities?.includes('Skill Development')) {
            personalizedSuggestions.push("What skills are most in-demand for my career goals?");
          }

          // Add general suggestions
          const generalSuggestions = allSuggestions.filter(s => 
            !personalizedSuggestions.some(ps => ps.includes(s.split(' ')[0]))
          );

          const combinedSuggestions = [
            ...personalizedSuggestions,
            ...generalSuggestions
          ];

          const shuffled = combinedSuggestions.sort(() => 0.5 - Math.random());
          setSuggestions(shuffled.slice(0, 6));
        } else {
          handleRefreshSuggestions();
        }
      } catch (error) {
        console.error('Error generating personalized suggestions:', error);
        handleRefreshSuggestions();
      }
    };

    generatePersonalizedSuggestions();
  }, [isInitialized]);

  // New font size handling code
  const SITE_KEY = 'site_font_size';
  const defaultFont = 18;
  const initialFont = (() => {
    const v = Number(localStorage.getItem(SITE_KEY));
    return v && !isNaN(v) ? v : defaultFont;
  })();

  const [fontSize, setFontSize] = useState(initialFont);

  useEffect(() => {
    // apply initial value to CSS variables
    document.documentElement.style.setProperty('--response-font-size', `${fontSize}px`);
    document.documentElement.style.setProperty('--app-font-size', `${fontSize}px`);
    localStorage.setItem(SITE_KEY, String(fontSize));
  }, []); // run once on mount

  const increaseFont = () => {
    setFontSize(s => {
      const next = Math.min(24, s + 1);
      document.documentElement.style.setProperty('--response-font-size', `${next}px`);
      document.documentElement.style.setProperty('--app-font-size', `${next}px`);
      localStorage.setItem(SITE_KEY, String(next));
      return next;
    });
  };
  const decreaseFont = () => {
    setFontSize(s => {
      const next = Math.max(14, s - 1);
      document.documentElement.style.setProperty('--response-font-size', `${next}px`);
      document.documentElement.style.setProperty('--app-font-size', `${next}px`);
      localStorage.setItem(SITE_KEY, String(next));
      return next;
    });
  };
  const resetFont = () => {
    const next = defaultFont;
    document.documentElement.style.setProperty('--response-font-size', `${next}px`);
    document.documentElement.style.setProperty('--app-font-size', `${next}px`);
    localStorage.setItem(SITE_KEY, String(next));
    setFontSize(next);
  };

  // New paragraph renderer: groups leading-marker lines into a marker-free list,
  // treats "Label:" lines as headings, otherwise renders normal paragraphs.
  const renderParagraphs = (paragraphs) => {
    const elements = [];
    let listBuffer = [];

    const flushListBuffer = (keyBase) => {
      if (listBuffer.length === 0) return;
      elements.push(
        <div key={`${keyBase}-list`} className="response-list" role="list">
          {listBuffer.map((item, idx) => (
            <div key={`${keyBase}-item-${idx}`} className="response-list-item" role="listitem">
              {item}
            </div>
          ))}
        </div>
      );
      listBuffer = [];
    };

    paragraphs.forEach((raw, i) => {
      const p = raw.trim();

      // detect heading-style lines (ends with ':' or short all-caps label)
      const isLabelLine = /:$/u.test(p) || (/^[A-Z0-9\s]{3,30}$/.test(p) && p === p.toUpperCase());

      // detect list-like lines starting with '-', '*', '#' or numbered lists like "1."
      const listMatch = p.match(/^(\s*(?:-|\*|#|\d+\.)\s+)(.*)$/);
      if (listMatch) {
        // collect the stripped list item text
        const itemText = listMatch[2].trim();
        listBuffer.push(itemText);
        return;
      }

      // if current line is not a list item, flush any buffered list first
      if (listBuffer.length > 0) {
        flushListBuffer(`p-${i}`);
      }

      if (isLabelLine) {
        // render as a clear heading (no trailing ':')
        elements.push(
          <h4 key={`h-${i}`} className="ai-heading">
            {p.replace(/:$/u, '')}
          </h4>
        );
      } else {
        // normal paragraph
        elements.push(
          <p key={`p-${i}`} className="response-paragraph">
            {p}
          </p>
        );
      }
    });

    // flush at end
    flushListBuffer('end');

    return elements;
  };

  return (
    <main className="ai-counselor-main">
      <section className="ai-counselor-container">
        <header className="ai-header">
          <div className="ai-header-content">
            <button className="back-btn" onClick={handleBackToHome}>
              <span className="icon">←</span>
            </button>

            <h1 className="title">✨ Eos</h1>

            {/* text size controls */}
            <div className="text-size-controls" aria-hidden="false" role="toolbar" title="Adjust response text size">
              <button className="txt-btn" onClick={decreaseFont} aria-label="Decrease text size">A−</button>
              <button className="txt-btn" onClick={resetFont} aria-label="Reset text size">A</button>
              <button className="txt-btn" onClick={increaseFont} aria-label="Increase text size">A+</button>
            </div>
          </div>
          <p className="subtitle">Your AI Career Counselor</p>
        </header>

        <section className="chat-section">
          <div className="chat-box custom-scrollbar">
            {messages.map((msg, i) => (
              <article key={i} className={`message ${msg.sender}`}>
                {msg.sender === 'ai' && <div className="avatar">🤖</div>}
                <div className={`bubble ${msg.sender}`}>
                  {msg.paragraphs ? (
                    <div className="formatted-response" style={{ '--response-font-size': `${fontSize}px` }}>
                      {renderParagraphs(msg.paragraphs)}
                      {msg.resources && msg.resources.length > 0 && (
                        <div className="resources-section">
                          <h4>📚 Helpful Resources:</h4>
                          {msg.resources.map((resource, index) => (
                            <div key={index} className="resource-link">
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="resource-title"
                              >
                                🔗 {resource.title}
                              </a>
                              <p className="resource-description">{resource.description}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
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