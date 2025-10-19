"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, BarChart3, ArrowRight, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Streamline Your{" "}
            <span className="text-primary">Procurement Process</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            CanvassHub connects your business with suppliers through a professional 
            canvassing platform. No more browsing prices - let us handle the sourcing for you.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">
              Browse Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/auth/signup">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform simplifies the procurement process by connecting you with 
            qualified suppliers who compete for your business.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Package className="h-6 w-6 text-primary" />
                <CardTitle>1. Select Products</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Browse our comprehensive product catalog and select the items you need 
                for your business. No prices shown - just quality products.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-primary" />
                <CardTitle>2. Submit Request</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create a canvass request with your selected products and any specific 
                requirements. Our team will review and match you with suppliers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle>3. Receive Quotes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Qualified suppliers will submit competitive quotes for your consideration. 
                Choose the best option for your business needs.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Why Choose CanvassHub?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make procurement simple, efficient, and cost-effective for businesses of all sizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">No Price Shopping</h3>
                <p className="text-sm text-muted-foreground">
                  Focus on product quality and specifications, not price comparison.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">Professional Sourcing</h3>
                <p className="text-sm text-muted-foreground">
                  Our team handles supplier vetting and qualification for you.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">Competitive Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Suppliers compete for your business, ensuring the best value.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">Time Savings</h3>
                <p className="text-sm text-muted-foreground">
                  Skip the research and let us handle supplier outreach.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  All suppliers are pre-vetted for quality and reliability.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h3 className="font-semibold">Easy Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your requests and quotes in one centralized platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 bg-muted/50 rounded-lg p-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join businesses that trust CanvassHub for their procurement needs. 
            Start your first canvass request today.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/auth/signup">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
