import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { ValidatedInput } from "./ValidatedInput";
import { useState } from "react";

export function SignUpForm() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleEmailChange = (value: string, isValid: boolean) => {
    setEmail(value);
    updateFormValidity(value, password, confirmPassword, isValid && !!password && !!confirmPassword && confirmPassword === password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
  };

  const handlePasswordChange = (value: string, isValid: boolean) => {
    setPassword(value);
    updateFormValidity(email, value, confirmPassword, isValid && !!email && !!confirmPassword && confirmPassword === value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
    updateFormValidity(email, password, value, !!email && !!password && !!value && value === password && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8);
  };

  const updateFormValidity = (emailVal: string, passVal: string, confVal: string, valid: boolean) => {
    setIsFormValid(valid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle sign up logic here
      console.log("Signing up with", email, password);
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
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={`pr-10 ${confirmError ? "border-destructive" : ""}`}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {confirmError && <p className="text-sm text-destructive">{confirmError}</p>}
      </div>
      <Button type="submit" className="w-full mt-4" disabled={!isFormValid}>
        Sign up
      </Button>
    </form>
  );
}