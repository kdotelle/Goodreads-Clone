"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

function UserSync() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // sync user to backend on every login
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/sync`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
    }
  }, [session]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserSync />
      {children}
    </SessionProvider>
  );
}
