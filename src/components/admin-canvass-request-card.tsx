"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CanvassRequestWithItems } from "@/types";
import { Calendar, Package, User, CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AdminCanvassRequestCardProps {
  request: CanvassRequestWithItems & {
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  };
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  UNDER_REVIEW: "bg-blue-100 text-blue-800",
  QUOTED: "bg-purple-100 text-purple-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

const statusIcons = {
  PENDING: Clock,
  UNDER_REVIEW: Clock,
  QUOTED: CheckCircle,
  APPROVED: CheckCircle,
  REJECTED: XCircle,
};

export function AdminCanvassRequestCard({ request }: AdminCanvassRequestCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const totalItems = request.canvassItems.length;
  const totalQuantity = request.canvassItems.reduce((sum, item) => sum + item.quantity, 0);

  const updateStatus = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/canvass/${request.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh the page or update state
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const StatusIcon = statusIcons[request.status];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center space-x-2">
              <StatusIcon className="h-5 w-5" />
              <span>Request #{request.id.slice(-8)}</span>
            </CardTitle>
            <CardDescription className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{request.user.name || request.user.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>{totalItems} items ({totalQuantity} total)</span>
              </span>
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={statusColors[request.status]}
          >
            {request.status.replace("_", " ")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {request.notes && (
          <div className="mb-4">
            <h4 className="font-medium mb-2">Notes:</h4>
            <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
              {request.notes}
            </p>
          </div>
        )}

        <div className="space-y-2 mb-4">
          <h4 className="font-medium">Items Requested:</h4>
          <div className="space-y-1">
            {request.canvassItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span className="flex items-center space-x-2">
                  <span>{item.product.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.product.category}
                  </Badge>
                </span>
                <span className="font-medium">Qty: {item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          {request.status === "PENDING" && (
            <Button
              size="sm"
              onClick={() => updateStatus("UNDER_REVIEW")}
              disabled={isUpdating}
            >
              Mark Under Review
            </Button>
          )}
          {request.status === "UNDER_REVIEW" && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus("QUOTED")}
                disabled={isUpdating}
              >
                Mark Quoted
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus("APPROVED")}
                disabled={isUpdating}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStatus("REJECTED")}
                disabled={isUpdating}
              >
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
