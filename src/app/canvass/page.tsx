import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CanvassRequestCard } from "@/components/canvass-request-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

async function getCanvassRequests(userId: string) {
  return await prisma.canvassRequest.findMany({
    where: { userId },
    include: {
      canvassItems: {
        include: {
          product: true,
        },
      },
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function CanvassPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/signin");
  }

  const canvassRequests = await getCanvassRequests(session.user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Canvass Requests</h1>
          <p className="text-muted-foreground">
            Track the status of your procurement requests
          </p>
        </div>
        <Button asChild>
          <Link href="/canvass/new">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      {canvassRequests.length > 0 ? (
        <div className="space-y-4">
          {canvassRequests.map((request) => (
            <CanvassRequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">No canvass requests yet</h3>
            <p className="text-muted-foreground">
              Start by browsing our product catalog and creating your first request.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/canvass/new">Create Request</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
