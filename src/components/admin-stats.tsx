import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart, Clock } from "lucide-react";

interface AdminStatsProps {
  stats: {
    totalRequests: number;
    pendingRequests: number;
    totalProducts: number;
    totalUsers: number;
  };
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: "Total Requests",
      value: stats.totalRequests,
      description: "All canvass requests",
      icon: ShoppingCart,
    },
    {
      title: "Pending Requests",
      value: stats.pendingRequests,
      description: "Awaiting review",
      icon: Clock,
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      description: "In catalog",
      icon: Package,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "Registered users",
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
