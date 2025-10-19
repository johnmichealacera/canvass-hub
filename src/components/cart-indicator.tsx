"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCanvass } from "@/lib/canvass-context";
import Link from "next/link";

export function CartIndicator() {
  const { getTotalItems, getTotalQuantity } = useCanvass();

  if (getTotalItems() === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-primary">
                  {getTotalItems()} items in your canvass
                </p>
                <p className="text-sm text-muted-foreground">
                  Total quantity: {getTotalQuantity()}
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="/canvass/new">
                Review Canvass
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
