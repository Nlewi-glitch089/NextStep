import React, { useState, useEffect } from 'react';

export default function TextSizeControls() {
  const STORAGE_KEY = 'site_font_size';
  const DEFAULT = 18;

  const [size, setSize] = useState(() => {
    const v = Number(localStorage.getItem(STORAGE_KEY));
    return v && !isNaN(v) ? v : DEFAULT;
  });

  useEffect(() => {
    // Apply site-wide font size and response font variable for Eos
    document.documentElement.style.setProperty('--app-font-size', `${size}px`);
    document.documentElement.style.setProperty('--response-font-size', `${size}px`);
    localStorage.setItem(STORAGE_KEY, String(size));
  }, [size]);

  const increase = () => setSize(s => Math.min(24, s + 1));
  const decrease = () => setSize(s => Math.max(14, s - 1));
  const reset = () => setSize(DEFAULT);

  const toolbarStyle = {
    display: 'flex',
    gap: '0.4rem',              // reduced gap
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  };

  // Make buttons visually white and subtle (transparent background)
  const btnStyle = {
    background: 'rgba(255,255,255,0.06)',           // subtle contrast so letters are visible
    color: '#ffffff',                                // white text
    WebkitTextFillColor: '#ffffff',                  // explicit WebKit fill
    border: '1px solid rgba(255,255,255,0.12)',      // subtle white border
    padding: '0.22rem 0.42rem',                      // reduced padding
    borderRadius: '5px',                            // slightly smaller radius
    cursor: 'pointer',
    fontWeight: 600,                                  // a bit lighter
    fontSize: '0.9rem',                               // smaller text
    transition: 'all 0.18s ease'
  };

  return (
    <div className="text-size-controls-global" style={toolbarStyle} aria-label="Text size controls">
      <button style={btnStyle} onClick={decrease} aria-label="Decrease text size">A−</button>
      <button style={btnStyle} onClick={reset} aria-label="Reset text size">A</button>
      <button style={btnStyle} onClick={increase} aria-label="Increase text size">A+</button>
    </div>
  );
}
