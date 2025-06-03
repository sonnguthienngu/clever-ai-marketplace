
import { Building2, Briefcase, GraduationCap, Globe2, Rocket } from "lucide-react";

const TrustBadges = () => {
  const companies = [
    { name: "Fortune 500", icon: Building2 },
    { name: "Startups", icon: Rocket },
    { name: "Enterprises", icon: Briefcase },
    { name: "Universities", icon: GraduationCap },
    { name: "Global Teams", icon: Globe2 },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-wider">
          Trusted by teams at
        </p>
        
        <div className="flex justify-center items-center space-x-12 md:space-x-16 opacity-60">
          {companies.map((company, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <company.icon className="h-8 w-8 text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">{company.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
