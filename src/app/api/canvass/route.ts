import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateCanvassRequest } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: CreateCanvassRequest & { pdfUrl?: string } = await request.json();
    const { items, notes, pdfUrl } = body;

    if ((!items || items.length === 0) && !pdfUrl) {
      return NextResponse.json({ error: "No items or PDF provided" }, { status: 400 });
    }

    // Verify all products exist (only if items are provided)
    if (items && items.length > 0) {
      const productIds = items.map(item => item.productId);
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      });

      if (products.length !== productIds.length) {
        return NextResponse.json({ error: "Some products not found" }, { status: 400 });
      }
    }

    // Create canvass request
    const canvassRequest = await prisma.canvassRequest.create({
      data: {
        userId: session.user.id,
        notes,
        pdfUrl: pdfUrl || null,
        status: "PENDING",
        canvassItems: {
          create: items && items.length > 0 ? items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })) : [],
        },
      },
      include: {
        canvassItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return NextResponse.json(canvassRequest);
  } catch (error) {
    console.error("Error creating canvass request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
