"Use client";
import Achievements from "@/components/layout/Home/Achievements/Achievements";
import Breadcrumb from "./Breadcrumb/Breadcrumb";

export default function page() {
  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <Achievements />
    </div>
  );
}
