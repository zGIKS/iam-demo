"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { OrDivider } from "@/components/auth/OrDivider";
import { SignInForm } from "@/components/auth/SignInForm";
import { SignUpPrompt } from "@/components/auth/SignUpPrompt";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6">
          <GoogleButton />
          <OrDivider />
          <SignInForm />
          <SignUpPrompt />
        </CardContent>
      </Card>
    </div>
  );
}