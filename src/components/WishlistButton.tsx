import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface WishlistButtonProps {
  automationId: string;
  initialIsWishlisted?: boolean;
  onWishlistChange?: (isWishlisted: boolean) => void;
}

export function WishlistButton({ 
  automationId, 
  initialIsWishlisted = false,
  onWishlistChange 
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  const toggleWishlist = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/wishlist/${automationId}`, {
        method: isWishlisted ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update wishlist');
      }

      const newWishlistState = !isWishlisted;
      setIsWishlisted(newWishlistState);
      
      if (onWishlistChange) {
        onWishlistChange(newWishlistState);
      }

      toast.success(
        newWishlistState 
          ? 'Added to wishlist' 
          : 'Removed from wishlist'
      );
    } catch (error) {
      toast.error('Failed to update wishlist');
      console.error('Error updating wishlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant={isWishlisted ? "default" : "outline"}
        size="icon"
        onClick={toggleWishlist}
        disabled={isLoading}
        className={`h-8 w-8 relative overflow-hidden transition-all duration-300 ${
          isWishlisted 
            ? 'bg-primary hover:bg-primary/90' 
            : 'hover:bg-primary/10'
        }`}
      >
        <motion.div
          initial={false}
          animate={{
            scale: isWishlisted ? [1, 1.2, 1] : 1,
            rotate: isWishlisted ? [0, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              isWishlisted 
                ? 'fill-current text-white' 
                : 'text-primary'
            }`}
          />
        </motion.div>
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-primary/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </Button>
    </motion.div>
  );
} 