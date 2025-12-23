import "./globals.css";

export const metadata = {
  title: "Yala Safari Booking",
  description: "Book Yala National Park safari packages online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
