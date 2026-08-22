import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ClubsPage from '../pages/ClubsPage';
import ClubDetailPage from '../pages/ClubDetailPage';
import EventsPage from '../pages/EventsPage';
import AnnouncementsPage from '../pages/AnnouncementsPage';
import StudentDashboard from '../pages/StudentDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import { USER_ROLES } from '../utils/constants';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/clubs" element={<ClubsPage />} />
      <Route path="/clubs/:id" element={<ClubDetailPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />

      {/* Protected Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT, USER_ROLES.ADMIN]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/my-clubs"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT, USER_ROLES.ADMIN]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/my-events"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.STUDENT, USER_ROLES.ADMIN]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clubs"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Fallback 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
