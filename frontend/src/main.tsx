import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LangProvider } from './contexts/LangContext';
import App from './App';
import AdminLogin from './admin/pages/AdminLogin';
import AdminLayout from './admin/pages/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import JobList from './admin/pages/JobList';
import JobForm from './admin/pages/JobForm';
import CompanyList from './admin/pages/CompanyList';
import ApplicationList from './admin/pages/ApplicationList';
import './styles.css';
import './admin/admin.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route path="/" element={
          <ThemeProvider>
            <LangProvider>
              <App />
            </LangProvider>
          </ThemeProvider>
        } />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<JobList />} />
          <Route path="jobs/new" element={<JobForm />} />
          <Route path="jobs/:id" element={<JobForm />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="applications" element={<ApplicationList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
