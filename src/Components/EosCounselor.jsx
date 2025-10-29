import React, { useState, useRef, useEffect } from 'react';
import '../styles/pages/eoscounselor.css';
import { sendMessageToEosWithOpenAI } from '../services/chatservice';

export default function EosCounselor({ onNavigate }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzedAssessment, setHasAnalyzedAssessment] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
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

  // Analyze user's assessment results on component mount - ONLY ONCE
  useEffect(() => {
    if (isInitialized) return; // Prevent re-running

    const analyzeAssessmentResults = async () => {
      try {
        const userData = localStorage.getItem("userProfile");
        const surveyData = localStorage.getItem("surveyAnswers");
        
        if (userData && surveyData && !hasAnalyzedAssessment) {
          const userProfile = JSON.parse(userData);
          const assessmentResults = JSON.parse(surveyData);
          
          // Create initial greeting
          const initialGreeting = `Hello ${userProfile.fullName?.split(' ')[0] || 'there'}! I'm Eos, your AI Career Counselor. I've reviewed your career assessment results, and I'm excited to help you on your journey!`;
          
          setMessages([{ sender: 'ai', text: initialGreeting }]);
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

            setMessages(prev => [
              ...prev,
              { 
                sender: 'ai', 
                text: response.reply,
                paragraphs: formatAIResponse(response.reply),
                resources: getResourceLinks(response.reply + ' ' + assessmentSummary)
              }
            ]);
            
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
          }
          
          setIsLoading(false);
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
    if (!userInput.trim() || isLoading) return; // Prevent sending while loading

    const newUserMessage = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      // Include user's assessment context in ongoing conversations
      const userData = localStorage.getItem("userProfile");
      const surveyData = localStorage.getItem("surveyAnswers");
      let contextualMessages = [...messages, newUserMessage];

      // Add assessment context for better responses (but only for context, not re-analysis)
      if (userData && surveyData && hasAnalyzedAssessment) {
        const userProfile = JSON.parse(userData);
        const assessmentResults = JSON.parse(surveyData);
        const assessmentContext = `User context: ${userProfile.fullName}, ${userProfile.currentRole || 'Student'}, interested in ${assessmentResults.interests?.slice(0,3).join(', ') || 'tech'}, experience level: ${userProfile.experience || 'Entry Level'}`;
        
        contextualMessages = [
          { sender: 'system', text: assessmentContext },
          ...contextualMessages.slice(-6) // Keep last 6 messages for context
        ];
      }

      const response = await sendMessageToEosWithOpenAI(contextualMessages);

      setMessages(prev => [
        ...prev,
        { 
          sender: 'ai', 
          text: response.reply,
          paragraphs: formatAIResponse(response.reply),
          resources: getResourceLinks(response.reply + ' ' + userInput)
        }
      ]);
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

  return (
    <main className="ai-counselor-main">
      <section className="ai-counselor-container">
        <header className="ai-header">
          <div className="ai-header-content">
            <button className="back-btn" onClick={handleBackToHome}>
              <span className="icon">←</span>
            </button>
            <h1 className="title">✨ Eos</h1>
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
                    // Formatted AI response with paragraphs
                    <div className="formatted-response">
                      {msg.paragraphs.map((paragraph, index) => (
                        <p key={index} className="response-paragraph">
                          {paragraph}
                        </p>
                      ))}
                      
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
                    // Regular text for user messages
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