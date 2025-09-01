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
import { useHandleForgotPasswordMutation } from "@/Redux/features/auth/authApi";
import { KeyRound, Loader2 } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ForgotReq {
  email: string;
}
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotReq>();

  const [handleForgotPassword, { isLoading }] =
    useHandleForgotPasswordMutation();

  const onSubmit: SubmitHandler<ForgotReq> = async (data) => {
    console.log(data);
    try {
      await handleForgotPassword(data).unwrap();
      toast.success("Check email and reset password.");
    } catch (error: any) {
      console.log(error);
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
                  <KeyRound className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email
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

                <div className="space-y-4">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Forgot your password"
                    )}
                  </Button>

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

export default ForgotPassword;
