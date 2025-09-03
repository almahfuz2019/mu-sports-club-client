"Use client";
import EventsCards from "@/components/layout/Home/Events/EventsCards/EventsCards";
import Breadcrumb from "./Breadcrumb/Breadcrumb";

export default function page() {
  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <EventsCards />
    </div>
  );
}
