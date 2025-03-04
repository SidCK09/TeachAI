// App.js
import React, { useEffect, useMemo, useState } from 'react';
import Chat from './components/Chat';
import { createTheme, ThemeProvider, CssBaseline, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                // Light theme
                background: { default: '#fafafa' },
              }
            : {
                // Dark theme
                background: { default: '#303030' },
              }),
        },
      }),
    [mode]
  );

  // Update CSS variables when theme mode changes
// App.js (inside useEffect)
useEffect(() => {
    const root = document.documentElement;
    if (mode === 'light') {
      root.style.setProperty('--sidebar-bg', '#ffffff');
      root.style.setProperty('--sidebar-border', '#ddd');
      root.style.setProperty('--sidebar-text', '#333');
      root.style.setProperty('--chat-header-bg', '#1976d2');
      root.style.setProperty('--chat-header-text', '#fff');
      root.style.setProperty('--chat-window-bg', '#ffffff');  // Light mode chat window background
      root.style.setProperty('--chat-messages-bg', '#f9f9f9');  // Light mode messages background
      root.style.setProperty('--message-user-bg', '#bbdefb');
      root.style.setProperty('--message-user-text', '#0d47a1');
      root.style.setProperty('--message-bot-bg', '#e0e0e0');
      root.style.setProperty('--message-bot-text', '#333');
      root.style.setProperty('--input-bg', '#fff');
      root.style.setProperty('--input-border', '#ccc');
      root.style.setProperty('--send-button-bg', '#1976d2');
      root.style.setProperty('--send-button-hover', '#115293');
      root.style.setProperty('--input-container-bg', '#fafafa'); // light mode

    } else {
      root.style.setProperty('--sidebar-bg', '#2c2c2c');
      root.style.setProperty('--sidebar-border', '#444');
      root.style.setProperty('--sidebar-text', '#f1f1f1');
      root.style.setProperty('--chat-header-bg', '#000');
      root.style.setProperty('--chat-header-text', '#fff');
      root.style.setProperty('--chat-window-bg', '#a4a4a4'); // Dark mode chat window background (darker)
      root.style.setProperty('--chat-messages-bg', '#303030'); // Dark mode messages background
      root.style.setProperty('--message-user-bg', '#555');
      root.style.setProperty('--message-user-text', '#fff');
      root.style.setProperty('--message-bot-bg', '#7d7d7d');
      root.style.setProperty('--message-bot-text', '#ddd');
      root.style.setProperty('--input-bg', '#424242');
      root.style.setProperty('--input-border', '#666');
      root.style.setProperty('--send-button-bg', '#000');
      root.style.setProperty('--send-button-hover', '#222');
      root.style.setProperty('--input-container-bg', '#333');    // dark mode

    }
  }, [mode]);
  

  const toggleTheme = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 1000 }}>
        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </div>
      <Chat />
    </ThemeProvider>
  );
}

export default App;
