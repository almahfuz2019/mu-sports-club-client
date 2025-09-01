"use client";

import Loading from "@/components/layout/shared/Loading";
import { useGetCurrentUserQuery } from "@/Redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const isUser = (Component: any) => {
  return function IsUser(props: any) {
    const { data: currentUser, isLoading } = useGetCurrentUserQuery();
    const user = currentUser?.payload?.role === "user";
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && (!currentUser || !user)) {
        router.push("/login");
      }
    }, [user, currentUser, isLoading, router]);

    if (isLoading) {
      return <Loading />;
    }

    if (!currentUser || !user) {
      return null;
    }

    return <Component {...props} />;
  };
};

export default isUser;
