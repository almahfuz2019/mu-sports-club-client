"use client";

import { useHandleFindSingleAllCommitteeQuery } from "@/Redux/features/allCommittee/allCommittee";
import { ParamsSlug } from "@/Type/IFields";
import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Image from "next/image";

const UpdatePage: React.FC<{ params: Promise<ParamsSlug> }> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const { data, isLoading } = useHandleFindSingleAllCommitteeQuery(slug);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

  return (
    <div>
      {/* Breadcrumb */}
      {isLoading ? (
        <div className="h-6 w-48 bg-gray-300 rounded mb-8 animate-pulse"></div>
      ) : (
        <Breadcrumb year={data?.payload?.year} />
      )}

      <div className="px-[5%] py-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full h-64 bg-gray-300 rounded animate-pulse"
                ></div>
              ))
            : data?.payload?.image.map((img: any, i: number) => (
                <Image
                  key={i}
                  src={img}
                  alt={data?.payload?.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-fit"
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;
