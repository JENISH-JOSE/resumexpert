import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import InstallPrompt from "@/components/InstallPrompt";
import "./globals.css";


const themeInitScript = `
(() => {
  try {
    const key = "resumexpert-theme";
    const savedTheme = localStorage.getItem(key);
    const theme = savedTheme === "Light" || savedTheme === "Dark" || savedTheme === "System" ? savedTheme : "System";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme = theme === "System" ? (prefersDark ? "dark" : "light") : theme.toLowerCase();
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.dataset.theme = resolvedTheme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeXpert — AI-Powered Career Intelligence",
  description:
    "Upload your resume, choose your career specialization, and receive AI-powered skill analysis, personalized learning roadmaps, and project recommendations. Land the role you deserve.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#dcfce7",
                color: "#166534",
                border: "1px solid #86efac",
              },
            },
            error: {
              style: {
                background: "#fee2e2",
                color: "#991b1b",
                border: "1px solid #fca5a5",
              },
            },
          }}
        />
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
