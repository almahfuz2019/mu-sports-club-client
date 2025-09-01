"use client";

import { useHandleSingUpMutation } from "@/Redux/features/user/userApi";
import PublicRoute from "@/components/layout/routes/PublicRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ActiveAccount = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [setActiveAccount] = useHandleSingUpMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [activationSuccess, setActivationSuccess] = useState<boolean | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);

  useEffect(() => {
    const activateAccount = async () => {
      if (token) {
        setLoading(true);
        try {
          await setActiveAccount({ token }).unwrap();
          setActivationSuccess(true);
          setTimeout(() => router.push("/login"), 2000);
        } catch (error: any) {
          console.error(error);
          toast.error(error?.data?.payload?.message || "Failed activation");
          setActivationSuccess(false);
        } finally {
          setLoading(false);
        }
      }
    };

    activateAccount();
  }, [token, setActiveAccount, router]);

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card
            className={`
          border-2 transition-all duration-500 transform
          ${loading ? "animate-pulse" : ""}
          ${activationSuccess === true ? "border-green-500/50 scale-105" : ""}
          ${activationSuccess === false ? "border-destructive/50 scale-95" : ""}
        `}
          >
            <CardHeader className="space-y-3">
              <div className="flex justify-center">
                <div
                  className={`
                rounded-full p-4 transition-colors duration-500
                ${loading ? "bg-primary/10" : ""}
                ${activationSuccess === true ? "bg-green-500/10" : ""}
                ${activationSuccess === false ? "bg-destructive/10" : ""}
              `}
                >
                  {loading ? (
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  ) : activationSuccess === true ? (
                    <CheckCircle2 className="h-12 w-12 text-green-500 animate-in zoom-in duration-500" />
                  ) : activationSuccess === false ? (
                    <XCircle className="h-12 w-12 text-destructive animate-in zoom-in duration-500" />
                  ) : (
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
                Account Activation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                {loading ? (
                  <div className="text-lg font-medium text-muted-foreground animate-pulse">
                    Activating your account...
                  </div>
                ) : activationSuccess === true ? (
                  <div className="space-y-2 animate-in fade-in-50 duration-500">
                    <p className="text-lg font-medium text-green-500">
                      Account activated successfully!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Redirecting you to the homepage...
                    </p>
                  </div>
                ) : activationSuccess === false ? (
                  <div className="space-y-2 animate-in fade-in-50 duration-500">
                    <p className="text-lg font-medium text-destructive">
                      Activation failed
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Please try again or contact support
                    </p>
                  </div>
                ) : (
                  <div className="text-lg font-medium text-muted-foreground">
                    Preparing activation...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicRoute>
  );
};

export default dynamic(() => Promise.resolve(ActiveAccount), { ssr: false });
