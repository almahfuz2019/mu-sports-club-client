import { Frown } from "lucide-react";

const DataNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-6">
        <Frown className="w-24 h-24 text-gray-400 mx-auto" />{" "}
        {/* Icon for "not found" */}
        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Data Not Found
        </h1>
        <p className="mt-2 text-gray-600">
          We are sorry, but the Data you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default DataNotFound;
