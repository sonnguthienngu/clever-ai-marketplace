import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

interface PricingTier {
  name: string;
  price: number;
  features: string[];
  discount?: number;
  recommended?: boolean;
}

interface PriceComparisonProps {
  tiers: PricingTier[];
  onSelect: (tier: PricingTier) => void;
  currentTier?: string;
}

export function PriceComparison({ tiers, onSelect, currentTier }: PriceComparisonProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card
            className={`relative group transition-all duration-300 hover:shadow-xl ${
              tier.recommended ? 'border-primary shadow-lg' : ''
            }`}
          >
            {tier.recommended && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Badge
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                  variant="default"
                >
                  Recommended
                </Badge>
              </motion.div>
            )}
            <CardHeader>
              <CardTitle className="text-center group-hover:text-primary transition-colors">
                {tier.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold">${tier.price}</span>
                  {tier.discount && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{tier.discount}% discount applied</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">per month</p>
              </motion.div>

              <ul className="space-y-2">
                {tier.features.map((feature, featureIndex) => (
                  <motion.li
                    key={featureIndex}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * featureIndex }}
                  >
                    <motion.svg
                      className="h-4 w-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 * featureIndex }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className={`w-full transition-all duration-300 ${
                    tier.recommended 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'hover:bg-primary/10'
                  }`}
                  variant={tier.recommended ? "default" : "outline"}
                  onClick={() => onSelect(tier)}
                  disabled={currentTier === tier.name}
                >
                  {currentTier === tier.name ? 'Current Plan' : 'Select Plan'}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

// Example usage:
const exampleTiers: PricingTier[] = [
  {
    name: "Basic",
    price: 29,
    features: [
      "1 Automation",
      "Basic Support",
      "Standard Features",
      "Monthly Updates"
    ]
  },
  {
    name: "Professional",
    price: 79,
    discount: 20,
    recommended: true,
    features: [
      "5 Automations",
      "Priority Support",
      "Advanced Features",
      "Weekly Updates",
      "API Access"
    ]
  },
  {
    name: "Enterprise",
    price: 199,
    discount: 30,
    features: [
      "Unlimited Automations",
      "24/7 Support",
      "Custom Features",
      "Daily Updates",
      "API Access",
      "Custom Integration"
    ]
  }
]; 