import React from "react";

const Heading = ({ title, subTitle }: { title: string; subTitle: string }) => {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">{subTitle}</p>
    </div>
  );
};

export default Heading;
