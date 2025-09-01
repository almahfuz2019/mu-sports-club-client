"use client";

import { useGetCurrentUserQuery } from "@/Redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import Loading from "../shared/Loading";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useGetCurrentUserQuery();
  const userInfo = data?.payload;
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  return <>{userInfo?.role === "admin" ? children : router.push("/login")}</>;
};

export default AdminRoute;
