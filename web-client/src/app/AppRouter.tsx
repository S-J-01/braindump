import { BrowserRouter, Routes, Route } from "react-router";
import { Index } from "../routes";
import { Signup } from "../routes/signup";
import { Login } from "../routes/login";
import { RootLayout } from "../routes/RootLayout";
import { ProtectedRoute } from "../features/auth/components/ProtectedRoute";
import { AppPage } from "../routes/app";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="app" element={<AppPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
