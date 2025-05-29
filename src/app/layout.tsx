import type { Metadata } from "next";
import { ChatWidget } from "~/components/chat-widget";
import { ThemeProvider } from "~/components/theme-provider";
import { resumeData } from "~/data/resume";
import "./globals.css";

export const metadata: Metadata = {
  title: `${resumeData.name} | ${resumeData.title}`,
  description: `Resume of ${resumeData.name}, ${resumeData.title}. ${resumeData.summary}`,
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <div className="fixed bottom-4 right-4">
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
