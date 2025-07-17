import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import MemoryDetailPage from './pages/MemoryDetailPage';
import SettingsPage from './pages/SettingsPage';
import SharedLayout from './components/layout/SharedLayout';

function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(localStorage.getItem('onboardingComplete') === 'true');

  const handleOnboardingFinish = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setOnboardingComplete(true);
  };

  return (
    <Router>
      <Routes>
        {!onboardingComplete && <Route path="/*" element={<Navigate to="/onboarding" />} />} 
        <Route path="/onboarding" element={<OnboardingPage onFinish={handleOnboardingFinish} />} />
        {onboardingComplete && (
            <Route
              path="/*"
              element={
                <SharedLayout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/memory/:id" element={<MemoryDetailPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </SharedLayout>
              }
            />
        )}
      </Routes>
    </Router>
  );
}

export default App;
