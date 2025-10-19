"use client";

import { SessionProvider } from "next-auth/react";
import { CanvassProvider } from "@/lib/canvass-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CanvassProvider>
        {children}
      </CanvassProvider>
    </SessionProvider>
  );
}
