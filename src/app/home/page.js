// import { db } from "@/utils/firebase"
// import { ActivityCard } from "../../components/testCards/ActivityCard.jsx";
import ImpactSection from "../../components/ImpactSection";
import CoverPage from "../../components/CoverPage";
import Header from "../../components/Header";
import VolunteersSection from "../../components/VolunteerSection";
import ReviewsPage from "../../components/ReviewsPage";
import OurSupporters from "../../components/OurSupporters";
import Footer from "../../components/Footer";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import EventsSection from "@/components/eventMap2";
import EventNotifier from "@/components/EventNotifier";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start"></main>
      <Header className="row-start-1 w-full " />
      <CoverPage />
      <EventsSection />
      {/* <ActivityCard /> */}
      <ImpactSection />
      <VolunteersSection />
      <ReviewsPage />
      <OurSupporters />
      <Footer />
      
      {/* Add the floating chat widget */}
      <FloatingChatWidget />
    </div>
  );
}