import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { AdminStats } from "@/components/admin-stats";
import { AdminCanvassRequests } from "@/components/admin-canvass-requests";
import { AdminProducts } from "@/components/admin-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getAdminStats() {
  const [
    totalRequests,
    pendingRequests,
    totalProducts,
    totalUsers,
  ] = await Promise.all([
    prisma.canvassRequest.count(),
    prisma.canvassRequest.count({ where: { status: "PENDING" } }),
    prisma.product.count(),
    prisma.user.count(),
  ]);

  return {
    totalRequests,
    pendingRequests,
    totalProducts,
    totalUsers,
  };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  const stats = await getAdminStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage canvass requests, products, and system overview
        </p>
      </div>

      <AdminStats stats={stats} />

      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList>
          <TabsTrigger value="requests">Canvass Requests</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="requests">
          <AdminCanvassRequests />
        </TabsContent>
        
        <TabsContent value="products">
          <AdminProducts />
        </TabsContent>
      </Tabs>
    </div>
  );
}
