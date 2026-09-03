import { useState, type SubmitEventHandler } from "react";
import { AuthCard } from "../features/auth/components/AuthCard";
import { useLogin } from "../features/auth/mutations";

export const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <AuthCard title="Log In" subtitle="Log In To Continue">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging In ..." : "Log In"}
        </button>
        {loginMutation.isError ? <p>Log In Failed</p> : null}
      </form>
    </AuthCard>
  );
};
