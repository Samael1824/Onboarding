import { Routes, Route } from "react-router-dom";
import { LandingPage } from "@/features/landing/pages/LandingPage";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { RegisterPage } from "@/features/auth/pages/RegisterPage";
import { RequireAuth } from "@/features/auth/RequireAuth";
import { AppShell } from "@/shared/components/AppShell";
import { CountrySelectPage } from "@/features/country-select/pages/CountrySelectPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { CompanyFormPage } from "@/features/company-form/pages/CompanyFormPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppShell />}>
          <Route path="/select-country" element={<CountrySelectPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/onboarding/:applicationId/company" element={<CompanyFormPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
