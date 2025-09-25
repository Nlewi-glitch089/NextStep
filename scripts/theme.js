function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        localStorage.removeItem('theme');
        themeToggle.innerHTML = '🌙 Light Mode';
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '🌞 Dark Mode';
    }
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        document.querySelector('.theme-toggle').innerHTML = '🌞 Dark Mode';
    }
});
