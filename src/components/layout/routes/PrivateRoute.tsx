"use client";

import { useGetCurrentUserQuery } from "@/Redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Loading from "../shared/Loading";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetCurrentUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (!userInfo?.email) {
      router.push("/login");
    }
  }, [userInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{userInfo?.email ? children : null}</>;
};

export default PrivateRoute;
