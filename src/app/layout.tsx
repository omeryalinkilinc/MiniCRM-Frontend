import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/useAuth"; // ✅ ekle

// Inter font (UI fontu)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Geist_Mono (isteğe bağlı, kod alanları için)
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MiniCRM",
  description: "CRM login panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
      >
        <MantineProvider theme={{}}>
          <Toaster position="top-right" reverseOrder={false} />
          {/* ✅ tüm uygulamayı AuthProvider ile sarmala */}
          <AuthProvider>{children}</AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
