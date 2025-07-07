import AppShell from "@/components/commons/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContexts";
import authOptions from "@/lib/auth";
import QueryProvider from "@/providers/query-provider";
import AuthProvider from "@/providers/session-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InventoryHub - Admin Dashboard",
  description: "Professional inventory management system",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <QueryProvider>
            <ToasterProvider>
              <AppShell>{children}</AppShell>
            </ToasterProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
