import { Building2, Briefcase, GraduationCap, Globe2, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const TrustBadges = () => {
  const companies = [
    { 
      name: "Fortune 500", 
      icon: Building2,
      description: "Leading enterprises trust our platform"
    },
    { 
      name: "Startups", 
      icon: Rocket,
      description: "Fast-growing companies choose us"
    },
    { 
      name: "Enterprises", 
      icon: Briefcase,
      description: "Enterprise-grade security & reliability"
    },
    { 
      name: "Universities", 
      icon: GraduationCap,
      description: "Academic institutions rely on us"
    },
    { 
      name: "Global Teams", 
      icon: Globe2,
      description: "Teams worldwide use our solutions"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of organizations that rely on our platform to automate their workflows
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
                <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors duration-300">
                  <company.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-600">{company.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Join 10,000+ teams already using AutomateAI
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustBadges;
