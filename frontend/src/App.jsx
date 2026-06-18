import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatbotWidget from './components/ChatbotWidget';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import TransactionHistory from './pages/TransactionHistory';
import DepositMoney from './pages/DepositMoney';
import WithdrawMoney from './pages/WithdrawMoney';
import TransferMoney from './pages/TransferMoney';
import AdminDashboardOverview from './pages/AdminDashboardOverview';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/deposit" element={<DepositMoney />} />
        <Route path="/withdraw" element={<WithdrawMoney />} />
        <Route path="/transfer" element={<TransferMoney />} />
        <Route path="/admin/dashboard" element={<AdminDashboardOverview />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatbotWidget />
    </BrowserRouter>
  );
}

export default App;
