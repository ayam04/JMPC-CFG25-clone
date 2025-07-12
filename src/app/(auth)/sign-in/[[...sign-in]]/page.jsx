import { SignIn } from "@clerk/nextjs";
import LoginForm from "../../../../components/LoginForm";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoginForm />
    </div>
  );
}
