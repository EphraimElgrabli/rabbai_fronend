// app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "RabbAi",
  description: "Ask Halacha questions and get answers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 p-0 min-h-screen"> {/* Ensures full height */}
        {children}
      </body>
    </html>
  );
}
