import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-3">
      <Label htmlFor="email">
        Enter your email
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        required
      />
      <Label htmlFor="password">
        Password
      </Label>
      <div className="relative">
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          required
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      <Button type="submit" className="w-full mt-4">
        Sign in
      </Button>
    </div>
  );
}