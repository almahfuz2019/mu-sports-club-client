"use client";

import { useGetCurrentUserQuery } from "@/Redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../shared/Loading";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetCurrentUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  useEffect(() => {
    if (userInfo?.email) {
      router.push("/dashboard");
    }
  }, [userInfo, router]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{!userInfo?.email ? children : null}</>;
};

export default PublicRoute;
