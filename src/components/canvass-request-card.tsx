"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CanvassRequestWithItems } from "@/types";
import { Calendar, Package, User, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface CanvassRequestCardProps {
  request: CanvassRequestWithItems;
}

const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800",
  UNDER_REVIEW: "bg-blue-100 text-blue-800",
  QUOTED: "bg-purple-100 text-purple-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export function CanvassRequestCard({ request }: CanvassRequestCardProps) {
  const totalItems = request.canvassItems.length;
  const totalQuantity = request.canvassItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">
              Request #{request.id.slice(-8)}
            </CardTitle>
            <CardDescription className="flex items-center space-x-4">
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

            {request.pdfUrl && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Purchase Order Document:</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(request.pdfUrl || "", "_blank")}
                  className="flex items-center space-x-2"
                >
                  <FileText className="h-4 w-4" />
                  <span>View Image</span>
                </Button>
              </div>
            )}

        {request.canvassItems.length > 0 && (
          <div className="space-y-2">
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
        )}

        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Last updated: {formatDistanceToNow(new Date(request.updatedAt), { addSuffix: true })}</span>
            <span>Request ID: {request.id}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
