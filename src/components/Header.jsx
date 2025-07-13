'use client';

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { useRouter, usePathname } from "next/navigation";
import { Book, Gamepad, Calendar, Video, Users } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    {
      title: "Schedule",
      path: "/schedule",
      icon: Calendar,
      description: "View and manage your teaching schedule"
    },
    {
      title: "Curate Quiz",
      path: "/assesment",
      icon: Book,
      description: "Create engaging quizzes for your students"
    },
    {
      title: "Training Videos", 
      path: "/resources",
      icon: Video,
      description: "Watch instructional videos and training materials"
    },
    {
      title: "Educational Games",
      path: "/games", 
      icon: Gamepad,
      description: "Access interactive educational games"
    },
    {
      title: "Attendance",
      path: "/attendence", 
      icon: Users,
      description: "Track student attendance"
    }
  ];

  return (
    <header className="md-surface-container-low md-elevation-1 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-outline-variant/10">
      <div className="flex items-center space-x-8">
        <motion.div 
          className="flex items-center space-x-4 cursor-pointer md-ripple-surface md-shape-corner-medium px-3 py-2" 
          onClick={() => router.push("/")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-12 h-12 md-primary-container md-shape-corner-large flex items-center justify-center"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <span className="md-typescale-title-large md-text-on-primary-container font-bold">VS</span>
          </motion.div>
          <div>
            <h1 className="md-typescale-title-large md-text-on-surface font-bold">VigyanSaathi</h1>
            <p className="md-typescale-body-small md-text-on-surface-variant">Empowering Education Together</p>
          </div>
        </motion.div>
        
        <NavigationMenu>
          <NavigationMenuList className="md-space-2">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavigationMenuLink
                    className={`group inline-flex h-12 w-max items-center justify-center md-shape-corner-full md-typescale-label-large px-6 py-3 transition-all duration-300 md-ripple-surface cursor-pointer border ${
                      pathname === item.path 
                        ? 'md-secondary-container md-text-on-secondary-container border-transparent md-elevation-1' 
                        : 'hover:md-surface-container-high md-text-on-surface border-transparent hover:border-outline-variant/20'
                    }`}
                    onClick={() => router.push(item.path)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.title}
                  </NavigationMenuLink>
                </motion.div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            variant="outline" 
            size="sm"
            className="md-outlined-button md-typescale-label-large border-outline hover:md-surface-container-high"
          >
            Help & Support
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Avatar className="md-shape-corner-full w-12 h-12 border-2 border-outline-variant">
            <AvatarImage src="" alt="Volunteer" />
            <AvatarFallback className="md-primary-container md-text-on-primary-container md-typescale-label-large font-bold">VT</AvatarFallback>
          </Avatar>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
