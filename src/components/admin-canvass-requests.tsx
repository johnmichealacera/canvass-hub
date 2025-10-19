import { prisma } from "@/lib/prisma";
import { AdminCanvassRequestCard } from "@/components/admin-canvass-request-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function getCanvassRequests() {
  return await prisma.canvassRequest.findMany({
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

export async function AdminCanvassRequests() {
  const requests = await getCanvassRequests();

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Canvass Requests</CardTitle>
        <CardDescription>
          Review and manage all canvass requests from users
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <AdminCanvassRequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No canvass requests found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
