const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const sendMessageToEos = async (messages) => {
  try {
    // Format messages for the API
    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text || msg.content
    }));

    const response = await fetch(`${API_BASE_URL}/api/chat/eos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: formattedMessages,
        model: 'gpt-3.5-turbo', // or your preferred model
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      reply: data.reply || data.message || "I'm here to help with your career questions!"
    };

  } catch (error) {
    console.error('Chat service error:', error);
    
    // Fallback responses for development/offline mode
    const fallbackResponses = [
      "That's a great question! Let me help you explore that career path.",
      "Based on current industry trends, I'd recommend focusing on these key areas...",
      "Here are some actionable steps you can take to achieve that goal:",
      "That's an excellent career consideration. Let's break it down step by step.",
      "I understand your concern. Many professionals face similar challenges."
    ];
    
    const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
    return {
      reply: randomResponse + " (Note: This is a demo response - full AI integration coming soon!)"
    };
  }
};

// Alternative implementation using OpenAI directly (client-side)
export const sendMessageToEosWithOpenAI = async (messages) => {
  const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    // Enhanced system prompt for assessment analysis
    const systemPrompt = `You are Eos, an AI Career Counselor specializing in helping students and early-career professionals. You are knowledgeable, encouraging, and provide actionable advice.

When analyzing career assessments:
- Provide specific, personalized recommendations based on their interests, skills, and goals
- Suggest concrete next steps they can take
- Recommend learning resources, courses, or certifications
- Address their work preferences and values
- Be encouraging but realistic about career paths
- Ask follow-up questions to understand their needs better

Keep responses conversational, helpful, and focused on career development.`;

    const openAIMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }))
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openAIMessages
      })
    });

    const data = await response.json();
    const aiText = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
      ? data.choices[0].message.content.trim()
      : "I'm having trouble processing your request right now. Could you try asking again?";

    return { reply: aiText };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Unable to get response from AI service');
  }
};