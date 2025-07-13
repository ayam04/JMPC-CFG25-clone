import { Book, Users, Clock, Smartphone } from 'lucide-react';

const StatsHeader = () => {
  const stats = [
    {
      icon: Book,
      number: "25+",
      label: "Game Ideas",
      color: "from-primary-60 to-primary-80"
    },
    {
      icon: Users,
      number: "5",
      label: "Subject Areas", 
      color: "from-secondary-60 to-secondary-80"
    },
    {
      icon: Clock,
      number: "3",
      label: "Grade Levels",
      color: "from-tertiary-60 to-tertiary-80"
    },
  ];

  return (
    <div className="md-primary-container p-8 mb-8 md-shape-corner-large">
      <div className="max-w-6xl mx-auto">
        <h1 className="md-typescale-display-small md-text-on-primary-container text-center mb-8 font-bold">
          Classroom Game Portal
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="md-surface-container-high md-elevation-1 md-shape-corner-large p-6 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-3 md-text-primary" />
              <div className={`md-typescale-display-small font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                {stat.number}
              </div>
              <div className="md-typescale-body-medium md-text-on-surface font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;