"use client";
import PublicRoute from "@/components/layout/routes/PublicRoute";
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
import { useHandleLoginMutation } from "@/Redux/features/auth/authApi";
import { Loader2, LogIn, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface LoginReq {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginReq>();
  const [showPassword, setShowPassword] = useState(false);

  const [handleLogin, { isLoading: handleLoginLoading }] =
    useHandleLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginReq> = async (data) => {
    console.log(data);
    try {
      await handleLogin(data).unwrap();
      toast.success("Successfully logged in!");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message || "An error occurred");
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
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address",
                      },
                    })}
                    className={errors.email ? "border-destructive" : ""}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
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
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={handleLoginLoading}
                  >
                    {handleLoginLoading ? (
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

export default Login;
