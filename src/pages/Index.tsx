import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock, TrendingUp, Users, CheckCircle, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TrustBadges from "@/components/TrustBadges";
import AutomationCard from "@/components/AutomationCard";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const Index = () => {
  const featuredAutomations = [
    {
      title: "Email Campaign Optimizer",
      description: "Automatically optimize email campaigns using AI-driven A/B testing and personalization",
      price: "$29/month",
      rating: 4.9,
      executions: "50K+",
      category: "Marketing",
      icon: <Sparkles className="h-6 w-6 text-emerald-500" />
    },
    {
      title: "Data Analysis Assistant",
      description: "Transform raw data into actionable insights with automated reporting and visualization",
      price: "$49/month", 
      rating: 4.8,
      executions: "75K+",
      category: "Analytics",
      icon: <TrendingUp className="h-6 w-6 text-emerald-500" />
    },
    {
      title: "Customer Support Bot",
      description: "Intelligent chatbot that handles customer inquiries and escalates complex issues",
      price: "$39/month",
      rating: 4.7,
      executions: "100K+",
      category: "Support",
      icon: <Users className="h-6 w-6 text-emerald-500" />
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <motion.div 
          className="max-w-4xl mx-auto relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium">
            🚀 The Future of Automation is Here
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            Automate your business with
            <span className="block mt-2">superhuman AI</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform time-consuming tasks into automated workflows. 
            Access thousands of AI automations built by experts, ready to deploy in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Automating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg rounded-full border-2 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300"
            >
              View Marketplace
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { value: "500K+", label: "Automations Executed" },
              { value: "2,500+", label: "AI Automations" },
              { value: "99.9%", label: "Uptime Guarantee" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Automations */}
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured AI Automations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular automations trusted by thousands of businesses
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredAutomations.map((automation, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AutomationCard {...automation} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/marketplace">
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 rounded-full border-2 hover:border-emerald-600 hover:text-emerald-600 transition-all duration-300"
            >
              View All Automations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gradient-to-b from-white to-emerald-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why choose our AI marketplace?
              </h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Enterprise-Grade Security",
                    description: "Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.",
                    icon: <CheckCircle className="h-6 w-6 text-emerald-600 mt-1" />
                  },
                  {
                    title: "Scalable Infrastructure",
                    description: "Handle millions of executions with auto-scaling cloud infrastructure.",
                    icon: <CheckCircle className="h-6 w-6 text-emerald-600 mt-1" />
                  },
                  {
                    title: "Expert Support",
                    description: "24/7 support from automation experts to help you succeed.",
                    icon: <CheckCircle className="h-6 w-6 text-emerald-600 mt-1" />
                  }
                ].map((benefit, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {benefit.icon}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: <Zap className="h-10 w-10 text-emerald-600" />,
                  title: "Lightning Fast",
                  description: "Deploy automations in under 60 seconds"
                },
                {
                  icon: <Clock className="h-10 w-10 text-emerald-600" />,
                  title: "Save Time",
                  description: "Reduce manual work by up to 80%"
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-emerald-600" />,
                  title: "Boost ROI",
                  description: "Average 300% return on investment"
                },
                {
                  icon: <Users className="h-10 w-10 text-emerald-600" />,
                  title: "Team Ready",
                  description: "Collaborate with unlimited team members"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {feature.icon}
                  <h3 className="font-semibold text-gray-900 mb-2 mt-4">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to automate your business?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already saving time and money with AI automation.
            </p>
            
            <Button 
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-emerald-400" />
                <span className="text-xl font-bold">AutomateAI</span>
              </div>
              <p className="text-gray-400">
                The world's largest marketplace for AI automations.
              </p>
            </div>
            
            {[
              {
                title: "Product",
                links: [
                  { label: "Marketplace", href: "/marketplace" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "API", href: "#" },
                  { label: "Documentation", href: "#" }
                ]
              },
              {
                title: "Company",
                links: [
                  { label: "About", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Contact", href: "#" }
                ]
              },
              {
                title: "Support",
                links: [
                  { label: "Help Center", href: "#" },
                  { label: "Community", href: "#" },
                  { label: "Status", href: "#" },
                  { label: "Security", href: "#" }
                ]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.href} 
                        className="hover:text-white transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AutomateAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
