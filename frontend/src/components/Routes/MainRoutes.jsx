import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// 1. Lazy Loading Components
const Dashboard = lazy(() => import("../Pages/Dashboard"));
const MyVault = lazy(() => import("../Pages/MyVault"));
const Community = lazy(() => import("../Pages/Community"));
const Auth = lazy(() => import("../Pages/Auth"));
const PromptDetail = lazy(() => import("../Pages/PromptDetail"));
const Profile = lazy(() => import("../Pages/Profile"));

// 2. Simple Loading Spinner Component for Suspense
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen bg-[#F4F7F6]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9E20]"></div>
  </div>
);

// 3. Protected Route Wrapper (Aapki cookie/token check karne ke liye)
const ProtectedRoute = ({ children }) => {
  
  // Filhaal hum check kar rahe hain ki user logged in hai ya nahi (Aap apne auth state ke mutabik badal sakte hain)
  const isAuthenticated = true; // Agar token hai toh true, warna false

  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

const MainRoutes = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/prompt/:id" element={<PromptDetail />} />

          {/* Protected Routes  */}
          <Route
            path="/myvault"
            element={
              <ProtectedRoute>
                <MyVault />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center h-screen text-2xl font-bold text-gray-500 bg-[#F4F7F6]">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MainRoutes;
