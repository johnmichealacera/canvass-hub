import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { ProductFilters } from "@/components/product-filters";
import { CartIndicator } from "@/components/cart-indicator";
import { Suspense } from "react";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

async function getProducts(category?: string, search?: string) {
  const where: any = {
    status: "ACTIVE",
  };

  if (category && category !== "all") {
    where.category = category;
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.product.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });

  return { products, categories: categories.map(c => c.category) };
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const { products, categories } = await getProducts(
    params.category,
    params.search
  );

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Product Catalog</h1>
        <p className="text-muted-foreground">
          Browse our comprehensive product catalog and select items for your canvass request.
        </p>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <ProductFilters categories={categories} />
      </Suspense>

      <CartIndicator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
