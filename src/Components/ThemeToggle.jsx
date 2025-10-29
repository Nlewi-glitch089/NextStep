import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'site_theme';

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.classList.add('site-light');
  } else {
    document.documentElement.classList.remove('site-light');
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = (e) => {
    e.stopPropagation();
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      className={`theme-toggle-indicator ${theme === 'light' ? 'is-light' : 'is-dark'}`}
      onClick={toggle}
      aria-pressed={theme === 'light'}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      // prevent accidental logo click propagation
      onMouseDown={e => e.stopPropagation()}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-icon theme-icon-sun" aria-hidden="true">☀︎</span>
        <span className="theme-icon theme-icon-moon" aria-hidden="true">◐</span>
        <span className="theme-toggle-knob" aria-hidden="true" />
      </span>
      <span className="visually-hidden">{theme === 'light' ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}
