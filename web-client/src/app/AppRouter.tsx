import { BrowserRouter, Routes, Route } from "react-router";
import { Index } from "../routes";
import { Signup } from "../routes/signup";
import { Login } from "../routes/login";
import { RootLayout } from "../routes/RootLayout";
export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
