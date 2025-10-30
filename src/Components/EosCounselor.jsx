import React, { useState, useRef, useEffect } from 'react';
import '../styles/pages/eoscounselor.css';
import { sendMessageToEosWithOpenAI } from '../services/chatservice';
import TextSizeControls from './TextSizeControls.jsx';
import ThemeToggle from './ThemeToggle.jsx';

export default function EosCounselor({ onNavigate }) {
	const [messages, setMessages] = useState([]);
	const messagesRef = useRef(messages);
	useEffect(() => { messagesRef.current = messages; }, [messages]);

	const requestInProgressRef = useRef(false);
	const seenReplySignaturesRef = useRef(new Set());
	const lastAiTextRef = useRef(null);

	const CHAT_STORAGE_KEY = 'eos_chat_messages_v1';
	const SEEN_SIG_KEY = 'eos_seen_signatures_v1';

	// Create a consistent greeting generator used across init, fallbacks, and discard.
	// If a userProfile is provided, include a short welcome-back line.
	const generateGreeting = (userProfile = null) => {
		const base = "Welcome back and sit tight — I’m loading your assessment results now.";
		if (userProfile && userProfile.fullName) {
			const name = userProfile.fullName.split(' ')[0];
			return `${base} Hey ${name}, welcome back!`;
		}
		return base;
	};

	// Load saved chat & survey, but DO NOT auto-run analysis or insert "Would you like me to analyze..." prompts.
	useEffect(() => {
		try {
			// Load saved chat first (if any) so we restore conversation
			const rawChat = localStorage.getItem(CHAT_STORAGE_KEY);
			if (rawChat) {
				const saved = JSON.parse(rawChat);
				if (Array.isArray(saved) && saved.length > 0) {
					setMessages(saved);
					// populate dedupe set from saved AI messages so we don't re-append them
					try {
						saved.forEach(m => {
							if (m.sender === 'ai') {
								const sig = JSON.stringify({ reply: m.text, resources: m.resources || [] });
								seenReplySignaturesRef.current.add(sig);
								lastAiTextRef.current = m.text;
							}
						});
						localStorage.setItem(SEEN_SIG_KEY, JSON.stringify(Array.from(seenReplySignaturesRef.current)));
					} catch (e) { /* ignore */ }
				}
			}

			// Check for saved profile / survey BUT DO NOT automatically ask to analyze.
			const userDataRaw = localStorage.getItem('userProfile');
			const surveyRaw = localStorage.getItem('surveyAnswers');

			// Only add a neutral greeting if there are no messages restored/loaded.
			const chatHasContent = Array.isArray(messagesRef.current) && messagesRef.current.length > 0;
			if (!chatHasContent) {
				setMessages([{ sender: 'ai', text: generateGreeting() }]);
			}

			// IMPORTANT: do NOT set showAnalyzePrompt or pendingProfileForAnalysis here.
		} catch (err) {
			console.error('Initialization error in EosCounselor:', err);
			if (!messagesRef.current || messagesRef.current.length === 0) {
				setMessages([{ sender: 'ai', text: generateGreeting() }]);
			}
		} finally {
			setIsInitialized(true);
		}
	}, []); // run once on mount

	// Load persisted signature set if present (in case no saved chat)
	useEffect(() => {
		try {
			const raw = localStorage.getItem(SEEN_SIG_KEY);
			if (raw) {
				const arr = JSON.parse(raw);
				if (Array.isArray(arr)) {
					arr.forEach(s => seenReplySignaturesRef.current.add(s));
				}
			}
		} catch (e) { /* ignore */ }
	}, []);

	// CENTRALIZED AI APPEND: checks signature + last text, persists signature, appends safely
	const appendAiMessage = (replyText, resources = []) => {
		if (!replyText || typeof replyText !== 'string') return false;
		const signature = JSON.stringify({ reply: replyText, resources: resources || [] });

		// Skip if we've seen this signature or the last AI text matches
		if (seenReplySignaturesRef.current.has(signature)) return false;
		if (lastAiTextRef.current && lastAiTextRef.current === replyText) return false;

		seenReplySignaturesRef.current.add(signature);
		lastAiTextRef.current = replyText;

		// persist signatures
		try {
			localStorage.setItem(SEEN_SIG_KEY, JSON.stringify(Array.from(seenReplySignaturesRef.current)));
		} catch (e) {
			// ignore persistence errors
		}

		setMessages(prev => {
			const last = prev && prev.length ? prev[prev.length - 1] : null;
			if (last && last.sender === 'ai' && last.text === replyText) return prev;
			return [
				...prev,
				{
					sender: 'ai',
					text: replyText,
					paragraphs: typeof formatAIResponse === 'function' ? formatAIResponse(replyText) : undefined,
					resources: (typeof getResourceLinks === 'function') ? getResourceLinks(replyText) : resources
				}
			];
		});

		return true;
	};

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

	// Create a friendly, contextual welcome-back message
	// moved here so it can be used by the analyzeEffect below
	// Removed duplicate declaration of generateWelcomeBackGreeting

	// Analyze user's assessment results on component mount - ONLY ONCE
	useEffect(() => {
		if (isInitialized) return; // Prevent re-running

		const analyzeAssessmentResults = async () => {
			try {
				const userData = localStorage.getItem("userProfile");
				const surveyData = localStorage.getItem("surveyAnswers");

				if (!userData || !surveyData) {
					// greet if no assessment
					setMessages(prev => prev.length ? prev : [{
						sender: 'ai',
						text: "I notice you haven't completed your career assessment yet. I'd love to give you personalized recommendations! Would you like to take the assessment first, or do you have specific career questions I can help with?"
					}]);
					setIsInitialized(true);
					return;
				}

				// Only proceed if we haven't analyzed yet and no other request is running
				if (hasAnalyzedAssessment || requestInProgressRef.current) {
					setIsInitialized(true);
					return;
				}

				requestInProgressRef.current = true;
				const userProfile = JSON.parse(userData);
				const assessmentResults = JSON.parse(surveyData);

				// Use generator so the greeting is personalized and consistent
				const initialGreeting = generateWelcomeBackGreeting(userProfile, assessmentResults);

				// Only set greeting if messages empty
				setMessages(prev => (prev && prev.length > 0) ? prev : [{ sender: 'ai', text: initialGreeting }]);
				setIsLoading(true);

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

					// append via centralized function
					appendAiMessage(response.reply, response.resources || []);
				} catch (err) {
					console.error('Error analyzing assessment:', err);
					// append fallback while still using the centralized guard to avoid duplication
					appendAiMessage("I've reviewed your assessment! While I'm having some technical difficulties accessing my full analysis capabilities right now, I can still help you explore your career options. What specific aspect of your career journey would you like to discuss?");
				} finally {
					setIsLoading(false);
					requestInProgressRef.current = false;
					setIsInitialized(true);
				}
			} catch (error) {
				console.error('Error loading user data:', error);
				setMessages(prev => prev.length ? prev : [{ sender: 'ai', text: generateGreeting() }]);
				setIsInitialized(true);
			}
		};

		analyzeAssessmentResults();
	}, []); // run once

	// Load persisted signature set if present (in case no saved chat)
	useEffect(() => {
		try {
			const raw = localStorage.getItem(SEEN_SIG_KEY);
			if (raw) {
				const arr = JSON.parse(raw);
				if (Array.isArray(arr)) {
					arr.forEach(s => seenReplySignaturesRef.current.add(s));
				}
			}
		} catch (e) { /* ignore */ }
	}, []);

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
		// Prevent sending while loading or a request is in progress
		if (!userInput.trim() || isLoading || requestInProgressRef.current) return;

		const newUserMessage = { sender: 'user', text: userInput };
		// append user message immediately using functional update
		setMessages(prev => [...prev, newUserMessage]);
		setUserInput('');
		setIsLoading(true);
		requestInProgressRef.current = true;

		try {
			// Build contextual messages from latest messages ref
			const currentMessages = messagesRef.current.slice();
			let contextualMessages = [...currentMessages, newUserMessage];

			const userData = localStorage.getItem("userProfile");
			const surveyData = localStorage.getItem("surveyAnswers");

			if (userData && surveyData && hasAnalyzedAssessment) {
				const userProfile = JSON.parse(userData);
				const assessmentResults = JSON.parse(surveyData);
				const assessmentContext = `User context: ${userProfile.fullName}, ${userProfile.currentRole || 'Student'}, interested in ${assessmentResults.interests?.slice(0,3).join(', ') || 'tech'}, experience level: ${userProfile.experience || 'Entry Level'}`;

				contextualMessages = [
					{ sender: 'system', text: assessmentContext },
					...contextualMessages.slice(-6)
				];
			} else {
				contextualMessages = contextualMessages.slice(-8); // keep recent context
			}

			const response = await sendMessageToEosWithOpenAI(contextualMessages);

			// dedupe + append using centralized function
			appendAiMessage(response.reply, response.resources || []);
		} catch (error) {
			// use appendAiMessage for fallback too
			appendAiMessage("I'm having some technical difficulties right now, but I'm still here to help! Try asking me about career paths, skills development, or job search strategies.");
		} finally {
			setIsLoading(false);
			requestInProgressRef.current = false;
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

	// Improved paragraph renderer:
	// - groups list lines into marker-free response-list
	// - treats label lines as headings
	// - replaces repeated "Actionable Step" with rotating friendly phrases and shows a small purple mini-badge
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

		const phraseAlternatives = [
			'Practical Tip',
			'Next Step',
			'Suggested Action',
			'Try This',
			'Recommendation',
			'Actionable Idea'
		];

		paragraphs.forEach((raw, i) => {
			const p = raw.trim();

			// detect list-like lines starting with '-', '*', '#', or numbered lists like "1."
			const listMatch = p.match(/^(\s*(?:-|\*|#|\d+\.)\s+)(.*)$/);
			if (listMatch) {
				// collect the stripped list item text
				const itemText = listMatch[2].trim();
				listBuffer.push(itemText);
				return;
			}

			// flush any buffered list first
			if (listBuffer.length > 0) {
				flushListBuffer(`p-${i}`);
			}

			// detect heading-style lines (ends with ':' or short all-caps label)
			const isLabelLine = /:$/u.test(p) || (/^[A-Z0-9\s\-]{3,40}$/.test(p) && p === p.toUpperCase());

			// If this is a label-like line that mentions "Actionable Step", render as mini-badge + heading
			if (isLabelLine && /actionable step/i.test(p)) {
				const alt = phraseAlternatives[i % phraseAlternatives.length];
				// remove the original "Actionable Step" label text
				const remaining = p.replace(/actionable step[:\-]*\s*/i, '').trim();
				elements.push(
					<div key={`badge-${i}`} className="ai-heading-row">
						<span className="ai-mini-badge">{alt}</span>
						{remaining ? <span className="ai-heading-inline">{remaining.replace(/:$/,'')}</span> : null}
					</div>
				);
				return;
			}

			if (isLabelLine) {
				// regular heading
				elements.push(
					<h4 key={`h-${i}`} className="ai-heading">
						{p.replace(/:$/u, '')}
					</h4>
				);
			} else {
				// normal paragraph — allow plain text; spacing handled in CSS
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

	// Discard chat: clear storage and reset messages to a friendly greeting
	const discardChat = (e) => {
		e?.stopPropagation();
		try {
			localStorage.removeItem(CHAT_STORAGE_KEY);
		} catch (err) {
			console.error('Failed to clear saved chat', err);
		}
		// if a profile exists, include the short welcome-back; otherwise neutral
		const userRaw = localStorage.getItem('userProfile');
		const userProfile = userRaw ? JSON.parse(userRaw) : null;
		setMessages([{ sender: 'ai', text: generateGreeting(userProfile) }]);
		seenReplySignaturesRef.current = new Set(); // clear seen replies
		setHasAnalyzedAssessment(false);
	};

	// Handler: open profile/assessment page to add or update assessment
	const handleAddOrUpdateAssessment = () => {
		// navigate to profile/assessment so user can add/update their assessment
		if (onNavigate) onNavigate('profile');
	};

	// Handler: user opted to analyze - reuse existing analysis flow but guarded
	const handleAnalyzeAssessment = async () => {
		if (!pendingProfileForAnalysis) return;
		if (requestInProgressRef.current) return;
		requestInProgressRef.current = true;
		setIsLoading(true);
		try {
			const { userProfile, surveyData } = pendingProfileForAnalysis;
			const assessmentSummary = createAssessmentSummary(userProfile, surveyData);

			// call existing sendMessageToEosWithOpenAI flow (same prompts you use elsewhere)
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

			// append via centralized function
			appendAiMessage(response.reply, response.resources || []);
			setHasAnalyzedAssessment(true);
		} catch (error) {
			console.error('Error during manual analyze:', error);
			setMessages(prev => [
				...prev,
				{ sender: 'ai', text: "Sorry — I couldn't complete the analysis right now. You can try again or add/update your assessment." }
			]);
		} finally {
			setIsLoading(false);
			requestInProgressRef.current = false;
			setPendingProfileForAnalysis(null);
		}
	};

	// Centralized append helper (already defined elsewhere in file)
	// ...existing appendAiMessage ...

	// Create a friendly, contextual welcome-back message
	const generateWelcomeBackGreeting = (userProfile, assessmentResults) => {
		const name = userProfile?.fullName?.split(' ')[0] || 'there';
		// Simple welcome-back phrase for returning users
		return `Hey ${name}, welcome back!`;
	};

	// Initialization: restore chat + decide greeting/analysis behavior
	useEffect(() => {
		try {
			// Restore saved chat if present
			const rawChat = localStorage.getItem(CHAT_STORAGE_KEY);
			if (rawChat) {
				const saved = JSON.parse(rawChat);
				if (Array.isArray(saved) && saved.length > 0) {
					setMessages(saved);
					// populate dedupe set and last AI text
					try {
						saved.forEach(m => {
							if (m.sender === 'ai') {
								const sig = JSON.stringify({ reply: m.text, resources: m.resources || [] });
								seenReplySignaturesRef.current.add(sig);
								lastAiTextRef.current = m.text;
							}
						});
						localStorage.setItem(SEEN_SIG_KEY, JSON.stringify(Array.from(seenReplySignaturesRef.current)));
					} catch (e) { /* ignore */ }
				}
			}

			// Check auth & survey presence
			const isAuth = localStorage.getItem('isAuthenticated') === 'true';
			const userRaw = localStorage.getItem('userProfile');
			const surveyRaw = localStorage.getItem('surveyAnswers');

			const hasSurvey = !!surveyRaw;
			const userProfile = userRaw ? JSON.parse(userRaw) : null;

			// If signed-in and survey exists: welcome back + auto-analyze (once, using request lock)
			if (isAuth && hasSurvey && userProfile) {
				const assessmentResults = surveyRaw ? JSON.parse(surveyRaw) : null;
				const welcome = generateWelcomeBackGreeting(userProfile, assessmentResults);

				// Only append greeting if chat is empty (avoid duplicates)
				if (!messagesRef.current || messagesRef.current.length === 0) {
					appendAiMessage(welcome, []);
				}
				// Kick off analysis automatically but guard against duplicates/parallel calls
				(async () => {
					if (requestInProgressRef.current) return;
					requestInProgressRef.current = true;
					setIsLoading(true);
					try {
						// reuse the existing analysis flow but pass userProfile & surveyRaw
						const assessmentResults = JSON.parse(surveyRaw);
						const assessmentSummary = createAssessmentSummary(userProfile, assessmentResults);
						const response = await sendMessageToEosWithOpenAI([
							{ sender: 'system', text: `You are Eos, an AI Career Counselor. Analyze this user's career assessment and provide actionable recommendations. Data: ${assessmentSummary}` },
							{ sender: 'user', text: 'Please analyze these assessment results and recommend next steps.' }
						]);
						appendAiMessage(response.reply, response.resources || []);
						setHasAnalyzedAssessment(true);
					} catch (err) {
						appendAiMessage("I attempted to analyze your assessment but ran into a technical issue. You can ask me a question or try the analysis again.");
						console.error('Auto-analysis error:', err);
					} finally {
						setIsLoading(false);
						requestInProgressRef.current = false;
					}
				})();
				setIsInitialized(true);
				return;
			}

			// If not signed in but survey exists: show neutral greeting and keep prompt option (user triggers analysis)
			if (!isAuth && hasSurvey && userProfile) {
				const neutral = `Hello! I'm Eos, your AI Career Counselor. I see you have an assessment saved — I can analyze it if you'd like, or you can ask a question or update your assessment.`;
				if (!messagesRef.current || messagesRef.current.length === 0) {
					appendAiMessage(neutral, []);
				}
				// showAnalyzePrompt remains true elsewhere if you render it; do not auto-analyze
				setIsInitialized(true);
				return;
			}

			// No survey: neutral greeting
			if (!messagesRef.current || messagesRef.current.length === 0) {
				appendAiMessage("Hi there! I’m Eos, your AI Career Counselor. Sit tight — I’m loading your assessment results now.");
			}
			setIsInitialized(true);
		} catch (err) {
			console.error('Eos init error:', err);
			if (!messagesRef.current || messagesRef.current.length === 0) {
				appendAiMessage("Hi there! I’m Eos, your AI Career Counselor. Sit tight — I’m loading your assessment results now.");
			}
			setIsInitialized(true);
		}
	}, []); // run once on mount

	// Load persisted signature set if present (in case no saved chat)
	useEffect(() => {
		try {
			const raw = localStorage.getItem(SEEN_SIG_KEY);
			if (raw) {
				const arr = JSON.parse(raw);
				if (Array.isArray(arr)) {
					arr.forEach(s => seenReplySignaturesRef.current.add(s));
				}
			}
		} catch (e) { /* ignore */ }
	}, []);

	return (
		<main className="ai-counselor-main">
			<section className="ai-counselor-container">

				{/* Header - cleaned up: single controls group, icon buttons for save/discard */}
				<header className="ai-header">
					<div className="ai-header-content">
						<button className="back-btn" onClick={handleBackToHome} aria-label="Back to home">
							<span className="icon">←</span>
						</button>

						<h1 className="title">✨ Eos</h1>

						{/* single inline controls container */}
						<div className="header-controls" role="toolbar" aria-label="Eos controls">
							{/* global text-size control component (persisted) */}
							<TextSizeControls />

							{/* theme toggle component */}
							<ThemeToggle />

							{/* compact icon-only Save / Discard chat buttons */}
							<div className="chat-save-actions" role="group" aria-label="Chat actions">
								<button
									className="icon-btn save"
									onClick={(e) => { e.stopPropagation(); saveChat && saveChat(); }}
									aria-label="Save chat"
									title="Save chat"
									type="button"
								>
									{/* Unicode floppy icon; replace with SVG if preferred */}
									<span aria-hidden="true">💾</span>
								</button>

								<button
									className="icon-btn discard"
									onClick={(e) => { e.stopPropagation(); discardChat && discardChat(); }}
									aria-label="Discard chat"
									title="Discard chat"
									type="button"
								>
									<span aria-hidden="true">🗑️</span>
								</button>
							</div>
						</div>
					</div>

					<p className="subtitle">Your AI Career Counselor</p>
				</header>

				{/* chat area */}
				<div className="chat-section">
					{/* Greeting + optional analyze prompt */}
					{ /* keep greeting message in messages array, but show a one-time prompt when assessment exists */ }
					{/* Messages list */}
					<div className="chat-box custom-scrollbar" role="log" aria-live="polite">
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
				</div>

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