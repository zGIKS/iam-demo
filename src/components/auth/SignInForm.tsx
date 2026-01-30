import { Button } from "@/components/ui/button";
import { ValidatedInput } from "./ValidatedInput";
import { useState } from "react";

export function SignInForm() {
  const [isFormValid, setIsFormValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    updateFormValidity(value, password, isValid && !!password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
    updateFormValidity(email, value, isValid && !!email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  const updateFormValidity = (emailVal: string, passVal: string, valid: boolean) => {
    setIsFormValid(valid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle sign in logic here
      console.log("Signing in with", email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <ValidatedInput
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        label="Enter your email"
        required
        onValueChange={handleEmailChange}
      />
      <ValidatedInput
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        label="Password"
        required
        onValueChange={handlePasswordChange}
      />
      <Button type="submit" className="w-full mt-4" disabled={!isFormValid}>
        Sign in
      </Button>
    </form>
  );
}