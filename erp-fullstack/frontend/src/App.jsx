import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerListPage from './pages/CustomerListPage';
import CustomerFormPage from './pages/CustomerFormPage';
import InquiryListPage from './pages/InquiryListPage';
import InquiryFormPage from './pages/InquiryFormPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken } from './services/authService';
import "./styles/app.css";

function App(){
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<ProtectedRoute><Layout/></ProtectedRoute>}>
        <Route index element={<Navigate to="/customers" replace />} />
        <Route path="customers" element={<CustomerListPage/>} />
        <Route path="customers/new" element={<CustomerFormPage/>} />
        <Route path="customers/:id/edit" element={<CustomerFormPage/>} />
        <Route path="inquiries" element={<InquiryListPage/>} />
        <Route path="inquiries/new" element={<InquiryFormPage/>} />
        <Route path="inquiries/:id/edit" element={<InquiryFormPage/>} />
      </Route>

      <Route path="*" element={<Navigate to={ getToken() ? '/' : '/login'} />} />
    </Routes>
  );
}

export default App;
