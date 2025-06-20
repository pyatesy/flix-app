import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OptimizelyProvider } from '@optimizely/react-sdk';
import { UserProvider, useUserId } from './contexts/UserContext';
import optimizelyClient from './config/optimizely';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movie from './pages/Movie';
import MovieDetails from './pages/MovieDetails';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import LoadingOverlay from './components/LoadingOverlay';
import RegionOverlay from './components/RegionOverlay';
import ThemeProvider from './components/ThemeProvider';

const AppContent: React.FC = () => {
  const { userId } = useUserId();
  const [isLoading, setIsLoading] = useState(true);
  const [isOptimizelyReady, setIsOptimizelyReady] = useState(false);

  useEffect(() => {
    // Add cursor elements to the DOM
    const cursorInner = document.createElement('div');
    cursorInner.className = 'cursor-inner';
    document.body.appendChild(cursorInner);

    const cursorOuter = document.createElement('div');
    cursorOuter.className = 'cursor-outer';
    document.body.appendChild(cursorOuter);

    // Cleanup on unmount
    return () => {
      if (cursorInner.parentNode) document.body.removeChild(cursorInner);
      if (cursorOuter.parentNode) document.body.removeChild(cursorOuter);
    };
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await optimizelyClient.onReady();
        setIsOptimizelyReady(true);
        // Additional initialization...
        setIsLoading(false);
      } catch (error) {
        console.error('Initialization error:', error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading || !isOptimizelyReady) {
    return <LoadingOverlay />;
  }

  return (
    <Router>
      <div className="body-bg">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/movies" element={<Movie />} />
            <Route path="/movie/:slug" element={<MovieDetails />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <div id="back-top">
          <i className="fa-solid fa-chevron-up"></i>
        </div>
        <RegionOverlay />
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <OptimizelyProvider
        optimizely={optimizelyClient}
        user={{
          id: localStorage.getItem('userId') || '',
          attributes: {
            device: localStorage.getItem('device') || '',
            browser: localStorage.getItem('browser') || '',
            os: localStorage.getItem('os') || '',
            location: localStorage.getItem('user_country') || '',
          }
        }}
      >
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </OptimizelyProvider>
    </UserProvider>
  );
};

export default App;
