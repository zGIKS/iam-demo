"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GoogleButton } from "@/components/auth/GoogleButton";
import { OrDivider } from "@/components/auth/OrDivider";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { LoginPrompt } from "@/components/auth/LoginPrompt";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-6">
          <GoogleButton />
          <OrDivider />
          <SignUpForm />
          <LoginPrompt />
        </CardContent>
      </Card>
    </div>
  );
}
