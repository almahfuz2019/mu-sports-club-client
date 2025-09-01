"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useHandleResetPasswordMutation } from "@/Redux/features/auth/authApi";
import dynamic from "next/dynamic";
import PublicRoute from "@/components/layout/routes/PublicRoute";
interface ResetPasswordReq {
  newPassword: string;
  password: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordReq>();
  const [showNewPassword, setNewPassword] = useState<boolean>(false);
  const [showPassword, setPassword] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);

  const [handleResetPassword, { isLoading }] = useHandleResetPasswordMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetPasswordReq> = async (data) => {
    console.log(data);
    if (!token) {
      toast.error("Token is missing. Please try again.");
      return;
    }
    try {
      await handleResetPassword({ token, password: data?.password }).unwrap();
      toast.success("Successfully reset password! Please Login");

      router.push("/login");
    } catch (error: any) {
      toast.error(error?.data?.payload?.message || "An error occurred");
    }
  };
  return (
    <PublicRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Card className="border-2">
            <CardHeader className="space-y-3">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <LogIn className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="New Password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      {...register("newPassword", {
                        required: "New Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          message:
                            "Password must include a letter, a number, and a special character",
                        },
                      })}
                      className={
                        errors.password ? "border-destructive pr-10" : "pr-10"
                      }
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() => setNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showNewPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="New Password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("newPassword") ||
                          "Passwords do not match",
                      })}
                      className={
                        errors.password ? "border-destructive pr-10" : "pr-10"
                      }
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      onClick={() => setPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <Eye className="w-5 h-5" />
                      ) : (
                        <EyeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      " Sign in"
                    )}
                  </Button>

                  <div className="text-sm text-center text-muted-foreground">
                    Forgot your password?{" "}
                    <Link
                      href="/forgot-password"
                      className="text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      Reset it here
                    </Link>
                  </div>
                  <div className="text-sm text-center text-muted-foreground">
                    Do not have account?{" "}
                    <Link
                      href="/registration"
                      className="text-primary hover:text-primary/80 hover:underline transition-colors"
                    >
                      sign up here
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicRoute>
  );
};

export default dynamic(() => Promise.resolve(ResetPassword), { ssr: false });
