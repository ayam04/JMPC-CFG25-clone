import { Book, Users, Clock, Smartphone } from 'lucide-react';

const StatsHeader = () => {
  const stats = [
    {
      icon: Book,
      number: "25+",
      label: "Game Ideas",
      color: "text-orange-600"
    },
    {
      icon: Users,
      number: "5",
      label: "Subject Areas", 
      color: "text-orange-600"
    },
    {
      icon: Clock,
      number: "3",
      label: "Grade Levels",
      color: "text-orange-600"
    },
  ];

  return (
    <div className="bg-orange-500 p-8 mb-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Classroom Game Portal
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md">
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <div className="text-3xl font-bold text-orange-700 mb-1">{stat.number}</div>
              <div className="text-orange-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;