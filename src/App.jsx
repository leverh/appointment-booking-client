import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import BookingPage from './components/BookingPage.jsx';
import Header from './components/Header.jsx';

function App() {
  const [showBooking, setShowBooking] = useState(false);

  const handleBookNow = () => {
    setShowBooking(true);
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setShowBooking(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      {!showBooking ? (
        <LandingPage onBookNow={handleBookNow} />
      ) : (
        <>
          <Header onBackToHome={handleBackToHome} />
          <BookingPage />
        </>
      )}
    </div>
  );
}

export default App;