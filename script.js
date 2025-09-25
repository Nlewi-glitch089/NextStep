/*
    NEXTSTEP WEBSITE JAVASCRIPT
    This file contains all the interactive functionality for the website
    
    FUNCTIONS INCLUDED:
    1. Theme Toggle (Dark/Light mode switching)
    2. Smooth Scrolling Navigation
    3. Feature Details Display
    4. Interactive Demo Simulations
    5. Animated Statistics Counter
    6. Page Load Initialization
*/

/* ===================================
   1. THEME TOGGLE FUNCTIONALITY
   Switches between dark and light themes
   =================================== */

function toggleTheme() {
    // Get references to the page body and theme button
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Check if we're currently in light mode
    if (body.getAttribute('data-theme') === 'light') {
        // Switch to dark mode
        body.removeAttribute('data-theme');              // Remove light theme
        themeToggle.innerHTML = '🌙 Light Mode';         // Update button text
    } else {
        // Switch to light mode
        body.setAttribute('data-theme', 'light');        // Add light theme
        themeToggle.innerHTML = '🌞 Dark Mode';          // Update button text
    }
}

/* ===================================
   2. SMOOTH SCROLLING FUNCTIONALITY
   Makes navigation links scroll smoothly to sections
   =================================== */

function scrollToFeatures() {
    // Find the features section and scroll to it smoothly
    document.getElementById('features').scrollIntoView({ 
        behavior: 'smooth'    // Smooth scrolling animation
    });
}

/* ===================================
   3. FEATURE DETAILS DISPLAY
   Shows detailed information when feature cards are clicked
   =================================== */

function showFeatureDetails(featureType) {
    // Object containing detailed descriptions for each feature
    const messages = {
        career: "🎯 Our AI analyzes your skills, interests, and market trends to provide personalized career recommendations that evolve with the job market.",
        resume: "📄 Build professional resumes with industry-specific templates and real-time optimization based on job requirements.",
        interview: "🎤 Practice interviews with AI feedback, record sessions, and improve your confidence with targeted exercises.",
        insights: "📊 Access live job market data, salary trends, and skill demand forecasts to make informed career decisions.",
        skills: "📈 Identify skill gaps through comprehensive analysis and get personalized learning recommendations.",
        network: "🤝 Connect with industry professionals, find mentors, and access exclusive networking opportunities."
    };
    
    // Show the appropriate message or a default message
    alert(messages[featureType] || "Feature details coming soon!");
}

/* ===================================
   4. INTERACTIVE DEMO SIMULATIONS
   These functions simulate the platform's features for demonstration
   =================================== */

// Simulates career path analysis
function simulateCareerAnalysis() {
    // Get references to the demo result area
    const demoResult = document.getElementById('demo-result');
    const demoText = document.getElementById('demo-text');
    
    // Show loading spinner first
    demoText.innerHTML = '<div class="loading"></div> Analyzing your career path...';
    demoResult.style.display = 'block';    // Make the result area visible
    
    // After 2 seconds, show the "results"
    setTimeout(() => {
        demoText.innerHTML = `
            <strong>Career Analysis Complete!</strong><br>
            🎯 Best Match: Software Developer<br>
            📊 Market Demand: High (89%)<br>
            💰 Salary Range: $65,000 - $120,000<br>
            📈 Growth Outlook: 22% (Much faster than average)
        `;
    }, 2000);    // 2000 milliseconds = 2 seconds
}

// Simulates skill gap analysis
function simulateSkillCheck() {
    const demoResult = document.getElementById('demo-result');
    const demoText = document.getElementById('demo-text');
    
    // Show loading message
    demoText.innerHTML = '<div class="loading"></div> Checking skill gaps...';
    demoResult.style.display = 'block';
    
    // Show results after 1.5 seconds
    setTimeout(() => {
        demoText.innerHTML = `
            <strong>Skill Gap Analysis:</strong><br>
            ✅ Strong: Problem Solving, Communication<br>
            ⚠️ Developing: Python, Data Analysis<br>
            🎯 Recommended: Cloud Computing, Machine Learning<br>
            📚 Suggested Learning Time: 6-8 months
        `;
    }, 1500);    // 1500 milliseconds = 1.5 seconds
}

// Simulates job matching functionality
function simulateJobMatch() {
    const demoResult = document.getElementById('demo-result');
    const demoText = document.getElementById('demo-text');
    
    // Show loading message
    demoText.innerHTML = '<div class="loading"></div> Finding job matches...';
    demoResult.style.display = 'block';
    
    // Show job matches after 1.8 seconds
    setTimeout(() => {
        demoText.innerHTML = `
            <strong>Top Job Matches Found:</strong><br>
            1. 🏢 Junior Developer at TechCorp (95% match)<br>
            2. 🌟 Software Engineer Intern at StartupXYZ (87% match)<br>
            3. 💻 Web Developer at DigitalAgency (82% match)<br>
            📧 Application assistance available for all matches!
        `;
    }, 1800);    // 1800 milliseconds = 1.8 seconds
}

/* ===================================
   5. ANIMATED STATISTICS COUNTER
   Makes the numbers in the stats section count up from 0
   =================================== */

function animateStats() {
    // Array of statistics with their target numbers and suffixes
    const stats = [
        { id: 'students-helped', target: 10000, suffix: '+' },
        { id: 'job-placements', target: 7500, suffix: '+' },
        { id: 'partner-companies', target: 250, suffix: '+' },
        { id: 'success-rate', target: 89, suffix: '%' }
    ];

    // Loop through each statistic
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);   // Get the HTML element
        let current = 0;                                    // Start counting from 0
        const increment = stat.target / 100;               // How much to add each step
        
        // Create a timer that updates the number repeatedly
        const timer = setInterval(() => {
            current += increment;                           // Add to current number
            
            if (current >= stat.target) {
                // We've reached the target - show final number and stop
                element.textContent = stat.target + stat.suffix;
                clearInterval(timer);                       // Stop the timer
            } else {
                // Still counting up - show current number (rounded down)
                element.textContent = Math.floor(current) + stat.suffix;
            }
        }, 20);    // Update every 20 milliseconds for smooth animation
    });
}

/* ===================================
   6. PAGE INITIALIZATION
   Sets up functionality when the page finishes loading
   =================================== */

// Run this code when the page finishes loading
window.addEventListener('load', () => {
    
    // Set up the statistics animation to trigger when user scrolls to that section
    setTimeout(() => {
        const statsSection = document.querySelector('.stats');
        
        // Create an "intersection observer" to watch when the stats section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // The stats section is now visible - start the animation
                    animateStats();
                    observer.unobserve(entry.target);    // Stop watching (only animate once)
                }
            });
        });
        
        // Start watching the stats section
        observer.observe(statsSection);
    }, 1000);    // Wait 1 second after page load
});

/* ===================================
   7. SMOOTH SCROLLING FOR NAVIGATION LINKS
   Makes all navigation links scroll smoothly to their target sections
   =================================== */

// Find all links that start with "#" (internal page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();    // Stop the default "jump" behavior
        
        // Find the section this link points to
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Scroll to the target section smoothly
            target.scrollIntoView({ 
                behavior: 'smooth',    // Smooth scrolling animation
                block: 'start'         // Align to top of section
            });
        }
    });
});