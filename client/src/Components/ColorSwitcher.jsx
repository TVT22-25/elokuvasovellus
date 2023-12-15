import React, { useState } from 'react';

const ColorSwitcher = () => {
  const [currentColor, setCurrentColor] = useState('#3498db'); // Initial color

  const switchColor = () => {
    // Generate a random color
    const newColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    setCurrentColor(newColor);
  };

  return (
    <div style={{ backgroundColor: currentColor, padding: '50px', textAlign: 'center' }}>
      <h1>Color Switcher</h1>
      <p>Current Color: {currentColor}</p>
      <button onClick={switchColor}>Switch Color</button>
    </div>
  );
};

export default ColorSwitcher;