// app/eventNotifier.js (Next.js - using client side notifications)
"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const rainbowColors = {
  violet: "#8A2BE2",
  blue: "#4169E1", 
  orange: "#FFA500",
  red: "#FF0000",
};

const notify = (message, color) => {
  toast(message, {
    style: {
      backgroundColor: color,
      color: "white",
    },
    autoClose: 8000,
  });
};

export default function EventNotifier() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    console.log("EventNotifier mounted on client"); // Debug log
    
    // Define events only on client side to avoid hydration mismatch
    const events = [
      {
        id: 1,
        title: "District Level Science Fair",
        time: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes from now
      },
      {
        id: 2,
        title: "Inter-school Debate Competition", 
        time: new Date(Date.now() + 1000 * 60 * 60 * 26), // 26 hours from now
      },
      {
        id: 3,
        title: "Annual Sports Meet",
        time: new Date(Date.now() + 1000 * 60 * 60 * 121), // 121 hours from now
      },
    ];

    const setupNotifications = () => {
      console.log("Setting up notifications..."); // Debug log
      
      events.forEach((event) => {
        const notifyAtOffsets = [120, 24, 1, 0.25, 0, -0.083]; // in hours
        const labels = [
          "is happening in 120 hours",
          "is happening in 24 hours", 
          "is happening in 1 hour",
          "is happening in 15 minutes",
          "is happening now!",
          "You are 5 minutes late for"
        ];
        const colors = [
          rainbowColors.violet,
          rainbowColors.blue,
          rainbowColors.orange,
          rainbowColors.orange,
          rainbowColors.red,
          rainbowColors.red,
        ];

        notifyAtOffsets.forEach((offset, index) => {
          const notifyTime = new Date(event.time.getTime() - offset * 60 * 60 * 1000);
          const delay = notifyTime - new Date();
          
          console.log(`Event: ${event.title}, Offset: ${offset}h, Delay: ${delay}ms`); // Debug log
          
          if (delay > 0) {
            setTimeout(() => {
              console.log(`Triggering notification: ${event.title} ${labels[index]}`); // Debug log
              notify(`${event.title} ${labels[index]}`, colors[index]);
            }, delay);
          } else {
            console.log(`Skipping notification (already passed): ${event.title} - ${labels[index]}`);
          }
        });
      });
    };

    // Test notification after 3 seconds to verify it's working
    setTimeout(() => {
      notify("Science fair near your area!!", rainbowColors.blue);
    }, 3000);

    setupNotifications();
  }, [isClient]);

  // This component doesn't render anything visible - it just sets up notifications
  return null;
}