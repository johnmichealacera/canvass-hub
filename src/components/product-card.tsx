"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCanvass } from "@/lib/canvass-context";
import { Toast } from "@/components/toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { addItem } = useCanvass();

  const handleAddToCanvass = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description || undefined,
      category: product.category,
      imageUrl: product.imageUrl || undefined,
      quantity,
    });
    
    // Reset quantity after adding
    setQuantity(1);
    
    // Show toast notification
    setShowToast(true);
  };

  return (
    <Card className="overflow-hidden">
      {product.imageUrl && (
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {product.category}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {product.description && (
          <p className="text-sm text-muted-foreground">
            {product.description}
          </p>
        )}
        
        <div className="space-y-2">
          <Label htmlFor={`quantity-${product.id}`}>Quantity</Label>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              id={`quantity-${product.id}`}
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={handleAddToCanvass}
          className="w-full"
          disabled={quantity < 1}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Canvass
        </Button>
      </CardContent>
      
      <Toast
        message={`Added ${quantity} ${product.name}(s) to your canvass!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </Card>
  );
}
