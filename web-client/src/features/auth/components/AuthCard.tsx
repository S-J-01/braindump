import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};
export const AuthCard = ({ title, subtitle, children }: AuthCardProps) => {
  return (
    <div>
      <h1>{title}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
      <div>{children}</div>
    </div>
  );
};
