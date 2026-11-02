
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/layouts/MainLayout";
import PagePlaceholder from "./pages/PagePlaceHolder";

import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoutes";
import OAuth2CallbackPage from "./features/auth/pages/OAuth2CallbackPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public authentication routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/oauth2/callback" element={<OAuth2CallbackPage/>}/>

        {/* Protected application routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              index
              element={
                <PagePlaceholder
                  title="Find your next opportunity"
                  description="Explore career opportunities and find work that matches your skills."
                />
              }
            />

            <Route
              path="portfolio"
              element={
                <PagePlaceholder
                  title="Your portfolio"
                  description="Showcase your experience, projects, and professional skills."
                />
              }
            />

            <Route
              path="applications"
              element={
                <PagePlaceholder
                  title="My applications"
                  description="Track your job applications and their progress."
                />
              }
            />

            <Route
              path="community"
              element={
                <PagePlaceholder
                  title="Community"
                  description="Connect with professionals and grow your network."
                />
              }
            />

            <Route
              path="messages"
              element={
                <PagePlaceholder
                  title="Messages"
                  description="Your conversations will appear here."
                />
              }
            />

            <Route
              path="notifications"
              element={
                <PagePlaceholder
                  title="Notifications"
                  description="Stay up to date with your latest activity."
                />
              }
            />

            <Route
              path="profile"
              element={
                <PagePlaceholder
                  title="My profile"
                  description="Manage your professional profile and account settings."
                />
              }
            />
          </Route>
        </Route>

        {/* Not found */}
        <Route
          path="*"
          element={
            <PagePlaceholder
              title="Page not found"
              description="The page you requested does not exist."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
