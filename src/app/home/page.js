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
    <div className="md-surface">
      <Header className="sticky top-0 z-50" />
      <main className="relative">
        <CoverPage />
        <EventsSection />
        <ImpactSection />
        <VolunteersSection />
        <ReviewsPage />
        <OurSupporters />
      </main>
      <Footer />
      
      {/* Material 3 Floating Elements */}
      <FloatingChatWidget />
      <EventNotifier />
    </div>
  );
}