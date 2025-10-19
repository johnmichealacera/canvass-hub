import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !["PENDING", "UNDER_REVIEW", "QUOTED", "APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const canvassRequest = await prisma.canvassRequest.update({
      where: { id },
      data: { status },
      include: {
        canvassItems: {
          include: {
            product: true,
          },
        },
        user: true,
      },
    });

    return NextResponse.json(canvassRequest);
  } catch (error) {
    console.error("Error updating canvass request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
