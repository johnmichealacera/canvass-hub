"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCanvass } from "@/lib/canvass-context";
import { PDFUpload } from "@/components/pdf-upload";

export default function CreateCanvassPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { state, updateQuantity, removeItem, clearCart } = useCanvass();
  const [notes, setNotes] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state.items.length === 0 && !pdfUrl) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/canvass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: state.items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
          notes,
          pdfUrl: pdfUrl || null,
        }),
      });

      if (response.ok) {
        clearCart();
        router.push("/canvass?success=true");
      } else {
        console.error("Failed to create canvass request");
      }
    } catch (error) {
      console.error("Error creating canvass request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Canvass Request</h1>
          <p className="text-muted-foreground">
            Review your selected products and submit your canvass request
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Selected Items */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Selected Items</span>
                  <Badge variant="secondary">{state.items.length} items</Badge>
                </CardTitle>
                <CardDescription>
                  Review and adjust quantities for your canvass request
                </CardDescription>
              </CardHeader>
              <CardContent>
                {state.items.length > 0 ? (
                  <div className="space-y-4">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No items selected</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can either add products or upload a PDF document
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Request Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>
                  Add any specific requirements or notes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Add specifications</label>
                  <Textarea
                    id="notes"
                    placeholder="Add any specific requirements, delivery preferences, or other notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>

            <PDFUpload
              onUpload={setPdfUrl}
              onRemove={() => setPdfUrl("")}
              currentUrl={pdfUrl}
            />

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Items:</span>
                  <span className="font-medium">{state.items.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Quantity:</span>
                  <span className="font-medium">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                {pdfUrl && (
                  <div className="flex justify-between">
                    <span>PDF Document:</span>
                    <span className="font-medium text-green-600">Attached</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={(state.items.length === 0 && !pdfUrl) || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Canvass Request"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}