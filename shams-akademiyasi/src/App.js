import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import Library from './components/Library';
import Courses from './pages/Courses';
import Test from './components/Test';
import AIAssistant from './components/AIAssistant';
import Notifications from './components/Notifications';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div>
            <Notifications />
            <Routes>
              <Route path="/" element={<Courses />} />
              <Route path="/library" element={<Library />} />
              <Route path="/test/:id" element={<Test />} />
            </Routes>
            <AIAssistant open={false} onClose={() => {}} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
