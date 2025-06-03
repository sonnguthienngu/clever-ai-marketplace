
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for testing and small automations",
      features: [
        "3 automation executions per month",
        "Basic templates",
        "Community support",
        "Standard integrations",
        "Email notifications"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Professional",
      price: "$49",
      period: "per month",
      description: "For growing businesses and teams",
      features: [
        "10,000 automation executions per month",
        "Premium templates",
        "Priority support",
        "Advanced integrations",
        "Custom webhooks",
        "Team collaboration",
        "Analytics dashboard",
        "API access"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited automation executions",
        "Custom automation development",
        "Dedicated account manager",
        "Premium integrations",
        "White-label solutions",
        "Advanced security",
        "SLA guarantee",
        "On-premise deployment"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your automation needs. 
            Start free and scale as you grow.
          </p>
          
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg flex">
              <button className="px-6 py-2 bg-white rounded-md shadow-sm font-medium text-gray-900">
                Monthly
              </button>
              <button className="px-6 py-2 text-gray-600 hover:text-gray-900">
                Annual
                <Badge className="ml-2 bg-emerald-100 text-emerald-700">Save 20%</Badge>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-sm border-2 p-8 relative ${
                  plan.popular 
                    ? "border-emerald-500 transform scale-105" 
                    : "border-gray-200"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    )}
                  </div>
                  
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What counts as an automation execution?
                </h3>
                <p className="text-gray-600">
                  An execution is counted each time an automation runs successfully. 
                  For example, if you have an email automation that sends 100 emails, 
                  that counts as 1 execution.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I upgrade or downgrade my plan anytime?
                </h3>
                <p className="text-gray-600">
                  Yes, you can change your plan at any time. Upgrades take effect immediately, 
                  and downgrades take effect at the next billing cycle.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you offer custom enterprise solutions?
                </h3>
                <p className="text-gray-600">
                  Absolutely! Our Enterprise plan includes custom automation development, 
                  dedicated support, and can be tailored to your specific needs.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes, all paid plans come with a 14-day free trial. 
                  No credit card required to start.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to automate your business?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Start your free trial today and experience the power of AI automation.
          </p>
          
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
            Start Free Trial
            <Zap className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
