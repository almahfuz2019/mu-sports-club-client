"Use client";
import EventsCards from "@/components/layout/Home/Events/EventsCards/EventsCards";
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import EventsCalendar from "@/components/layout/Home/Events/EventsCalendar/EventsCalendar";

export default function page() {
  return (
    <div className="bg-ghost-white">
      <Breadcrumb />
      <EventsCalendar />
      <EventsCards />
    </div>
  );
}
