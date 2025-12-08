import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage.jsx';
import BookingPage from './components/BookingPage.jsx';
import Header from './components/Header.jsx';

// Wrapper component for BookingPage with Header
function BookingPageWithHeader() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header showBackButton={true} onBackToHome={handleBackToHome} />
      <BookingPage />
    </>
  );
}

// Wrapper component for LandingPage
function LandingPageWrapper() {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
    window.scrollTo(0, 0);
  };

  return <LandingPage onBookNow={handleBookNow} />;
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPageWrapper />} />
          <Route path="/booking" element={<BookingPageWithHeader />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;