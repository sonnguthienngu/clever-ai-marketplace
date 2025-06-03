
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Clock, TrendingUp, Users, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import TrustBadges from "@/components/TrustBadges";
import AutomationCard from "@/components/AutomationCard";

const Index = () => {
  const featuredAutomations = [
    {
      title: "Email Campaign Optimizer",
      description: "Automatically optimize email campaigns using AI-driven A/B testing and personalization",
      price: "$29/month",
      rating: 4.9,
      executions: "50K+",
      category: "Marketing"
    },
    {
      title: "Data Analysis Assistant",
      description: "Transform raw data into actionable insights with automated reporting and visualization",
      price: "$49/month", 
      rating: 4.8,
      executions: "75K+",
      category: "Analytics"
    },
    {
      title: "Customer Support Bot",
      description: "Intelligent chatbot that handles customer inquiries and escalates complex issues",
      price: "$39/month",
      rating: 4.7,
      executions: "100K+",
      category: "Support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Automate your business with
            <span className="text-emerald-600"> superhuman AI</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform time-consuming tasks into automated workflows. 
            Access thousands of AI automations built by experts, ready to deploy in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
              Start Automating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
              View Marketplace
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">500K+</div>
              <div className="text-gray-600">Automations Executed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2,500+</div>
              <div className="text-gray-600">AI Automations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Featured Automations */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured AI Automations</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most popular automations trusted by thousands of businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredAutomations.map((automation, index) => (
            <AutomationCard key={index} {...automation} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/marketplace">
            <Button variant="outline" size="lg" className="px-8 py-4">
              View All Automations
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why choose our AI marketplace?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Enterprise-Grade Security</h3>
                    <p className="text-gray-600">Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Scalable Infrastructure</h3>
                    <p className="text-gray-600">Handle millions of executions with auto-scaling cloud infrastructure.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Expert Support</h3>
                    <p className="text-gray-600">24/7 support from automation experts to help you succeed.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Zap className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Deploy automations in under 60 seconds</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Clock className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Save Time</h3>
                <p className="text-gray-600 text-sm">Reduce manual work by up to 80%</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <TrendingUp className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Boost ROI</h3>
                <p className="text-gray-600 text-sm">Average 300% return on investment</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Team Ready</h3>
                <p className="text-gray-600 text-sm">Collaborate with unlimited team members</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to automate your business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already saving time and money with AI automation.
          </p>
          
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg">
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
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
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/marketplace" className="hover:text-white">Marketplace</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
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
