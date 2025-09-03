"Use client";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Notice from "@/components/layout/Home/Notice/Notice";

export default function page() {
  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <Notice />
    </div>
  );
}
